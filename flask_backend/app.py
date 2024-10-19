import json
from typing import final
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from utils.read_file import read_file
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
from utils.highlight_code import highlight
from utils.explain_code import explain
from utils.gen_diff import gen_diff
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

CORS(
    app,
    origins="http://localhost:3000",
    allow_headers=["Content-Type", "Application/json"],
)


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
    response = {
        "response":list(search_query_in_repo(repo_name, query))
    }
    return jsonify(response)


@app.route("/update-file-embedding", methods=["POST"])
def update_file_embeddings():
    data = request.get_json()
    file_slug = data["file_slug"]  # {github_username}/{repo_name}/{file_path}
    update_file_embedding(file_slug, llm, vector_store)
    return jsonify({"message": "File embedding updated"})


@app.route("/search-file", methods=["POST"])
def search_file():
    data = request.get_json()
    query = data["query"]
    k = data["k"]
    results = retrieve_files(query, vector_store, k)
    if len(results) == 0:
        return jsonify({"error": "No results found"})
    response = []
    for result in results:
        response.append(result["metadata"]["file_path"].replace("\\", "/")[13:])

    return jsonify({"results": response})


@app.route("/highlight-code", methods=["POST"])
def highlight_code():
    data = request.get_json()
    file_slug = data["file_slug"]
    query = data["query"]
    content, start, end = highlight(file_slug, query)
    return jsonify({"content": content, "start": start, "end": end})


@app.route("/explain-code", methods=["POST"])
def explain_code():
    data = request.get_json()
    file_slug = data["file_slug"]
    content = read_file(file_slug)
    explaination = explain(content)
    return jsonify({"explanation": explaination})


@app.route("/get-diff", methods=["POST"])
def get_diff():
    data = request.get_json()
    file_slug1 = data["file_slug1"]
    file_slug2 = data["file_slug2"]
    content1 = read_file(file_slug1)
    content2 = read_file(file_slug2)
    differences, judgement = gen_diff(content1, content2)
    return jsonify({"differences": differences, "judgement": judgement})


@app.get("/repositories")
def list_repositories():
    GITHUB_TOKEN = "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"
    ORG_NAME = "evryfs"
    url = f"https://api.github.com/orgs/{ORG_NAME}/repos"

    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return {
            "error": f"Failed to fetch repositories. Status code: {response.status_code}"
        }

    final_response = []
    for index, repo in enumerate(response.json()):
        final_response.append(json.loads(json.dumps(repo)))
        if not os.path.exists(f"repositories/{final_response[index]['name']}"):
            final_response[index]["downloaded"] = False
        else:
            final_response[index]["downloaded"] = True
    return jsonify(final_response)


if __name__ == "__main__":
    create_repositories_dir()
    app.run(debug=True)
