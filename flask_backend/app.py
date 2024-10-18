from flask import Flask, jsonify, request
from services.model import update_file_embedding

app = Flask(__name__)

# Sample route for a health check
@app.route('/')
def index():
    return jsonify({"message": "API is working!"})

@app.route('/update-file-embedding', methods=['POST'])
def update_file_embeddings():
    data = request.get_json()
    # file_path = data['file_path']
    update_file_embedding("/repositories/Verve/index.html")
    return jsonify({'message': 'File embedding updated'})

if __name__ == '__main__':  
    app.run(debug=True)
