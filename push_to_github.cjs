const http = require('http');

const token = 'ghp_***MASKED***';
const owner = 'RE3CON';
const repos = ['Gemini-Pro', 'Gemini-AI'];

async function pushRepo(repo) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      token: token,
      repoOwner: owner,
      repoName: repo,
      branch: 'main'
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/github/push',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        console.log(`Response for ${repo}:`, responseData);
        resolve(responseData);
      });
    });

    req.on('error', (error) => {
      console.error(`Error for ${repo}:`, error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function run() {
  for (const repo of repos) {
    console.log(`Pushing to ${repo}...`);
    await pushRepo(repo);
  }
}

run();
