# Migration Guide: Remove Socket.IO, SQL, and Heroku Dependencies

This document outlines the steps needed to completely remove Socket.IO, SQL database dependencies, and Heroku-related code from the kinda.fun project.

## 🎯 **Goals**
- Remove all MySQL/SQL database dependencies
- Remove Socket.IO real-time functionality  
- Remove Heroku deployment artifacts
- Migrate analytics to Firebase Firestore (optional)
- Simplify project to be a pure static site hosted on Firebase

---

## 📁 **Files to Delete Entirely**

### Server-side Files
- `src/server/express.js` - Express server (dev only)
- `src/server/socketEvents.js` - Socket.IO event handlers
- `src/server/databaseFunctions.js` - MySQL database functions
- `src/server/` - Entire server directory

### Configuration Files
- `Procfile` - Heroku deployment configuration
- `.env.local` - Contains MySQL database URLs
- `.env.prod` - Contains MySQL database URLs
- `.env` - May contain MySQL references

---

## 📝 **Files to Modify**

### `package.json`
**Remove these dependencies:**
```json
// devDependencies to remove:
"express": "^4.19.2",
"mysql": "^2.18.1", 
"socket.io-client": "^4.7.5",
"vite-plugin-socket-io": "^1.0.2",
"axios": "^1.7.2",
"moment": "^2.30.1",
"dotenv": "^16.4.5"
```

**Remove these scripts:**
```json
"dev:server": "concurrently --prefix none \"vite\" \"node src/server/express.js\" || (exit 0)",
"serve-heroku": "vite --host 0.0.0.0 --port $PORT preview --mode sandbox"
```

**Update the dev script:**
```json
// From:
"dev": "concurrently -k \"npm run dev:client\" \"npm run watch:pages\"",
// To:
"dev": "concurrently -k \"vite\" \"npm run watch:pages\"",
```

### `vite.config.js`
**Remove these sections:**
- Any Socket.IO plugin configuration
- Database environment variable logic
- Remove the database detection logic (lines checking `VITE_DEV_DB` vs `VITE_DB`)

### Game Entry Files
**Check and update these files for Socket.IO imports/usage:**
- `src/entries/cameo.js`
- `src/entries/guillotine.js` 
- `src/entries/invalid.js`
- `src/entries/meeting.js`
- `src/entries/pretend.js`
- `src/entries/sisyphus.js`
- `src/entries/wrongest.js`

**Remove any lines like:**
```javascript
import { io } from "socket.io-client";
const socket = io();
socket.emit("...", ...);
socket.on("...", ...);
```

### Vue Components
**Search for and remove Socket.IO usage in:**
- `src/components/**/*.vue`
- `src/views/**/*.vue`
- Any `.js` files in game directories

**Look for patterns like:**
```javascript
// Remove these:
this.$socket.emit(...)
socket.emit(...)
socket.on(...)
import io from 'socket.io-client'
```

---

## 🔍 **Search and Replace Tasks**

### 1. Find all Socket.IO references
```bash
# Search for socket usage
grep -r "socket\." src/
grep -r "\.emit(" src/
grep -r "\.on(" src/
grep -r "socket.io" src/
```

### 2. Find all database references  
```bash
# Search for database calls
grep -r "addOneInDatabase" src/
grep -r "incrementDatabase" src/
grep -r "newCameoPlayerScore" src/
grep -r "logCheevoEarned" src/
```

### 3. Find Heroku references
```bash
# Search for Heroku-specific code
grep -r "PORT" .
grep -r "heroku" .
grep -r "JAWSDB" .
```

---

## ⚠️ **Analytics Migration Options**

### Option A: Remove Analytics Entirely
- Simply delete all database calls
- Remove analytics tracking from games
- Simplest approach

### Option B: Migrate to Firebase Firestore
- Replace SQL calls with Firestore writes
- Keep analytics but move to Firebase
- Requires Firestore setup

### Option C: Use Firebase Analytics
- Replace custom analytics with Google Analytics for Firebase
- Built-in event tracking
- Less custom data but easier maintenance

---

## 🧪 **Testing Strategy**

### 1. Test Each Game
After removing Socket.IO calls, test that each game still works:
- **Cameo**: Celebrity valuation game
- **Guillotine**: Wealth redistribution game  
- **Invalid**: Word association game
- **Pretend**: Celebrity impersonation game
- **Sisyphus**: Rock pushing game
- **Wrongest**: Trivia game
- **Meeting**: Meeting game

### 2. Check for Console Errors
- Look for Socket.IO connection errors
- Look for undefined variable errors
- Test both development and production builds

### 3. Verify Build Process
- Ensure `npm run build` works without server dependencies
- Confirm Firebase deployment still works
- Test all routes and games

---

## 📋 **Step-by-Step Execution Plan**

### Phase 1: Preparation
1. ✅ **Backup current working version**
2. ✅ **Create this migration guide**
3. ✅ **Set up GitHub Actions for deployment**

### Phase 2: Remove Server Dependencies  
1. **Delete server files** (`src/server/` directory)
2. **Update package.json** (remove server dependencies)
3. **Update vite.config.js** (remove database logic)
4. **Test build process** (`npm run build`)

### Phase 3: Remove Socket.IO from Games
1. **Update each entry file** (remove socket imports)
2. **Update Vue components** (remove socket calls)  
3. **Test each game individually**
4. **Remove socket.io-client dependency**

### Phase 4: Remove Database References
1. **Remove all database function calls**
2. **Remove environment variables**  
3. **Clean up any remaining SQL references**
4. **Test full application**

### Phase 5: Remove Heroku Artifacts
1. **Delete Procfile**
2. **Remove Heroku-specific scripts**
3. **Remove Heroku environment variables**
4. **Clean up any PORT references**

### Phase 6: Final Cleanup
1. **Remove unused npm packages**
2. **Update documentation**
3. **Test production deployment**
4. **Verify all games work correctly**
5. **Re-enable sitemap generation** (see Known Issues below)

---

## 🚨 **Known Issues & TODOs**

### Sitemap Plugin Issue
**Status**: Temporarily disabled during GitHub Actions setup  
**Issue**: `vite-plugin-sitemap` was causing build failures by looking for `robots.txt` in `/dist/` during build process  
**Temporary Fix**: Plugin commented out in `vite.config.js`  
**TODO**: 
- Research proper configuration for `vite-plugin-sitemap` plugin
- OR switch to alternative sitemap generation method
- OR implement manual sitemap generation in build process
- Re-enable sitemap.xml generation for SEO

**Files affected**:
- `vite.config.js` - Plugin temporarily commented out
- `public/robots.txt` - Added during troubleshooting
- Build process currently works without sitemap generation

---

## 🚀 **Expected Benefits After Migration**

- **Simpler deployment** (pure static site)
- **Faster builds** (no server dependencies)
- **Lower maintenance** (no database to manage)
- **Better performance** (no Socket.IO overhead)
- **Easier scaling** (Firebase handles everything)
- **Cost reduction** (no server hosting costs)

---

## 📚 **Resources**

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Firestore Documentation](https://firebase.google.com/docs/firestore) (if keeping analytics)
- [Firebase Analytics](https://firebase.google.com/docs/analytics) (alternative analytics)

---

**🔍 Quick Check**: After completing this migration, you should be able to run `npm install && npm run build` with no server-related dependencies and deploy a fully functional static site to Firebase.
