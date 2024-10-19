from langchain_core.prompts import PromptTemplate
from langchain_ollama import ChatOllama
from langchain_core.output_parsers import JsonOutputParser


def gen_diff(content1, content2):
    llm = ChatOllama(model="llama3.2", temperature=0)
    difference_prompt = PromptTemplate(
        template="""<|begin_of_text|><|start_header_id|>system<|end_header_id|> You are a coding buddy in an organization. You are tasked to help a new joinee with comparing two code snippets. Suggest the best out of two adheering to your organizations coding conventions. \n
    You need to identify the differences between the two code snippets.
    Generate 'differences' and 'judgement' keys in the JSON output. \n
    The 'differences' key should contain the differences between the two code snippets. Judge them on different parameters like,
     reliablility, dependancies, performance, scalability , compliance with organization's coding standards, portability, etc. \n
    The 'judgement' key should contain the judgement of the differences. Keep this short and to the point. Tell here which of the two to use. \n
    Provide output as JSON with a two keys 'differences' and 'judgement' as strings and no premable or explanation.
     <|eot_id|><|start_header_id|>user<|end_header_id|>
    Here is the code snippet 1: \n ```{snippet1}``` \n\n
    Here is the code snippet 2: \n ```{snippet2}``` \n\n \n <|eot_id|><|start_header_id|>assistant<|end_header_id|>
    """,
        input_variables=["snippet1", "snippet2"],
    )

    difference_grader = difference_prompt | llm | JsonOutputParser()
    response = difference_grader.invoke({"snippet1": content1, "snippet2": content2})
    return response.content["differences"], response.content["judgement"]
