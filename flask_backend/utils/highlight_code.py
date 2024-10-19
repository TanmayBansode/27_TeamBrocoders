from langchain_ollama import ChatOllama
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from utils.read_file import *


def highlight(file_slug, query):
    llm = ChatOllama(model="llama3.2", temperature=0, format="json")

    highlighter_prompt = PromptTemplate(
        template="""<|begin_of_text|><|start_header_id|>system<|end_header_id|> You are a coding assistant extracting useful lines of code from the given code snippet. 
      Our retrieval system has extracted a code snippet that answers a users query. Your task is to identify the exact function that answers users query. \n
      Analyse the code snippet, give the start line number and end line number of the indentified function/module.
      Don't be too precise also include a few lines before the start line and after the end line  \n
      Provide line numbers as JSON with a two keys 'start_line' and 'end_line' and no premable or explanation.
      <|eot_id|><|start_header_id|>user<|end_header_id|>
      Here is the retrieved code snippet: \n\n {snippet} \n\n
      Here is the user question: {query} \n <|eot_id|><|start_header_id|>assistant<|end_header_id|>
      """,
        input_variables=["query", "snippet"],
    )
    retrieval_grader = highlighter_prompt | llm | JsonOutputParser()
    snippet = read_file(file_slug)
    response = retrieval_grader.invoke({"query": query, "snippet": snippet})
    return snippet, response["start_line"], response["end_line"]
