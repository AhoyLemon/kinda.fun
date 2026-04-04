# Firebase Deployment Setup

This project is set up with automated Firebase deployment using GitHub Actions. Here's how to complete the setup:

## Local Development Setup (new computer)

If you see a blank page at `http://localhost:5173/home.html` with `auth/invalid-api-key` in the console, your local environment is missing Firebase config.

### Quick start

1. Install dependencies:
  - `npm install`
2. Start the client:
  - `npm run dev:client`
3. Open:
  - `http://localhost:5173/home.html`

### Optional: override Firebase config with env vars

Create a local `firebaseConfig.js` file in the repository root (this file is gitignored):

```js
export const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

Or set Vite environment variables instead.

If you need to point to a different Firebase project, create a `.env.local` file at the repository root:

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Then restart the dev server.

## 1. Generate Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your `kinda-fun` project
3. Go to Project Settings → Service Accounts
4. Click "Generate new private key"
5. Download the JSON file

## 2. Add GitHub Secret

1. Go to your GitHub repository: https://github.com/AhoyLemon/kinda.fun
2. Go to Settings → Secrets and variables → Actions
3. Add this repository secret:

### Required Secret:

- **Name**: `FIREBASE_SERVICE_ACCOUNT_KINDA_FUN`  
  **Value**: Copy and paste the entire contents of the Firebase service account JSON file

## 3. How it works

- **Automatic deployments**: Every push to the `main` branch will trigger a deployment
- **Manual deployments**: You can manually trigger deployments from the Actions tab
- **Deployment tracking**: All deployments will appear in the "Deployments" section of your GitHub repository
- **Environment**: Deployments are tracked under the "production" environment

## 4. Manual deployment

You can manually deploy by going to:

1. GitHub repository → Actions tab
2. Select "Deploy to Firebase" workflow
3. Click "Run workflow" → "Run workflow"

## 5. Viewing deployments

After setup, you can view all deployments at:
https://github.com/AhoyLemon/kinda.fun/deployments

Each deployment will show:

- Deployment time
- Commit that triggered it
- Live site URL
- Deployment status (success/failure)

## Troubleshooting local blank screen

Symptoms:

- Browser console shows `Missing required Firebase environment variables!`
- Browser console shows `Firebase: Error (auth/invalid-api-key)`
- `home.html` renders blank

Fixes:

1. Ensure `firebaseConfig.js` exists locally (gitignored) or define `VITE_FIREBASE_*` in `.env.local`.
2. Stop and restart Vite (`npm run dev:client`).
3. If auth still fails, verify the API key/project pair belongs to the same Firebase project.
