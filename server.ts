import express from "express";
import { createServer as createViteServer } from "vite";
import { Octokit } from "octokit";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { rateLimit } from "express-rate-limit";
import { WebSocketServer } from 'ws';
import { SamsungService } from "./src/services/samsungService";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust the first proxy (nginx)
  app.set('trust proxy', 1);

  // Rate limiting for API routes (excluding logo generation)
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 1000, // Increased limit for development/testing
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
    validate: {
      xForwardedForHeader: false,
      trustProxy: false,
      forwardedHeader: false,
      default: true
    }
  });

  app.use(express.json());

  // API routes that don't need rate limiting or should be checked first
  app.get("/api/info", (req, res) => {
    console.log("DEBUG: /api/info hit");
    res.json({
      nodeVersion: process.version,
      serverType: "Nginx",
      startTime: Date.now()
    });
  });

  app.use("/api", (req, res, next) => {
    if (req.path === "/generate-logo" || req.path === "/info") {
      return next();
    }
    apiLimiter(req, res, next);
  });

  // Samsung Integration Routes
  app.post("/api/samsung/dex", async (req, res) => {
    const { enabled } = req.body;
    const result = await SamsungService.setDeXMode(enabled);
    res.json(result);
  });

  app.post("/api/samsung/battery", async (req, res) => {
    const { enabled } = req.body;
    const result = await SamsungService.setBatteryOptimization(enabled);
    res.json(result);
  });

  // 2. Aggressive Caching (Server-side)
  let cachedLogoData: string | null = null;

  // Logo Generation Route
  app.post("/api/generate-logo", async (req, res) => {
    console.log("DEBUG: All headers:", JSON.stringify(req.headers));
    const { forceRefresh } = req.body || {};

    // 2. Aggressive Caching: Return cached logo if it exists and we aren't forcing a refresh
    if (cachedLogoData && !forceRefresh) {
      console.log("Returning cached logo to save API limits.");
      return res.json({ success: true, imageData: cachedLogoData, cached: true });
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(401).json({ error: "No API key selected. Please select a valid API key in the app." });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // 1. Use Flash for Everything Possible: Reverted to 2.5 flash image as 3.1 requires user-provided API key
      // 3. Minimize Context Windows: Optimized the prompt to be highly concise and token-efficient
      let response;
      let retries = 5;
      let modelToUse = 'gemini-3.1-flash-image-preview';
      let useImagen = false;

      while (retries > 0) {
        try {
          if (useImagen) {
            const imgResponse = await ai.models.generateImages({
              model: 'imagen-4.0-generate-001',
              prompt: 'Cybersecurity app logo. Vector art, neon gradients, futuristic shield, no text, transparent background.',
              config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
              },
            });
            // Adapt Imagen response to the expected format
            const imageBytes = imgResponse.generatedImages[0].image.imageBytes;
            cachedLogoData = imageBytes;
            res.json({ success: true, imageData: cachedLogoData, cached: false });
            return;
          } else {
            response = await ai.models.generateContent({
              model: modelToUse,
              contents: {
                parts: [
                  {
                    text: 'Cybersecurity app logo. Vector art, neon gradients, futuristic shield, no text, transparent background.',
                  },
                ],
              }
            });
            break;
          }
        } catch (e) {
          retries--;
          if (retries === 0) {
            if (modelToUse === 'gemini-2.5-flash-image') {
              console.warn("Gemini flash failed, trying Imagen...");
              modelToUse = 'imagen-4.0-generate-001';
              useImagen = true;
              retries = 2; // Give Imagen a few tries
            } else {
              throw e;
            }
          }
          console.warn(`Logo generation failed, retrying... (${retries} attempts left)`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      let found = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          cachedLogoData = part.inlineData.data; // Save to cache
          res.json({ success: true, imageData: cachedLogoData, cached: false });
          found = true;
          break;
        }
      }

      if (!found) {
        res.status(500).json({ error: "Failed to generate image data from AI model." });
      }
    } catch (error: any) {
      console.error("Logo Generation Error:", error);
      const errorMessage = error.message || "";
      
      if (errorMessage.includes("API_KEY_INVALID")) {
        return res.status(401).json({ error: "The selected API key is invalid. Please ensure you are using a valid, paid API key from a Google Cloud project." });
      }
      
      if (errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("quota")) {
        return res.status(429).json({ error: "Quota exceeded for this project. Please select a different project with available quota." });
      }
      
      res.status(500).json({ error: "Server error during logo generation.", details: errorMessage });
    }
  });

  // GitHub Push Route
  app.post("/api/github/push", async (req, res) => {
    const { token, repoOwner, repoName, branch = "main" } = req.body;

    if (!token || !repoOwner || !repoName) {
      return res.status(400).json({ error: "Missing required fields: token, repoOwner, repoName" });
    }

    try {
      const octokit = new Octokit({ auth: token });

      // 1. Check if repository is empty or branch doesn't exist
      let isEmpty = false;
      let latestCommitSha: string | null = null;
      let baseTreeSha: string | undefined = undefined;

      try {
        const { data: refData } = await octokit.rest.git.getRef({
          owner: repoOwner,
          repo: repoName,
          ref: `heads/${branch}`,
        });
        latestCommitSha = refData.object.sha;

        const { data: commitData } = await octokit.rest.git.getCommit({
          owner: repoOwner,
          repo: repoName,
          commit_sha: latestCommitSha,
        });
        baseTreeSha = commitData.tree.sha;
      } catch (e: any) {
        if (e.status === 404 || (e.message && e.message.includes("empty"))) {
          isEmpty = true;
        } else {
          throw e;
        }
      }

      if (isEmpty) {
        console.log("Repository is empty. Initializing with README.md...");
        await octokit.rest.repos.createOrUpdateFileContents({
          owner: repoOwner,
          repo: repoName,
          path: "README.md",
          message: "Initial commit",
          content: Buffer.from(`# ${repoName}\nInitialized by Google AI Identity Hardener`).toString("base64"),
          branch: branch,
        });
        
        // Re-fetch the newly created commit
        const { data: refData } = await octokit.rest.git.getRef({
          owner: repoOwner,
          repo: repoName,
          ref: `heads/${branch}`,
        });
        latestCommitSha = refData.object.sha;

        const { data: commitData } = await octokit.rest.git.getCommit({
          owner: repoOwner,
          repo: repoName,
          commit_sha: latestCommitSha,
        });
        baseTreeSha = commitData.tree.sha;
      }

      // 3. Read files to push (recursive)
      const filesToPush: { path: string; content: string; mode: "100644" | "100755" | "040000" | "160000" | "120000"; type: "blob" | "tree" | "commit" }[] = [];
      
      async function readDir(dir: string, base: string = "") {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          const relativePath = path.join(base, entry.name).replace(/\\/g, '/');

          // Skip node_modules, .git, dist, and other unnecessary/large directories
          if ([
            "node_modules", ".git", "dist", ".next", 
            "Gemini-Pro", "Gemini-Pro-Clone", ".npm", ".cache"
          ].includes(entry.name)) continue;
          
          // CRITICAL: Skip environment variables and secrets
          if (entry.name === ".env" || entry.name === ".env.local" || entry.name.includes("secret") || entry.name.endsWith(".pem")) {
            continue;
          }
          
          // Skip binary or large files that shouldn't be pushed as utf8
          if (entry.name.endsWith('.zip') || entry.name.endsWith('.pdf') || 
              entry.name.endsWith('.png') || entry.name.endsWith('.jpg') || 
              entry.name.endsWith('.mp4') || entry.name.endsWith('.svg') ||
              entry.name.endsWith('.txt')) {
            continue;
          }

          if (entry.isDirectory()) {
            await readDir(fullPath, relativePath);
          } else {
            const content = await fs.readFile(fullPath, "utf8");
            
            // CRITICAL: GitHub Secret Scanning will block the entire push if ANY file contains a token.
            // Even if the user says it's okay, GitHub's automated systems will reject it.
            // We must mask any real GitHub token pattern.
            const githubTokenRegex = /(ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{82})/g;
            let safeContent = content;
            if (githubTokenRegex.test(content)) {
              console.log(`Masking real GitHub token in ${relativePath}.`);
              safeContent = content.replace(githubTokenRegex, 'ghp_***MASKED***');
            }

            filesToPush.push({
              path: relativePath,
              content: safeContent,
              mode: "100644",
              type: "blob",
            });
          }
        }
      }

      await readDir(process.cwd());

      // 4. Create a new tree in one hit by passing content directly
      const treeItems = filesToPush.map((file) => ({
        path: file.path,
        mode: file.mode,
        type: file.type,
        content: file.content,
      }));

      // 5. Create a new tree
      const { data: newTreeData } = await octokit.rest.git.createTree({
        owner: repoOwner,
        repo: repoName,
        base_tree: baseTreeSha,
        tree: treeItems,
      });

      // 6. Create a new commit
      const { data: newCommitData } = await octokit.rest.git.createCommit({
        owner: repoOwner,
        repo: repoName,
        message: "Update from Google AI Identity Hardener",
        tree: newTreeData.sha,
        parents: latestCommitSha ? [latestCommitSha] : [],
      });

      // 7. Update the reference
      try {
        await octokit.rest.git.updateRef({
          owner: repoOwner,
          repo: repoName,
          ref: `heads/${branch}`,
          sha: newCommitData.sha,
        });
        res.json({ success: true, commitSha: newCommitData.sha });
      } catch (updateError: any) {
        if (updateError.message && updateError.message.includes("Repository rule violations found")) {
          console.log("Branch protection detected. Creating a pull request instead...");
          const newBranch = `update-${Date.now()}`;
          
          // Create a new branch
          await octokit.rest.git.createRef({
            owner: repoOwner,
            repo: repoName,
            ref: `refs/heads/${newBranch}`,
            sha: newCommitData.sha,
          });

          // Create a pull request
          const { data: prData } = await octokit.rest.pulls.create({
            owner: repoOwner,
            repo: repoName,
            title: "Automated Update from Gemini Adaptive Suite",
            head: newBranch,
            base: branch,
            body: "This is an automated pull request generated because direct pushes to the main branch are protected by repository rules. Please review and merge.",
          });

          res.json({ success: true, commitSha: newCommitData.sha, prUrl: prData.html_url });
        } else {
          throw updateError;
        }
      }
    } catch (error: any) {
      console.error("GitHub Push Error:", error);
      
      let userMessage = error.message || "Failed to push to GitHub due to an unexpected error.";
      let statusCode = 500;

      if (error.status === 401) {
        userMessage = "Invalid GitHub token. Please check your credentials.";
        statusCode = 401;
      } else if (error.status === 403) {
        userMessage = "Forbidden. Ensure your token has 'repo' scope and you have access to the repository.";
        statusCode = 403;
      } else if (error.status === 404) {
        userMessage = `Repository ${repoOwner}/${repoName} not found.`;
        statusCode = 404;
      } else if (error.status === 409) {
        userMessage = "Git conflict detected. The repository might be in an inconsistent state.";
        statusCode = 409;
      } else if (error.message && error.message.includes("Bad credentials")) {
        userMessage = "Bad credentials. Your token might be expired or revoked.";
        statusCode = 401;
      } else if (error.status === 422) {
        userMessage = `Validation failed: ${error.message}`;
        statusCode = 422;
      }

      res.status(statusCode).json({ error: userMessage, details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
  // WebSocket Server
  const wss = new WebSocketServer({ server });
  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      // Broadcast to all other clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === 1) {
          client.send(data);
        }
      });
    });
  });

  // Increase timeout to 10 minutes for large GitHub pushes
  server.timeout = 600000;
}

startServer();

