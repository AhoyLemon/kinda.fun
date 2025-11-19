# The Wrongest Words - Firebase Migration Testing Guide

This guide outlines the testing procedures for verifying that The Wrongest Words game works correctly with Firebase Firestore instead of Socket.IO.

## Prerequisites for Testing

1. **Firebase Configuration**: Ensure `firebaseConfig.js` exists in the root directory with valid credentials
2. **Development Server**: Run `npm run dev:client` to start the Vite dev server
3. **Multiple Browser Windows**: Open 3-5 browser windows/tabs for multiplayer testing
4. **Browser Console**: Keep console open to monitor Firestore operations and errors

## Testing Checklist

### 1. Room Creation & Joining ✓

**Test: Create a New Room**

- [x] Click "Create a New Room" button on title screen
- [x] Verify room code is generated (5 characters, all uppercase)
- [x] Verify URL updates to include `?room={ROOMCODE}`
- [x] Check browser console for successful Firestore document creation
- [ ] Verify room document exists in Firestore: `rooms/{roomCode}`

**Test: Join an Existing Room**

- [x] In a second browser window, enter the room code
- [x] Click "Join this room" button
- [x] Verify player joins the room successfully
- [x] Verify URL updates with room code
- [x] Check that player list updates in both windows

**Test: Invalid Room Code**

- [ ] Try joining a non-existent room code (e.g., "ZZZZZ")
- [ ] Verify appropriate error handling
- [ ] Check console for "Game document does not exist" message

### 2. Player Management ✓

**Test: Enter Player Name**

- [ ] Enter name in the pregame screen
- [ ] Click "Save Name" button
- [ ] Verify name appears in player list
- [ ] Verify player document created in Firestore: `rooms/{roomCode}/players/{playerID}`
- [ ] Check that playerID is stored in localStorage
- [ ] Verify all connected players see the updated player list

**Test: Change Player Name**

- [ ] Click "Change Name" button
- [ ] Enter a different name
- [ ] Verify name updates in player list for all players
- [ ] Check Firestore player document is updated

**Test: Host Identification**

- [ ] Verify first player (room creator) has crown icon
- [ ] Verify host can see deck selector and "Start The Game" button
- [ ] Verify non-host players cannot see these controls

**Test: Multiple Players**

- [ ] Add 3-7 players to the room
- [ ] Verify each player has unique playerID
- [ ] Verify each player has correct playerIndex (0-based)
- [ ] Verify "is-me" styling appears on correct player

### 3. Deck Selection & Game Start ✓

**Test: Deck Selection (Host Only)**

- [ ] Host selects a deck from dropdown
- [ ] Verify deck description appears
- [ ] Verify card count displays correctly
- [ ] Try selecting "EVERYTHING!" option
- [ ] Verify "Start The Game" button appears after deck selection

**Test: Start Game with Insufficient Players**

- [ ] With fewer than 3 players, try clicking "Start The Game"
- [ ] Verify button is disabled
- [ ] Verify "You need at least 3 people" message appears

**Test: Start Game with Valid Players (3-7)**

- [ ] With 3+ players, click "Start The Game" as host
- [ ] Verify all players transition to game screen
- [ ] Verify each player is dealt one card
- [ ] Check Firestore `gameState/state` document:
  - `phase: "presenting"`
  - `currentRound: 1`
  - `maxRounds` set correctly (4 for 3-4 players, 3 for 5-6, 2 for 7+)
  - `chosenDeckName` matches selected deck
  - `gameDeck` contains shuffled cards
- [ ] Verify room document `isGameStarted: true`

### 4. Presenting Phase ✓

**Test: First Card Presentation**

- [ ] Player 1 clicks "Deal Card" button
- [ ] Verify presentation timer starts (30 seconds)
- [ ] Verify timer displays for all players
- [ ] Verify presenting player sees their card with secret text revealed
- [ ] Verify other players see "..." placeholder in secret text
- [ ] Check Firestore updates:
  - `activePlayerIndex: 0`
  - `playerPresenting: true`

**Test: Timer Functionality**

- [ ] Watch timer count down
- [ ] Verify timer visual (circle progress)
- [ ] Verify timer syncs across all clients
- [ ] Let timer run to 0 (optional: may auto-advance)

**Test: Manual Presentation Completion**

- [ ] Presenting player clicks "Done Presenting"
- [ ] Verify sound plays (decay sound)
- [ ] Verify timer stops
- [ ] Verify card is added to `cardsPresented` array
- [ ] Check all players see the card was presented

**Test: All Players Present**

- [ ] Each player (in order) clicks "Deal Card" then "Done Presenting"
- [ ] Verify activePlayerIndex increments correctly
- [ ] Verify each card is added to cardsPresented
- [ ] Verify "Start Voting" button appears after all cards presented

### 5. Voting Phase ✓

**Test: Initiate Voting**

- [ ] First player clicks "Start Voting"
- [ ] Verify all players transition to voting screen
- [ ] Verify all presented cards are visible
- [ ] Verify each card shows player name
- [ ] Check Firestore: `phase: "voting"`

**Test: Cast Votes**

- [ ] Click a card to upvote (green)
- [ ] Verify card gets "agree" styling
- [ ] Click a different card to downvote (red)
- [ ] Verify card gets "disagree" styling
- [ ] Try upvoting and downvoting same card (should toggle)
- [ ] Verify only one upvote and one downvote allowed

**Test: Submit Votes**

- [ ] With both votes selected, click "Submit Votes"
- [ ] Verify vote confirmation message/state
- [ ] Check Firestore updates:
  - Downvoted player score decremented by 1
  - Upvoted player score incremented by 1
  - `votesSubmitted` incremented by 1
  - Card scores updated in `cardsPresented`

**Test: All Players Vote**

- [ ] Have all players submit their votes
- [ ] Verify vote count updates correctly
- [ ] Verify "Next Round" button appears when all votes cast
- [ ] Verify all players see updated scores in player list

### 6. Round Progression ✓

**Test: Start Next Round**

- [ ] First player clicks "Next Round" button
- [ ] Verify all players return to presenting phase
- [ ] Verify round number increments
- [ ] Verify players are rotated (playerIndex updated)
- [ ] Verify new cards are dealt to all players
- [ ] Check Firestore:
  - `currentRound` incremented
  - `phase: "presenting"`
  - `cardsPresented: []`
  - `votesSubmitted: 0`
  - `activePlayerIndex: -1`
  - Previous round cards added to `statementHistory`
  - Players' `playerIndex` updated (rotation)

**Test: Multiple Rounds**

- [ ] Play through 2-3 complete rounds
- [ ] Verify each round follows same pattern
- [ ] Verify scores accumulate correctly
- [ ] Verify statement history grows

### 7. Game Over ✓

**Test: Final Round**

- [ ] Play until reaching maxRounds
- [ ] After final voting, verify "Game Over" button appears
- [ ] Click "Game Over" button
- [ ] Verify all players transition to game over screen
- [ ] Check Firestore:
  - `phase: "GAME OVER"`
  - Room `isGameOver: true`

**Test: Game Over Display**

- [ ] Verify player rankings shown (sorted by score)
- [ ] Verify all statement history displayed
- [ ] Check for "Wrongest Words" (lowest scores)
- [ ] Check for "Least Wrong Words" (highest scores)
- [ ] Verify final scores are correct

### 8. Real-time Synchronization ✓

**Test: State Updates Across Clients**

- [ ] Perform any action in one window
- [ ] Verify all other windows update immediately
- [ ] Test with multiple simultaneous actions
- [ ] Verify no race conditions or data inconsistencies

**Test: Player Disconnect/Reconnect**

- [ ] Close one browser window mid-game
- [ ] Verify game continues for other players
- [ ] Reopen window and rejoin with same URL
- [ ] Verify player can resume (if playerID preserved)

**Test: Host Disconnect**

- [ ] Close host's browser window
- [ ] Verify game continues for other players
- [ ] Verify host controls still available to original host
- [ ] (Note: Host migration not implemented in this version)

### 9. Edge Cases & Error Handling ✓

**Test: Empty Deck Scenario**

- [ ] Play enough rounds to exhaust the deck
- [ ] Verify emergency deck selection activates
- [ ] Verify alert message shown
- [ ] Verify new cards dealt successfully

**Test: Concurrent Room Creation**

- [ ] Click "Create Room" multiple times rapidly
- [ ] Verify no duplicate rooms created
- [ ] Verify proper error handling if room exists

**Test: Network Interruption**

- [ ] Temporarily disable network (if possible)
- [ ] Verify graceful error handling
- [ ] Re-enable network
- [ ] Verify game recovers and syncs state

**Test: Invalid Data**

- [ ] Try submitting votes without selecting cards
- [ ] Try advancing game phases out of order
- [ ] Verify validation and error messages

### 10. Performance & Optimization ✓

**Test: Firestore Read/Write Operations**

- [ ] Open Firebase Console → Firestore → Usage tab
- [ ] Play a complete game
- [ ] Monitor read/write operations
- [ ] Verify operations are reasonable (not excessive)
- [ ] Check for unnecessary listener triggers

**Test: Browser Console Errors**

- [ ] Play a complete game
- [ ] Monitor console for errors, warnings
- [ ] Verify no Firebase errors
- [ ] Verify no Vue errors
- [ ] Verify no undefined variables

**Test: Multiple Concurrent Games**

- [ ] Create 2-3 separate rooms simultaneously
- [ ] Verify rooms are isolated
- [ ] Verify no data bleeding between rooms
- [ ] Verify performance remains acceptable

## Success Criteria

The migration is considered successful when:

✅ **Zero Socket.IO Dependencies**: No `socket.io-client` imports or usage  
✅ **Full Firebase Integration**: All multiplayer functionality uses Firestore  
✅ **Maintained User Experience**: Game plays identically to Socket.IO version  
✅ **Real-time Performance**: Updates are fast and synchronized  
✅ **Robust Error Handling**: Graceful handling of edge cases and errors  
✅ **Cost Efficient**: Optimized Firestore operations  
✅ **Timer Synchronization**: Presentation timer works correctly across all clients

## Known Limitations

1. **Host Migration**: Not implemented - if host leaves, controls remain with original host playerID
2. **Presence System**: Basic implementation using `lastSeen` timestamps
3. **Room Cleanup**: Relies on TTL (1 day) for automatic cleanup
4. **Network Recovery**: Limited automatic recovery from network interruptions

## Debugging Tips

1. **Firestore Rules**: Ensure Firestore security rules allow reads/writes for testing
2. **Console Logging**: Check browser console for detailed Firebase operation logs
3. **Firebase Emulator**: Consider using Firebase Emulator Suite for local testing
4. **Network Tab**: Monitor Firestore WebSocket connections in browser DevTools
5. **Vue DevTools**: Use Vue DevTools to inspect reactive state changes

## Reporting Issues

When reporting issues, include:

- Browser and version
- Number of players in test
- Game phase when issue occurred
- Browser console errors
- Firestore document state (if accessible)
- Steps to reproduce

## Related Documentation

- [Firebase Firestore Documentation](https://firebase.google.com/docs/firestore)
- [VueFire Documentation](https://vuefire.vuejs.org/)
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- [Issue #4: Remove Socket.IO from all games](https://github.com/AhoyLemon/kinda.fun/issues/4)
