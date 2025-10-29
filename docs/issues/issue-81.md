# Issue 81: Eternal Legacy Celebrity Centre

## Goal

- Describe requirements for adding the ability to get celebrity endorsements in the Eternal Legacy shop in Megachurch Tycoon. This will close https://github.com/AhoyLemon/kinda.fun/issues/81

## Purpose

- In the Eternal Legacy shop, we already have Mammon Items (which give mammon, but have no other effect) as well as "Dark Deeds", which have unique gameplay effects.
- The Celebrity Centre is a combination of several different effects that happen elsewhere:
  - Some celebrities have a one-time cost that is paid immediately to hire them
  - Some celebrities have a per-day cost that is paid at the end of each sermon (after you count up your totals, but before you pay Sterling)
  - Celebrities can have one time or daily effects, such as...
    - `mammon` (a one-time or daily increase to your mammon)
    - `buzz` (a one-time or daily modifier to church.buzz)
    - `religionBoost` (a one-time or daily boost to the likedBy religions in your religiousScorecard)
    - `religionPenalty` (a one-time or daily penalty to the hatedBy religions in your religiousScorecard)
    - `heat` (a one-time increase or decrease to your heat level when you acquire them)
    - `heatModifier` (a daily modifier to the amount of heat you gain each day)
  - Celebrities may also have an associated item of merch. If you have that celebrity, the merch acts like any other merch in your store, EXCEPT that there is no inventory. You have a `baseChance` chance of selling that item, plus a `religionBonusChance` if the person happens to be one of the religions that likes your celebrity. If a sale is made, you get `yourCut`

## Eternal Legacy documentaiton

All of the properties for our current celebrities is drawn up in `src\views\megachurch\ts\variables\_eternalLegacy.ts`. We just need the work to implement the effects

## Major Requirements

- [ ] WHEN ACQUIRING A CELEBRITY
  - [ ] If the celebrity has a `cost`, subtract that cost immediately. If the player cannot afford that cost, they cannot acquire that celebrity.
  - [ ] If the celebrity has a `heat` property, immediately add or subtract that amount of heat from the player's current heat level.
  - [ ] If the celebrity has `oneTimeEffects`, immediately apply those effects to the player.
    - [ ] Add `oneTimeEffects.mammon` to the player's mammon
    - [ ] Add `oneTimeEffects.buzz` to the player's church.buzz
    - [ ] For each religion in `likedBy`, add `oneTimeEffects.religionBoost` to that religion in the player's religiousScorecard
    - [ ] For each religion in `hatedBy`, subtract `oneTimeEffects.religionPenalty` from that religion in the player's religiousScorecard
  - [ ] Add that celebrity to `my.celebrityFriends`
  - [ ] The celebrity should be visible in the `src\views\megachurch\components\EternalLegacy\LegacyStatus.pug` view (under the "Celebrity Friends" headline, NOT under "Tokens of Wealth")

- [ ] AT THE BEGINNING OF THE DAY
  - [ ] For each celebrity you own with dailyEffects...
    - [ ] If the celebrity has a `dailyEffects.mammon`, add that amount to the player's mammon
    - [ ] If the celebrity has a `dailyEffects.buzz`, add that amount to the player's church.buzz
    - [ ] For each religion in `likedBy`, add `dailyEffects.religionBoost` to that religion in the player's religiousScorecard
    - [ ] For each religion in `hatedBy`, subtract `dailyEffects.religionPenalty` from that religion in the player's religiousScorecard
    - [ ] If the celebrity has a `dailyEffects.heatModifier`, add that amount to the player's heat gain for that day

- [ ] AT THE END OF THE SERMON (before paying Sterling)
  - (note: This happens after selling all merch, but before figuring out how much the player owes Sterling)
  - [ ] For each celebrity you own with associated merch...
    - [ ] Calculate if a sale is made, using `baseChance` + `religionBonusChance` (if applicable)
    - [ ] If a sale is made, add `yourCut` to the player's money
  - [ ] For each celebrity you own with a `dailyCost`, subtract that amount from the player's money. If you can not afford that amount see the TERMINATION section, lower down.
  - [ ] Also MAKE SURE that the celebrity merch sales and the per day costs of the celebrities are shown on the End of Day receipts (`.church-management-summary` for the celeb merch and `.donations-summary` for the daily costs)

## TERMINATION OF CELEBRITY FRIENDSHIP

There are two ways for a celebrity friendship to end:

- [ ] You can choose to unfriend them in the Eternal Legacy interface
- [ ] You can fail to meet their daily cost at the appropriate time, at which point this will trigger an immediate termination

- [ ] WHEN TERMINATING A CELEBRITY FRIENDSHIP
  - [ ] Remove that celebrity from `my.celebrityFriends`
  - [ ] Each celebrity has a `termination` property, which may have any of the following effects:
    - [ ] If there is a `mammonLost` property, subtract that amount from the player's mammon
    - [ ] If there is a `buzzLost` property, subtract that amount from the player's church.buzz
    - [ ] If there is a `religionPenalty` property, subtract that amount from each religion in `likedBy` in the player's religiousScorecard
    - [ ] If there is a `religionBoost` property, add that amount to each religion in `hatedBy` in the player's religiousScorecard
    - [ ] If there is an `additionalCost` property, that is an additional amount owed to that celebrity. See HANDLING OWED MONEY, below.
    - [ ] Show the player a "FRIENDSHIP ENDED" dialogue, let's put this at `src\views\megachurch\components\EternalLegacy\FriendshipEnded.vue`, which indicates which celebrity friendship was ended, and why (either voluntary or non-payment), and what the effects were.
      - I'd love it if the dialogue was reminiscent of the "Friendship ended with" meme, see https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fdoes-anyone-have-the-blank-picture-of-this-v0-5x3fz06nvyhe1.png%3Fwidth%3D500%26auto%3Dwebp%26s%3D04421ae7284fea385f5ab0d72e9483c41d788acf

- [ ] HANDLING OWED MONEY
  - If the celebrity friendship was terminated becasue the player could not afford their daily cost, then...
    - [ ] Show a message to the player indicating that they have lost that celebrity friendship due to non-payment
    - [ ] Keep track of the amount owed to that celebrity in a new property of `my.IOUs`. This will keep track of the amount owed to each celebrity
    - [ ] Then at the end of each day, AFTER Sterling takes his cut, if there's any remaining celebrities you owe money to, they will

## A Note on Language

While thinking about this feature, I've talked about "acquiring" or "owning" a celebrity, or buying their endorsement. HOWEVER, I think it's much much funnier that we always describe it as friendship. Wherever possible, please adjust language to the idea of these transactions being making friends/keeping friends/losing friends, etc. It should always be presented as the celebrity friends the players have.

## Acceptance Criteria

- [ ] As a player, I can make a celebrity friend in the Celebrity Centre of the Eternal Legacy shop, provided I can afford any one-time cost
- [ ] I will immediately see them show up in `src\views\megachurch\components\EternalLegacy\LegacyStatus.vue` under the "Celebrity Friends" headline
- [ ] If the celebrity has any one-time effects, those will be applied immediately upon purchase.
- [ ] At the beginning of the day, if the celebrity has any daily effects on my church, that will be applied and I will be informed of it.
- [ ] At the end of the day, if the celebrity has any daily cost or associated merch, that will be processed and I will be informed of it.
- [ ] If I cannot afford the daily cost of a celebrity friend, that friendship will be immediately terminated, I will be informed of it, and any termination effects will be applied (seeing the new FriendshipEnded.vue modal)
- [ ] I can choose to unfriend a celebrity friend in the Eternal Legacy shop, which will immediately terminate that friendship, apply any termination effects, and show me the FriendshipEnded.vue modal.
- [ ] I cannot friend the same celebrity twice.

## Implementation Notes

- It is OKAY to add variables, functions, and computeds not strictly documented here if needed for implementation.
- It is ENCOURAGED for you to keep the celebrity processing into one or two functions called at the right moment, so we can handle all the celebrity effects in one place rather than scattered throughout the codebase.
- It is RECOMMENDED that you STOP adding the celebrity to `my.eternalLegacy.purchasedItems` and instead add them to a new array `my.celebrityFriends`. This will help us keep the logic for celebrities separate from other Eternal Legacy items.
- It is preferred you throw a simple `toast.info` out if you think there's some other game logic that's being changed by a celebrity friendship that we haven't considered.
