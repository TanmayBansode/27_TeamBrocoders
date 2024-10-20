async function getFileContent() {
    const url = 'https://raw.githubusercontent.com/SatvikG7/CareerCatalyst/main/README.md';
    const token = 'YOUR_GITHUB_TOKEN';  // Replace with your personal access token
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3.raw',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const fileContent = await response.text();
      console.log(fileContent);  // This is the raw file content
    } catch (error) {
      console.error('Error fetching the file:', error);
    }
  }
  
  getFileContent();
  