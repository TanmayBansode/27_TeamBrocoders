
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain_ollama import ChatOllama
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain_core.documents import Document
from services.get_uuid import generate_uuid


def update_file_embedding(file_path: str, llm, vector_store):
    # file_path => {github_username}/{repo_name}/{file_path}
    s = file_path.split("/")
    s[0] = "repositories"
    file_path = "\\".join(s)
    file_path = file_path.replace("\\\\", "\\")
    with open(file_path, "r") as file:
        content = file.read()

    print(content)
    messages = [
        (
            "system",
            "You are a code description generator. Given a file name and its content, generate a concise, descriptive summary of the code's purpose and functionality. The description should be detailed enough to allow retrieval based on natural language queries. For example, if the code is a middleware function in Node.js, generate a description like 'This code implements middleware for a Node.js application.'",
        ),
        (
            "human",
            f"Please generate a description for the following code snippet: {content} \n filename: {file_path}",
        ),
    ]

    response = llm.invoke(messages)
    description = response.content
    doc = Document(
        page_content=description, metadata={"file_path": file_path}, id=file_path
    )
    print(doc)
    vector_store.update_document(generate_uuid(file_path), doc)
