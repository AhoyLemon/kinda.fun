## Allow the game host to select multiple decks

### The problem

Currently, the game host can select only one deck of cards for a game session. This limits the variety and customization options for players.

### The solution

Allow the game host to select multiple decks of cards when setting up a game session.

### Implementation details

Okay, let's adjust the deck building UI now.

Currently the room host will use the select at src\views\wrongest\pug_pregame.pug to select the one deck for the game to be played with.

Instead of that, what I want is for the host to be able to select multiple decks.

Now, we'll need to make sure the created deck will have enough cards. So we'll need to multiply the eventual number of game.maxRounds (lines 435-440) by the number of game.players and that will be the minimum number of cards.

So, the UI should show all possible decks, with a toggle for each, and they'll have a minimum number of cards they'll need. Each deck selector should show the title and description and number of cards.

If the total number of cards is under the minimum, the user can't continue. If the user has sufficient cards, the user can save the deck.

However, keep in mind that players can still join the lobby, which would affect the minimum number of cards. So there should be a check on .start-button to make sure there are enough cards.

## Acceptance Criteria

- [ ] When starting a new game with only 1 player currently in the lobby, the UI should assume the minimum number of cards based on the smallest possible number of players (3).
- [ ] The host can select multiple decks from the deck selection UI.
- [ ] The host can go back to the deck selection UI to modify their choices before starting the game.
- [ ] The game can only be started if the total number of cards from the selected decks meets or exceeds the required minimum based on the number of players and rounds.
- [ ] If the game cannot be started due to insufficient cards, an appropriate message is displayed to the host.
- [ ] When the game host has selected enough decks to meet the minimum card requirement, the UI will notify them
- [ ] The deck selection UI should display the title, description, and number of cards for each deck option.
- [ ] The deck selection UI should be a separate screen
- [ ] Each player in the lobby will be informed which decks are being used in the game before it starts.
- [ ] When the game starts, this selection of decks is used to build the card pool for the game.
