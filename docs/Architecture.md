# Architecture & Development 🏗️

## Tech Stack
* **Frontend**: React 18, Vite, Tailwind CSS, TypeScript
* **CI/CD**: GitHub Actions (CodeQL, Lighthouse CI, Dependabot)
* **Distribution**: GitHub Pages & GitHub Packages

## Building Locally
1. Clone the repository: `git clone https://github.com/RE3CON/Gemini-AI.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Build for production: `npm run build`

## How the UserScript is Generated
During the `npm run build` process, our GitHub Actions workflow automatically extracts the core logic from the React application and bundles it into a standalone `google-ai-identity.user.js` file.
