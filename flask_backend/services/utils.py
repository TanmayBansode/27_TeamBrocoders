import os
import re


def download_repo(repo_name):
    os.system(
        f"git clone --depth 1 {repo_name} repositories/{repo_name.split('/')[-1]}"
    )
    print(f"Repository {repo_name} downloaded successfully")


allowed_extensions = [
    ".py",
    ".java",
    ".go",
    ".rs",
    ".c",
    ".cpp",
    ".c++",
    ".h",
    ".hpp",
    ".cs",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".html",
    ".css",
    ".php",
    ".sql",
    ".json",
    ".xml",
    ".yml",
    ".yaml",
    ".md",
    ".sh",
    ".bat",
    ".ps1",
]


# generate a dictionary of the form {filename: content}
def read_files(directory) -> dict:
    files_content = {}
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            _, file_extension = os.path.splitext(file_path)
            if file_extension not in allowed_extensions:
                continue

            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    files_content[file_path] = f.read().splitlines()
            except (UnicodeDecodeError, PermissionError) as e:
                print(f"Could not read file {file_path}: {e}")

    return files_content


# file_content = read_files("repositories")


def search_files(query, files_content):
    results = []
    regex = re.compile(query)

    for file_path, content_lines in files_content.items():
        matches_in_file = []

        for line_number, line in enumerate(content_lines, start=1):
            for match in regex.finditer(line):
                col_number = match.start() + 1
                matches_in_file.append(
                    {
                        "line_number": line_number,
                        "col_number": col_number,
                        "match": match.group(),
                    }
                )

        if matches_in_file:
            results.append({"file_path": file_path, "matches": matches_in_file})

    return results


# Function to print results in required format
def print_results(results):
    for file_result in results:
        print(f"File: {file_result['file_path']}")
        print(f"File Link: ./" + os.path.relpath(file_result["file_path"]))  # File link
        print("Matches:")
        for match in file_result["matches"]:
            print(
                f' - "{match["match"]}" at line {match["line_number"]}, column {match["col_number"]}'
            )
        print("--------------------------------------------")


# Main execution function
def search_query_in_repo(directory, query):
    # Read files from directory
    files_content = read_files(directory)

    # Perform regex search
    results = search_files(query, files_content)

    # Print results
    if results:
        print_results(results)
    else:
        print("No matches found.")


# Example usage:
# Replace "repositories" with the base directory where your files are located
# Replace 'your-regex-query' with the regex you want to search
# search_query_in_repo("repositories", '.*Provider')
