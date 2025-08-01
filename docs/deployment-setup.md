# Firebase Deployment Setup

This project is set up with automated Firebase deployment using GitHub Actions. Here's how to complete the setup:

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
