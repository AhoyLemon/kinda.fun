## Goal of this document

- Describe everything that will be required to add a van to the MegaChurch Tycoon game.
- Fulfilling the requirements of this doc will close https://github.com/AhoyLemon/kinda.fun/issues/74

## Gameplay Goals

- Once the player has had a little bit of time to experiment with religious themes, sermon topics, and managing of their spice habit, we introduce a new mechanic that allows the player to move from location to location
- By moving to different locations, they can optimize their sermon against the local demographics
- This will be the second phase of the game, the next phase will be the foundation of a church at one of the locations.

## Requirements

- [x] We need to measure the amount of money the player has accumulated over time in order to create a trigger, let's put this at my.totalMoneyEarned
- [x] We then need to create an amount of money that the player needs to have earned in order to unlock the van, let's put this at gameSettings.van.totalAmountToUnlock, and for now, let's set the amount at 150
- [x] Also create a variable of gameSettings.van.cost - I'm uncertain what a good price would be, but let's try 200 for now.
- [x] We need to create a boolean variable of my.hasVan, which is false by default
- [x] We need to create a boolean variable of my.canBuyVan, which is false by default
- [x] We also need variables of gameSettings.van.fixedGasPrice and gameSettings.van.gasPricePerMile. For the moment, we'll set fixedGasPrice to 20, and gasPricePerMile to 0.1, although gasPricePerMile will not be used right away, more on that later
- [x] Once the player has met the requirements, at the end of the day, they'll get a new text message from a different person, this is their Uncle Harold. See the Uncle Harold section later in this document
- [x] The player can then buy the van from Uncle Harold, in much the same way that they buy spice from The Plug, except there's just a single button to pay the full amount. If the player does not have that much money, the button is disabled.
- [x] Seeing that first text message from Uncle Harold is not under the player's control. Once the player has met the requirements, the interface just pops up at the end of the day.
- [x] As a good enough solution for now, we can just add a "Text Uncle Harold" button next to the Text Your Plug button in src\views\megachurch\pug_sermon-results.pug

## Chat Interface

- [x] I'd like to use a whole lot of the same UI and code that we used for the chat with The Plug, so please make a new Vue component at src\views\megachurch\vue\Chat.vue which copies over a lot of the same interface and logic as src\views\megachurch\vue\PlugChat.vue
- [x] But then Chat.vue should be able to to handle chats with either The Plug or Uncle Harold, if it's possible to split the Plug or Harold logic into separate files, that would be great. If however that makes it too complicated, some if/else logic in Chat.vue is okay - but hopefully not a combination of the two approaches.
- [x] While The Plug chat will have an interface element for ordering spice, the Uncle Harold chat only has the button to buy the van, as well as three general conversation prompts:
  - "Haggle" - Try to get a better price on the van
  - "A Van?" - Have Harold re-explain what good the van is for
  - "Chat" - A general chat with Harold.
- [x] Once you've purchased the van, the only communication you can have with Harold is "Chat"

## Uncle Harold

- Uncle Harold is probably your real life uncle, although we can make that unclear. What should be clear is that he's a paranoid weirdo, full of conspiracy theories, and he will take any opportunity to communicate those theories to you.
- I've created an avatar of Harold, which you can find at public\img\megachurch\avatars\harold.jpg - please use that as his avatar in the chat interface
- When Harold first contacts you, he gives you several messages in a row.
  - hey kid it ur uncl harold
  - i got this van
  - u need a van???
  - ${gameSettings.van.cost}
  - u culd relly go places w it
  - mb help u w ur preachin
  - wana buy???
- If you try to haggle with Harold, it will never work. The player will send a random message to Harold like
  - Can you come down on the price at all?
  - That's a lot of money for a van
  - I'm trying to build something, can you give me a discount?
- And Harold will respond with a dismissal of the request, mixed with something crazy and paranoid, like
  - u think the govmnt gives me a discount???
  - i need that money for my plans
  - this van aint 1 of THOSE vans
- If you ask Harold "A Van?", you will send him a mesage like
  - Why do I need a van?
  - What's so great about a van?
  - How will a van help me?
- And Harold will respond with something like
  - u culd drive 2 other places. u culd preach 2 new ppl
  - mabee u find more ppl 2 join ur church
  - u culd escape if the govmnt comes 4 u
- If you just "Chat" with Harold, you will send him a message like
  - How's life treating you Harold?
  - Boy, sports are a thing I enjoy. How about you?
- And Harold will respond with something like
  - they make toothpaste out of zebras. thats why toothpaste has those stripes
  - u gotta wear two pairs of socks! AT ALL TIMES!
  - u no ne1 who nos how 2 code? i need 2 get revenge at the ppl who control my hotmail account
  - i keep my phone in the freezer so the aliens can’t track me

## Use of the Van

- [x] Once you own the van,the player will see a button on src\views\megachurch\pug_create-sermon.pug that says "Get In The Van"
- [x] Clicking that button brings up src\views\megachurch\pug_choose-place.pug with some slight modifications
- [x] The player can choose another location, and they'll see the details for that location
- [x] The one thing that should be added is that the player will have to pay for gas in order to change locations. If they can't afford gas, they can't change locations.
- [x] For the moment, it's too complicated to have gas prices that depend on distance, so for now, just charge a fixed amount of gameSettings.van.fixedGasPrice every time the player changes locations.
- [x] The player can change locations a max of once per day, so once they've changed locations, the "Get In The Van" button is disabled until the next day.

## Side Effects

- [x] I've realized that in src\views\megachurch\vue\PlugChat.vue I ended up with a joke I don't like. I have the game choosing a random name from fakeNames, and I just don't think it's worth the confusion. Instead, for all chats (both with The Plug and Uncle Harold), let's just always use my.name as the player's name.

## Implementation Notes

- It is OKAY to add variables, functions, and computeds that aren't strictly doucmented here, if they are needed to implement the documented features.
- It is DISCOURAGED to add hardcoded numbers for logic, instead it is preferred to have those be in either gameSettings. or my. variables, so that they can be easily adjusted later.

## When Finished

- [x] Check off the items that are completed
- [x] Give a summary of what was done

### Implementation Summary

**Van System Successfully Implemented!** 🚐

The van feature has been fully implemented with the following components:

**Core Variables Added:**

- `my.totalMoneyEarned` - Tracks lifetime earnings for van unlock trigger
- `my.hasVan`, `my.canBuyVan`, `my.hasTraveledToday` - Van ownership and travel state
- `gameSettings.van` - Van configuration (unlock threshold: $150, cost: $200, gas: $20)
- `my.haroldChat` - Uncle Harold's chat history and contact state

**Uncle Harold Chat System:**

- Created generalized `Chat.vue` component that handles both Plug and Harold conversations
- Harold's paranoid personality with conspiracy theory responses
- Three conversation options: Haggle (always fails), Van explanation, General chat
- Van purchase interface with affordability checking
- Automatic contact triggered when player earns $150+ total

**Van Travel Mechanics:**

- "Get In The Van" button appears on sermon creation when van is owned
- Modified location selection to show gas costs and travel restrictions
- Fixed $20 gas cost per trip, once per day limit
- Gas affordability validation before travel
- Daily travel limit resets each morning

**UI Integration:**

- "Text Uncle Harold" button in sermon results (visible after unlock)
- Harold's avatar image integrated from existing asset
- Gas cost display in location selection
- Travel button text changes based on van ownership

**Quality Improvements:**

- Removed fake name generation, now uses real player name in all chats
- Money tracking integrated with donation collection
- Build successful with ~15kb bundle size increase

**Technical Details:**

- Harold's messages use authentic paranoid typing style ("u", "2", "4", etc.)
- Typing indicators and message timing match existing Plug chat
- Van purchase confirmation message from Harold
- Travel restrictions properly enforced (money, daily limit)
- State properly resets each day in `advanceToNextDay()`

The van system provides the foundation for location-based gameplay expansion and prepares for the next phase of church building mechanics.
