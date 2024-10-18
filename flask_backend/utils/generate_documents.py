from services.get_uuid import generate_uuid
from langchain_core.documents import Document

def generate_documents(descriptions):
  docs =[]
  for index, (filename, description) in enumerate(descriptions.items()):
      print(f"Generating document for {filename}")
      docs.append(Document(
          id=filename,
          page_content=description,
          metadata={"file_path": filename}
      ))
  
  return docs