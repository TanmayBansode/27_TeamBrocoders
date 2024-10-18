from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_core.documents import Document
from .get_uuid import generate_uuid
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain_ollama import ChatOllama
from langchain_ollama.embeddings import OllamaEmbeddings

def update_file_embedding(file_path: str):
    print(">>")
    llm = ChatOllama(
        model = "gemma2:2b",
        temperature = 0.8,
        num_predict = 256,
    )

    embeddings = OllamaEmbeddings(
        model="nomic-embed-text"
    )

    vector_store = Chroma(
        collection_name="descriptions",
        embedding_function=embeddings,
        persist_directory="./vector_store",
    )

    embeddings = OllamaEmbeddings(
        model="nomic-embed-text"
    )

    retriever = vector_store.as_retriever(
    search_type="similarity", 
    search_kwargs={'k': 1}
    )

    descriptions = {}

    with open(file_path, 'r') as file:
        content = file.read()

    messages = [
        ("system", "You are a code description generator. Given a file name and its content, generate a concise, descriptive summary of the code's purpose and functionality. The description should be detailed enough to allow retrieval based on natural language queries. For example, if the code is a middleware function in Node.js, generate a description like 'This code implements middleware for a Node.js application.'"),
        ("human", f"Please generate a description for the following code snippet: {content} \n filename: {file_path}")
    ]

    response = llm.invoke(messages)
    descriptions = response.content

    # Create a document with the description and add it to the vector store
    doc_id = generate_uuid(file_path)
    doc = Document(
        page_content=descriptions[file_path],
        metadata={"source": file_path},
        id=doc_id
    )
    print(doc_id, descriptions[file_path])
    vector_store.update_document(doc_id, doc)

