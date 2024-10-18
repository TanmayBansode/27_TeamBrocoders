from langchain_ollama import ChatOllama
from utils import read_files
def generate_code_descriptions():
  file_content = read_files("repositories")
  llm = ChatOllama(
      model = "gemma2:2b",
      temperature = 0.8,
      num_predict = 256,
  )
  

  descriptions = {}

  # get first 5 files
  file_content = dict(list(file_content.items())[:5])

  for filename, content in file_content.items():
      file = """"""
      for line in content:
        file += line + "\n"

      messages = [
        ("system", "You are a code description generator. Given a file name and its content, generate a concise, descriptive summary of the code's purpose and functionality. The description should be detailed enough to allow retrieval based on natural language queries. For example, if the code is a middleware function in Node.js, generate a description like 'This code implements middleware for a Node.js application."),
        ("human", f"Please generate a description for the following code snippet: {file} \n filename: {filename}"),
      ]
      response = llm.invoke(messages)
      descriptions[filename] = response.content