from langchain_core.prompts import PromptTemplate
from langchain_ollama import ChatOllama

def explain(content):
    llm = ChatOllama(model="gemma2:2b", temperature=0.8, num_predict=512)
    explanation_prompt = PromptTemplate(
        template="""<|begin_of_text|><|start_header_id|>system<|end_header_id|> You are tasked with analyzing and explaining 
    the provided code snippet. Your explanation should cover the purpose of the code, its functionality, 
    and any important concepts or techniques used which are followed by the organization.
    Discuss the efficiency, readability, and potential improvements of the code. \n
    Provide examples or scenarios where the code might be useful. \n
     <|eot_id|><|start_header_id|>user<|end_header_id|>
    Here is the code: \n ```{snippet}``` \n\n <|eot_id|><|start_header_id|>assistant<|end_header_id|>
    """,
        input_variables=["snippet"],
    )

    explanation_grader = explanation_prompt | llm
    response = explanation_grader.invoke({"snippet": content})
    return response.content
