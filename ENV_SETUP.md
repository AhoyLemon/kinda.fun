# Environment Variables Setup

## For Local Development

Create a `.env.local` file in the root directory with your Firebase configuration:

```bash
# Firebase Configuration (use VITE_ prefix for backwards compatibility)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_APP_URL=http://localhost:3000

# OR use NUXT_ prefix (both work)
NUXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NUXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NUXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NUXT_PUBLIC_APP_URL=http://localhost:3000
```

## For Production

Create a `.env.production` file:

```bash
VITE_FIREBASE_API_KEY=your-production-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-production-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-production-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-production-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-production-sender-id
VITE_FIREBASE_APP_ID=your-production-app-id
VITE_APP_URL=https://kinda.fun
```

## How Nuxt Loads Environment Variables

Nuxt automatically loads environment files in this order (later files override earlier):

1. `.env` - Shared across all environments
2. `.env.local` - Local overrides (gitignored)
3. `.env.[mode]` - Mode-specific (e.g., `.env.production`)
4. `.env.[mode].local` - Mode-specific local overrides

## Variable Naming Conventions

- **VITE_ prefix**: For backwards compatibility with the old Vite setup
- **NUXT_PUBLIC_ prefix**: Nuxt's recommended naming for public runtime config
- Both prefixes work! The config checks for NUXT_ first, then falls back to VITE_

## Current Status

Your existing `.env.local` and `.env.production` files with `VITE_` prefixed variables will continue to work without any changes needed.
