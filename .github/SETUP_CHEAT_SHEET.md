# Quick-Start Setup Guide

## 💡 How to start a new session
When starting a new conversation, please instruct me:
> "Read the setup cheat sheet and guide me through the steps. Here is the repository URL: [INSERT URL HERE]"

This guide streamlines the setup process for new sessions.

## 1. Generate GitHub Personal Access Token (PAT)
1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens).
2. Click **Generate new token (classic)**.
3. Name: `WIKI_SYNC_TOKEN`.
4. **Crucial:** Select the **`repo`** scope.
5. Generate and copy the token.

## 2. Add Secret to Repository
1. Go to [Gemini-Pro Repository Settings](https://github.com/RE3CON/Gemini-Pro/settings).
2. Click **Secrets and variables > Actions**.
3. Click **New repository secret**.
4. Name: `WIKI_ACTION_TOKEN`.
5. Secret: Paste your new PAT.

## 3. Trigger Wiki Sync
1. Go to [Actions > Sync Wiki](https://github.com/RE3CON/Gemini-Pro/actions/workflows/sync-wiki.yml).
2. Click **Run workflow** (dropdown) -> **Run workflow** (button).
