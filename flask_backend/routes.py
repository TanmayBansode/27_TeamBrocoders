from flask import Blueprint, jsonify, request
from .services.utils import create_repositories_dir, download_repo, allowed_extensions, read_files, search_files, print_results, search_query_in_repo
from .services.model import update_file_embedding
main = Blueprint('main', __name__)

@main.route('/create-repository-directory', methods=['POST'])
def create_repository_directory():
    create_repositories_dir()
    return jsonify({'message': 'Repositories directory created'})

@main.route('/download-repository', methods=['POST'])
def download_repository():
    data = request.get_json()
    repo_url = data['repo_url']
    download_repo(repo_url)
    return jsonify({'message': 'Repository downloaded'})

@main.route('/search-repository', methods=['POST'])
def search_repository():
    data = request.get_json()
    query = data['query']
    repo_name = "repositories"
    search_query_in_repo(repo_name, query)
    return jsonify({'message': 'Search completed'})

@main.route('/update-file-embedding', methods=['POST'])
def update_file_embeddings():
    data = request.get_json()
    # file_path = data['file_path']
    update_file_embedding("/repositories/Verve/index.html")
    return jsonify({'message': 'File embedding updated'})


