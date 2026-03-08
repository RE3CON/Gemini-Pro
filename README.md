# RE3CON Gemini AI Bridge

A comprehensive platform for bridging AI capabilities with native Android and enterprise ecosystems.

## Setup & Configuration

### Environment Variables
Create a `.env` file based on `.env.example` and configure the following:

- `GEMINI_API_KEY`: Your paid Gemini API key for accessing advanced models.
- `VITE_GITHUB_TOKEN`: (Optional) GitHub Personal Access Token for repository automation.

### Installation
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`

### OAuth Setup
If using OAuth integrations (e.g., GitHub, Strava), ensure the callback URL `https://<your-app-url>/auth/callback` is added to your OAuth provider's authorized redirect URIs.
