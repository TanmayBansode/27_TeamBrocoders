import uuid

def generate_uuid(repo_name: str) -> str:
    return str(uuid.uuid5(uuid.NAMESPACE_DNS, repo_name))
