async function push() {
  try {
    const token = process.argv[2];
    console.log("Starting push...");
    const res = await fetch('http://localhost:3000/api/github/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token,
        repoOwner: 'RE3CON',
        repoName: 'Gemini-AI',
        branch: 'main'
      })
    });
    const data = await res.json();
    console.log("Push result:", data);
  } catch (e) {
    console.error("Push failed:", e);
  }
}
push();
