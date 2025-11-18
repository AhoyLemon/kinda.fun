# Issue 80: Eternal Legacy, Lucre Acquisition, Heat Meter, and Endgame

## Goal

- Describe requirements for adding the Firebase logging to Megachurch Tycoon, similar to what happens for all the other games in this repo
- Fulfilling the requirements of this doc will close https://github.com/AhoyLemon/kinda.fun/issues/80

## Purpose

- Using `src\views\cameo` as our nearest example, we want to send information to the Firestore database about a number of things that the plaer does.
- This will allow us to do analytics on how players are playing the game, and help us make decisions about future updates and improvements.
- Similar mechanics are happening in `src\views\sisyphus` which is also a 1 player game.

## Major Requirements

- **NOTE**: For all of these changes, when I'm saying I want a value to be saved, I mean in Firestore.
- [ ] When the player reaches `endTheDay()` do the following...
  - [ ] Increment `/stats/megachurch/gamesStarted` by 1.
  - [ ] Also change `/stats/megachurch/lastGameStarted` to the current datestamp
  - [ ] At that time, also save `my.name` to `/stats/general/players`
    - Note that `/stats/game/players/` is a collection, with each unique player name being a document that looks like this:
      ```js
      // /stats/general/players/BRAVE INCOGNITO
      { gamesPlayed: 21, lastPlayed: "August 14, 2025 at 10:26:49 PM UTC-5", mostRecentGame: "megachurch", name: "BRAVE INCOGNITO" }
      ```
    - Please consult `src\views\meeting\Meeting.vue:310-325` for an example of how this works in another game. `/stats/general/players` is shared for all player names, so the main thing we're tracking is "What's the most recent game this player played?"

- [ ] When the player reaches either `game-over` state (either they have died of an overdose or reached full heat and gone to prison) do the following...
  - [ ] Increment `stats.megachurch.gamesFinished` by 1.
  - [ ] Increment `/stats/megachurch/overdoses` by 1 if the game was ended because of an overdose
  - [ ] Increment `/stats/megachurch/prisonSentences` by 1 if the game was ended because of going to prison
  - [ ] Change `/stats/megachurch/lastGameFinished` to the current timestamp

- [ ] When the player founds a church, do the following....
  - [ ] Increment `/stats/megachurch/churchesFounded` by 1
  - [ ] Either add or increment the religion in `/stats/megachurch/locations`, which will look like...
    ```js
    // /stats/megachurch/locations/Venture City, California
    { name: "Venture City, California", churchesFounded: 3 }
    ```
  - [ ] Either add or increment the religion in `/stats/megachurch/religions`, which should look like...
    ```js
    // /stats/megachurch/religions/The Church of Eros
    { name: "The Church of Eros", churchesFounded: 3 }
    ```

- [ ] When the player takes spice at the beginning of the day, increment `/stats/megachurch/spiceTaken` by the amount of spice taken (skip this if they took none that day)

- [ ] Inside of the `endTheDay()` function, do the following...
  - [ ] Increment `/stats/megachurch/daysPlayed` by 1
  - [ ] If they preached on the street, increment `/stats/megachurch/daysPreachedOnStreet` by 1
  - [ ] If they preached in church, increment `/stats/megachurch/daysPreachedInChurch` by 1
  - [ ] For each topic in `my.sermonToday.topics`, add or increment that topic in `/stats/megachurch/sermonTopics`, which should look like...
    ```js
    // /stats/megachurch/sermonTopics/All Religion Is Stupid Man, Like Whatever
    { title: "All Religion Is Stupid Man, Like Whatever", timesPreached: 5 }
    ```
  - [ ] If Seraph AI is currently active, increment `/stats/megachurch/seraphAIDaysActive` by 1

- [ ] When the player buys a van, increment `/stats/megachurch/vansPurchased` by 1

- [ ] When a player buys an something from Da Worshop Zone, do the following, dependant on what it was.
  - [ ] If it was a merch item, increment `/stats/megachurch/merch/{merch.name}` by the amount the player just purchased, for example...
    ```js
    // /stats/megachurch/upgrades/Holy Water Vending Machine
    { name: "Bottles of Holy Water", timesPurchased: 5 }
    ```
  - [ ] If it was an upgrade (OTHER THAN Seraph AI Branded Communion Snacks, which we'll get to later), then increment `stats/megaChurch/upgrades/{upgrade.name}` by 1, for example...

    ```js
    // /stats/megachurch/upgrades/VIP Confession Booths
    { name: "VIP Confession Booths", timesPurchased: 3 }
    ```

    - [ ] If it was the communion snacks (either the bread or wine), save those each as discrete upgrades, with a bit more contextual information, ex:
      ```js
      // /stats/megachurch/upgrades/Kendall-Jackson Vintner's Reserve
      { name: "Kendall-Jackson Vintner's Reserve", communionType: "wine", level 2, timesPurchased: 5 }
      ```

    ```

    ```

  - [ ] If they purchasesed the General Internet Ad Campaign or the Sign Spinner, increment it as `/stats/megachurch/marketing/{marketing.name}` by 1, for example...
    ```js
    // /stats/megachurch/marketing/Sign Spinner
    { name: "Sign Spinner", timesPurchased: 3 }
    ```
  - If they purchased the Targeted Internet Ad Campaign or the PR Campaign, then we actually want to update both `/stas/megachurch/marketing/{marketing.name}` and the religion affected, so...
    - [ ] Increment `/stats/megachurch/marketing/{merketing.name}/timesPurchased` by 1
    - [ ] Increment `/stats/megachurch/marketing/{marketing.name}/religions/{religion.name}/timesTargeted` by 1, for example...
      ```js
      // /stats/megachurch/marketing/Targeted Internet Ad Campaign
      { name: "Targeted Internet Ad Campaign", timesPurchased: 5, religions: { "The Church of Eros": { timesTargeted: 3 }, "Zardoz": { timesTargeted: 2 } } }
      ```

- [ ] For everything in the **Mammon Collection** in the eternal legacy shop, increment the times purchased in `/stats/megachurch/eternalLegacy/{item.name}`, for example...
  ```js
  // /stats/megachurch/eternalLegacy/Serpent-Handled Staff
  { name: "Gold-Plated Toilet", timesPurchased: 2 }
  ```
- [ ] For everything in the **Under The Table** collection in the eternal legacy shop, increment the times enacted in `/stats/megachurch/darkDeeds/{deed.name}`, for example...

  ```js
  // /stats/megachurch/darkDeeds/Bribe The Health Inspector
  { name: "Tax Attorney Retainer", timesEnacted: 3 }
  ```

- [ ] If the player engages any of the cheats (those are the buttons in lines 64-72 of src\views\megachurch\pug_your-details.pug), then increment `/stats/megachurch/cheats/{cheat.name}` by 1, for example...
  ```js
  // /stats/megachurch/cheats/+$1,000,000
  { name: "$1,000,000", timesUsed: 5 }
  ```

I think that's it...

## Acceptance Criteria
- [ ] When playtesting the game, any of the actions I've described above will be able to be verified by looking at the Firebase console, ex https://console.firebase.google.com/u/0/project/kinda-fun-dev/firestore/databases/-default-/data/~2Fstats~2Fmegachurch~2Fmarketing~2Freligions
- [ ] Later on, I will be able to collate and display all this data on `src\views\stats\Stats.vue` just as I have for all the other games.

## Implementation Notes

- For the purposes of this issue, none of the gameplay should be changing, it should just be logging the gameplay that's already taking place to Firebase.
- This is already happening in all the other games. You can consult `src\views\cameo\Cameo.vue` and `src\views\guillotine\Guillotine.vue` and `src\views\pretend\Pretend.vue` and `src\views\sisyphus\Sisyphus.vue` (all of which are single player games) for examples on how this is done. `src\views\invalid\Invalid.vue` and `src\views\meeting\Meeting.vue` are multiplayer games and are therefore more complicated, however, those ones will track player names, which none of the other single player games do.
- It is STRONGLY PREFERRED to consolidate this Firebase work in a single function, which is then called in other functions depending on the trigger. This is pretty much how it works for all the other single player games.

