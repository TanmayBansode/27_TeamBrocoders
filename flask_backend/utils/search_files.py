from langchain_ollama import ChatOllama
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser

def retrieve_files(query, vector_store, k=1):
    retriever = vector_store.as_retriever(
        search_type="similarity", search_kwargs={"k": k}
    )
    results = retriever.invoke(query)
    llm = ChatOllama(model="llama3.2", temperature=0)
    retrieval_prompt = PromptTemplate(
        template="""<|begin_of_text|><|start_header_id|>system<|end_header_id|> You are a code grader assessing relevance 
    of a retrieved code snippet to a user question. If the code snippet answers the user's question, 
    grade it as relevant. It does need to be a stringent test. The goal is to filter out erroneous retrievals. \n
    Give a binary score 'yes' or 'no' score to indicate whether the code snippet is relevant to the question. \n
    Provide the binary score as a JSON with a single key 'score' and no premable or explanation.
     <|eot_id|><|start_header_id|>user<|end_header_id|>
    Here is the retrieved code snippet: \n\n {snippet} \n\n
    Here is the user question: {query} \n <|eot_id|><|start_header_id|>assistant<|end_header_id|>
    """,
        input_variables=["query", "snippet"],
    )

    retrieval_grader = retrieval_prompt | llm | JsonOutputParser()
    filtered_response = []
    for result in results:
        response = retrieval_grader.invoke({"query": query, "snippet": result.page_content})
        if response["score"] == "yes":
            filtered_response.append(result)

    return filtered_response
