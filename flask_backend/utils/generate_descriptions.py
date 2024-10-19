def generate_descriptions(files_content, llm):
  descriptions = {}
  total = len(files_content)
  for index, (filename, content) in enumerate(files_content.items()):
      print(f"Generating description for {filename} ({index+1}/{total})", end="\r")
      file = """"""
      for line in content:
        file += line + "\n"

      messages = [
        ("system", "You are a code description generator. Given a file name and its content, generate a concise, descriptive summary of the code's purpose and functionality. The description should be detailed enough to allow retrieval based on natural language queries. For example, if the code is a middleware function in Node.js, generate a description like 'This code implements middleware for a Node.js application."),
        ("human", f"Please generate a description for the following code snippet: {file} \n filename: {filename}"),
      ]
      response = llm.invoke(messages)
      descriptions[filename] = response.content
  
  return descriptions