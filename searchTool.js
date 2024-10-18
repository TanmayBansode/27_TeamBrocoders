const fs = require('fs');
const path = require('path');

// Function to recursively scan the directory and gather files
function scanDirectory(dir, files = []) {
    const items = fs.readdirSync(dir);
    for (let item of items) {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            scanDirectory(fullPath, files);
        } else {
            files.push(fullPath);
        }
    }
    return files;
}

// Function to search for the regular expression in a file and return matches with line and column info
function searchFile(filePath, regex) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');  // Split file content into lines
    const matches = [];

    // Iterate through each line and search for matches
    lines.forEach((line, lineNumber) => {
        let match;
        while ((match = regex.exec(line)) !== null) {
            matches.push({
                match: match[0],
                lineNumber: lineNumber + 1,  // Line numbers start from 1
                colNumber: match.index + 1   // Column numbers start from 1
            });
        }
    });

    if (matches.length > 0) {
        return { filePath, matches };
    }
    return null;
}

// Function to sort files based on their last modified time
function sortByRecentChanges(files) {
    return files.sort((a, b) => {
        const timeA = fs.statSync(a.filePath).mtime;
        const timeB = fs.statSync(b.filePath).mtime;
        return timeB - timeA;
    });
}

// Main function to execute the search
function searchInCurrentDir(query) {
    const currentDir = process.cwd();  // Get the current working directory
    const regex = new RegExp(query, 'g');  // Create a regular expression from the query

    // Scan the directory and get all the files
    const allFiles = scanDirectory(currentDir);
    let matchedFiles = [];

    // Search for matches in each file
    allFiles.forEach(filePath => {
        const result = searchFile(filePath, regex);
        if (result) {
            matchedFiles.push(result);
        }
    });

    // Sort matched files by recent changes
    matchedFiles = sortByRecentChanges(matchedFiles);

    // Print the results
    matchedFiles.forEach(file => {
        console.log(`File: ${file.filePath}`);
        console.log(`File Link: ./` + path.relative(currentDir, file.filePath));  // Relative file path for easy linking
        console.log(`Matches:`);
        file.matches.forEach(match => {
            console.log(` - "${match.match}" at line ${match.lineNumber}, column ${match.colNumber}`);
        });
        console.log(`Last Modified: ${fs.statSync(file.filePath).mtime}`);
        console.log('--------------------------------------------');
    });

    if (matchedFiles.length === 0) {
        console.log('No matches found.');
    }
}

// Run the search by taking the query from the command line arguments
const query = process.argv[2];
if (!query) {
    console.log('Please provide a query to search.');
} else {
    searchInCurrentDir(query);
}
