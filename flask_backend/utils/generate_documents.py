from services.get_uuid import generate_uuid
from langchain_core.documents import Document


def generate_documents(descriptions):
    docs = []
    total = len(descriptions.items())
    for index, (filename, description) in enumerate(descriptions.items()):
        print(f"({index+1}/{total})", end="\r")
        docs.append(
            Document(
                id=generate_uuid(filename),
                page_content=description,
                metadata={"file_path": filename},
            )
        )

    print(f"Documents generated for {total} files")
    return docs
