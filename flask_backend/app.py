from flask import Flask, jsonify, request
from utils.search_files import retrieve_files
from utils.generate_documents import *
from utils.generate_descriptions import *
from services.model import update_file_embedding
from services.utils import (
    download_repo,
    read_files,
    search_files,
    print_results,
    search_query_in_repo,
)

import os
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="gemma2:2b",
    temperature=0.8,
    num_predict=512,
)

embeddings = OllamaEmbeddings(model="nomic-embed-text")

vector_store = Chroma(
    collection_name="descriptions",
    embedding_function=embeddings,
    persist_directory="./vector_store",
)

retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 1})


def create_repositories_dir():
    if not os.path.exists("repositories"):
        os.makedirs("repositories")
    else:
        print("repositories directory already exists")


app = Flask(__name__)


# Sample route for a health check
@app.route("/")
def index():
    print("API is working!")
    return jsonify({"message": "API is working!"})

def download_repository(repo_url):
    download_repo(repo_url)
    return jsonify({"message": "Repository downloaded"})

@app.route("/create-repo-embedding", methods=["POST"])
def create_repo_embedding():
    data = request.get_json()
    repo_url = data["repo_url"]
    repo_name = repo_url.split("/")[-1]

    # check if the repository exists, if exists delete it, then download it
    if os.path.exists(f"repositories/{repo_name}"):
        os.system(f"rm -rf repositories/{repo_name}")
        print(f"Repository {repo_name} already exists, deleting it...")

    download_repository(repo_url)
    print(f"Repository {repo_name} downloaded")
    files_content = read_files(f"repositories\\{repo_name}")

    descriptions = generate_descriptions(files_content, llm)
    print(descriptions)
    docs = generate_documents(descriptions)
    vector_store.add_documents(documents=docs)
    return jsonify({"message": "Repository embedding created"})

@app.route("/search-repository", methods=["POST"])
def search_repository():
    data = request.get_json()
    query = data["query"]
    repo_name = "repositories"
    search_query_in_repo(repo_name, query)
    return jsonify({"message": "Search completed"})

@app.route('/update-file-embedding', methods=['POST'])
def update_file_embeddings():
    data = request.get_json()
    file_slug = data['file_slug'] # {github_username}/{repo_name}/{file_path}
    update_file_embedding(file_slug, llm, vector_store)
    return jsonify({'message': 'File embedding updated'})

@app.route('/search-file', methods=['POST'])
def search_file():
    data = request.get_json()
    query = data['query']
    k = data['k']
    results = retrieve_files(query, vector_store, k)
    return jsonify({'results': str(results)})

if __name__ == "__main__":
    create_repositories_dir()
    app.run(debug=True)
