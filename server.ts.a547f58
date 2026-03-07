import express from "express";
import { createServer as createViteServer } from "vite";
import { Octokit } from "octokit";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { rateLimit } from "express-rate-limit";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Rate limiting for API routes
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." }
  });

  app.use(express.json());
  app.use("/api/", apiLimiter);

  // Logo Generation Route
  app.post("/api/generate-logo", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: 'A highly unique, colorful, and vibrant logo for a cybersecurity application. The design must be completely original, focusing heavily on digital security, privacy, and protection. Incorporate abstract security elements like a futuristic shield, cryptographic keys, or a secure vault, combined with vibrant, multi-colored neon gradients. Vector art style, clean edges, isolated on a transparent background. No text, no words.',
            },
          ],
        },
      });

      let found = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          res.json({ success: true, imageData: part.inlineData.data });
          found = true;
          break;
        }
      }

      if (!found) {
        res.status(500).json({ error: "Failed to generate image data from AI model." });
      }
    } catch (error: any) {
      console.error("Logo Generation Error:", error.message || error);
      res.status(500).json({ error: "Server error during logo generation.", details: error.message });
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

          // Skip node_modules, .git, dist
          if (["node_modules", ".git", "dist", ".next"].includes(entry.name)) continue;

          if (entry.isDirectory()) {
            await readDir(fullPath, relativePath);
          } else {
            const content = await fs.readFile(fullPath, "utf8");
            filesToPush.push({
              path: relativePath,
              content: content,
              mode: "100644",
              type: "blob",
            });
          }
        }
      }

      await readDir(process.cwd());

      // 4. Create blobs for each file
      const treeItems = await Promise.all(
        filesToPush.map(async (file) => {
          const { data: blobData } = await octokit.rest.git.createBlob({
            owner: repoOwner,
            repo: repoName,
            content: file.content,
            encoding: "utf-8",
          });
          return {
            path: file.path,
            mode: file.mode,
            type: file.type,
            sha: blobData.sha,
          };
        })
      );

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
      await octokit.rest.git.updateRef({
        owner: repoOwner,
        repo: repoName,
        ref: `heads/${branch}`,
        sha: newCommitData.sha,
      });

      res.json({ success: true, commitSha: newCommitData.sha });
    } catch (error: any) {
      console.error("GitHub Push Error:", error.message || error);
      
      let userMessage = "Failed to push to GitHub due to an unexpected error.";
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
