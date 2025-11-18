# MegaChurch Tycoon - Developer Guide

Technical documentation for developing and maintaining the MegaChurch Tycoon game.

**New to Kinda Fun development?** Start with the [Developer Getting Started Guide](DEVELOPER_GUIDE.md) to set up the project locally and learn about the technology stack.

## Quick Start

See the [DEVELOPER GUIDE](DEVELOPER_GUIDE.md)

## Architecture & File Structure

### Core Game Logic

- **`src/views/megachurch/Megachurch.vue`** - Main game component with all systems
- **`src/views/megachurch/ts/_types.ts`** - TypeScript interfaces and type definitions
- **`src/views/megachurch/ts/_functions.ts`** - Utility functions and game calculations
- **`src/views/megachurch/ts/_computeds.ts`** - Computed properties and derived state
- **`src/views/megachurch/ts/_gameLogic.ts`** - Core gameplay mechanics

### Configuration & State Management

- **`src/views/megachurch/ts/variables/_gameSettings.ts`** - Game balance and configuration
- **`src/views/megachurch/ts/variables/_my.ts`** - Player state and progress
- **`src/views/megachurch/ts/variables/_ui.ts`** - UI state and interface settings
- **`src/views/megachurch/ts/variables/_sounds.ts`** - Audio configuration
- **`src/views/megachurch/ts/variables/_eternalLegacy.ts`** - End-game celebrity system

### Content Data Files

- **`src/views/megachurch/ts/_religions.ts`** - Religion definitions with likes/dislikes
- **`src/views/megachurch/ts/_places.ts`** - Location data with demographics
- **`src/views/megachurch/ts/_sermons.ts`** - Available sermon themes and tags
- **`src/views/megachurch/ts/_chatMessages.ts`** - NPC dialogue and chat system

### UI Components

**Toast Notifications:**

- `src/views/megachurch/components/Toasts/ListenerToast.vue` - Audience reaction notifications
- `src/views/megachurch/components/Toasts/DonationToast.vue` - Financial feedback display
- `src/views/megachurch/components/Toasts/FollowerToast.vue` - Follower change notifications
- `src/views/megachurch/components/Toasts/MerchToast.vue` - Merchandise sales feedback
- `src/views/megachurch/components/Toasts/CelebrityFriendToast.vue` - Celebrity friendship notifications

**Chat System:**

- `src/views/megachurch/components/Chat/Chat.vue` - Universal chat interface for NPCs

**Sterling Silver Components:**

- `src/views/megachurch/components/Sterling/SterlingNote.vue` - Business proposal note
- `src/views/megachurch/components/Sterling/SterlingVoicemail.vue` - Voicemail messages

**Church Management:**

- `src/views/megachurch/components/WorshopZone/WorshopZone.vue` - Church upgrades and purchases
- `src/views/megachurch/components/WorshopZone/ChurchInventory.vue` - Church inventory management

**End Game Systems:**

- `src/views/megachurch/components/EternalLegacy/EternalLegacyShop.vue` - Celebrity friendship system
- `src/views/megachurch/components/EternalLegacy/LegacyStatus.vue` - Legacy status display
- `src/views/megachurch/components/EternalLegacy/FriendshipEnded.vue` - Friendship termination
- `src/views/megachurch/components/EternalLegacy/UnfriendConfirmation.vue` - Unfriend confirmation

## How to Change Things

### Game Balance & Settings

**All game balance is in `src/views/megachurch/ts/variables/_gameSettings.ts`:**

```javascript
// Change spice pricing
gameSettings.spice.basePrice = 10; // was 5

// Adjust donation multipliers
gameSettings.donationCalculation.baseAmount = 2; // was 1

// Modify church attendance
gameSettings.churchPreaching.baseAttendance = 50; // was 30
```

**Never hardcode numbers in components** - always reference `gameSettings`.

### Adding New Sermon Topics

1. **Add the topic** in `_sermons.ts`:

```javascript
export const sermonTopics = [
  {
    name: "Your New Topic",
    tags: ["salvation", "modern"], // Tags that appeal to religions
    // ...
  },
];
```

2. **Update religion preferences** in `_religions.ts` if needed:

```javascript
export const religions = [
  {
    name: "Christianity",
    likes: ["salvation", "traditional"],
    dislikes: ["occult"],
    // ...
  },
];
```

### Adding New Locations

**Edit `_places.ts`:**

```javascript
export const places = [
  {
    name: "Your New Location",
    population: 1000,
    avgNetWorth: 50000, // Affects donation amounts
    religiousBreakdown: {
      Christianity: 40,
      Islam: 20,
      // ... percentages must total 100
    },
  },
];
```

### Adding New NPCs/Chat

1. **Add messages** to `_chatMessages.ts`:

```javascript
export const chatMessages = {
  yourNpc: {
    greeting: {
      to: ["Player messages..."],
      from: ["NPC responses..."],
    },
  },
};
```

2. **Add handler** in `Megachurch.vue`:

```javascript
function handleYourNpcMessage(data) {
  // Handle the chat interaction
}
```

## Adding Tests

### Writing Gameplay Tests

**Create test files** in `/tests/` directory:

```javascript
// tests/megachurch-sermons.test.js
import { describe, it, expect } from "vitest";
import { calculateDonations } from "../src/views/megachurch/ts/_functions";

describe("Sermon Mechanics", () => {
  it("should calculate correct donations for Christian audience", () => {
    const result = calculateDonations({
      topics: ["salvation", "traditional"],
      audience: { Christianity: 50 },
      location: "suburbia",
    });

    expect(result.totalDonations).toBeGreaterThan(0);
    expect(result.positiveFeedback).toContain("Christianity");
  });
});
```

### Running Specific Tests

```bash
# Run all MegaChurch tests
npm run test:unit -- tests/megachurch*

# Run with detailed output
npm run test:unit -- --reporter=verbose

# Watch mode for development
npm run test:unit -- --watch tests/megachurch-sermons.test.js
```

### Test Guidelines

- **Focus on gameplay logic** - test donation calculations, audience reactions, progression
- **Use realistic scenarios** - test with actual game data (religions, locations, topics)
- **Test edge cases** - high spice usage, mixed messages, extreme values
- **Include performance tests** - ensure large audiences don't cause slowdowns

See `docs/vitests.md` for complete testing documentation.

## Troubleshooting

### Common Issues

**Build Failures:**

- Delete `node_modules/` and run `npm install`
- Delete `.vite/` cache folder

**Game Not Working:**

- Check browser console for errors
- Verify all imports are correct in modified files
- Use debug mode in-game to inspect calculations

**Firebase Errors in Development:**

- Expected behavior - games work fine without Firebase config
- Only affects multiplayer features and data logging

## Deployment

- **Automated:** Every push to `main` branch triggers deployment
- **Manual:** Run `firebase deploy` if needed
- **Configuration:** See `docs/deployment-setup.md`

## Development Workflow

1. **Make changes** to game files
2. **Test locally** with `npm run dev:client`
3. **Add tests** if you changed game logic
4. **Run tests** with `npm run test:unit`
5. **Create PR** - deployment happens automatically on merge to `main`

For project-wide guidelines, see:

- `docs/deployment-setup.md` - Firebase and deployment configuration
- `docs/npm-commands.md` - Complete command reference
- `docs/vitests.md` - Testing best practices
