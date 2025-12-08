#!/bin/bash
# Script to help migrate a game page from src/views to pages/

if [ -z "$1" ]; then
  echo "Usage: $0 <game-name> [page-title]"
  echo "Example: $0 cameo 'Comparatively Famous'"
  exit 1
fi

GAME=$1
TITLE=${2:-"$GAME"}
GAME_UPPER=$(echo "$GAME" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')
SRC_DIR="src/views/$GAME"
DEST_FILE="pages/$GAME.vue"

echo "Migrating $GAME_UPPER page..."

# Check if source exists
if [ ! -f "$SRC_DIR/${GAME_UPPER}.vue" ]; then
  echo "Error: Source file $SRC_DIR/${GAME_UPPER}.vue not found"
  exit 1
fi

# Copy the Vue file
cp "$SRC_DIR/${GAME_UPPER}.vue" "$DEST_FILE"
echo "✓ Copied Vue component"

# Read the Pug template if it exists
if [ -f "$SRC_DIR/${GAME_UPPER}.pug" ]; then
  PUG_CONTENT=$(cat "$SRC_DIR/${GAME_UPPER}.pug")
  echo "✓ Found Pug template"
fi

echo ""
echo "Next steps (manual):"
echo "1. Edit $DEST_FILE and add at top of <script setup>:"
echo "   - useHead() for meta tags"
echo "   - useRuntimeConfig() if needed"
echo "2. Replace template src with inline template:"
echo "   <template lang=\"pug\">"
echo "   [paste pug content]"
echo "   </template>"
echo "3. Update SCSS imports to relative paths"
echo "4. Test with: npm run dev"
echo ""

