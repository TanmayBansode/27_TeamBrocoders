def retrieve_files(query, vector_store, k=1):
    retriever = vector_store.as_retriever(
        search_type="similarity", search_kwargs={"k": k}
    )
    results = retriever.invoke(query)
    response = []
    for result in results:
        response.append(result.metadata["file_path"].replace("\\", "/")[13:])
    return response
