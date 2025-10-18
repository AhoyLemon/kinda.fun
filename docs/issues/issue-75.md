## Goal of this document

- Describe what is required to add the mechanics of your first church to the MegaChurch Tycoon game.
- Fulfilling the requirements of this doc will close https://github.com/AhoyLemon/kinda.fun/issues/75

## Gameplay Goals

Consult the Game Phaes section of src\views\megachurch\TODO.md for context - this is Phase 4. You've already done street preaching, probably experimented with spice, probably done street preaching in different locations, now it's time to understand how a church works.

- Differently than Street Preaching, where the audience is disposable every day, in Church Preaching, you are building a congregation that you want to keep coming back. You want to preach things that your congregation likes, and avoid preaching things that they don't like.

- You'll make more money Church Preaching than you did Street Preaching, but you'll have to keep an eye on what your congregation likes and dislikes, and adjust your sermons accordingly.

- If you're doing particularly well with a religion, you'll get more members of that religion joining your congregation. Offending a religion will cause members of that religion to leave your congregation.

- This is all managed in my.religiousScorecard, which is controlling your approval rating among each religion in the game

- In founding your church, you'll be in partnership with Sterling Silver (more on him later). He is initially beneficial, but as he's always getting a cut of your donations, you'll eventually want to get rid of him, one way or another.

- This phase continues with some minor upgrades to your church, eventually leading to the next phase where you get rid of Sterling, so you can move on to lucre acquisition.

## Major Requirements

- [ ] We need to set up a trigger for the player to be initially contacted by Sterling.
- [ ] We need to add communication with Sterling by extending the Chat.vue component
- [ ] We need to set up the variables to track if the player has been contacted by Sterling, if they have a church, where the church is located, and Sterling's cut
- [ ] We need to let the player define where they want their church to be located, what the name of the church is, and what religion the church is affiliated with
- [ ] We need to redo createChurchSermonEffect substantially, it's probably best to start from scratch - see Church Sermon Effect section below
- [ ] We need to at least sketch in the places where church upgrades will go, as well as a plan to get rid of Sterling

## Church Sermon Effect

- Okay, so this looks a fair amount different from street preaching. I'll try to describe the whole process.

- Without any congregation at first, let's start by defining first time attendees.
- We'll use churchSettings.expectedAttendees for this, modified by my.preacherStrengths.gatherCrowd and getSpiceMultiplier.
  These will be heavily based on the religious demographics of the location, with a 2x bonus for the religion that the church is affiliated with.
- So assuming firstTimeAttendees is 50, you'll have 50 people show up the first day, with the religious breakdown as described in the previous bulletpoint.
- This will create a temporary variable of today's congregation, which will look a little bit like...

  ```ts
  [
    {
      id: Number; // What religion is this group
      count: Number; // How many people of this religion are in the congregation today
      firstTimerCount: Number; // How many of these people are first timers
      likes: Number; // How much this group likes the sermon
      dislikes: Number; // How much this group dislikes the sermon
    },
  ]
  ```

Now the bulk of the work here is figuring out likes and dislikes, in summary:

- First check for dislikes by religion match (excluding mixed messages)
- Then check for likes by religion match (excluding mixed messages)
- Then compile all the tags which your sermon either liked or disliked, and use that to calculate a probability of likes and dislikes by tag match
- Then check for likes and dislikes by tag

- Now we'll preach to the congregation. Starting with the ones with the highest count

- **NOTE:** For all the math of checking for likes and dislikes, please take my.preacherStrengths.getLikes, my.preacherStrengths.getDislikes and getSpiceMultiplier into account.

### First, get likes and dislikes by religion match

- Start by seeing if the religion of this group is in my.sermonToday.mixedMessages.religion, if it is, skip trying to get likes or dislikes by religion match
- See if there's a match for that religion in my.sermonToday.dislikedBy.religions. Use the count of people in this group and gameSettings.churchPreaching.dislikeChance.byReligion to see how many people have been offended by the sermon. Add that number to dislikes.
- See if there's a match for that religion in my.sermonToday.likedBy.religions. Use the count of people in this group and gameSettings.churchPreaching.likeChance.byReligion to see how many people have been pleased by the sermon. Add that number to likes.

- NOTE: When checking for likes and d

- Repeat the process for all religions in today's congregation

### Then, get likes and dislikes by tag match

- Pull the list of tags from both my.sermonToday.likedBy.tags and my.sermonToday.dislikedBy.tags, but discard any tags that are also in my.sermonToday.mixedMessages.tags
- create a new temporary array of those tags and give each a sermon value of either "positive" or "negative" depending on which list they came from.

```ts
[
  { tag: "body", weight: 1, sermon: "positive" },
  { tag: "tradition", weight: 1, sermon: "positive" },
  { tag: "money", weight: 1, sermon: "negative" },
  { tag: "family", weight: 2, sermon: "negative" },

  // etc.
];
```

- Then shuffle the array, so we'll randomly be checking for both negative and positive reactions
- Now, loop thru each religion, and do the following.
  - Create a tag score by...
    - Start with 0
    - If the religion has this tag in their likes, and the tag as a sermon of positve add +1 \* weight to the tag score
    - If the religion has this tag in their likes, and the tag as a sermon of negative subtract -1 \* weight from the tag score
    - If the religion has this tag in their dislikes, and the tag as a sermon of positive subtract -1 \* weight to the tag score
    - If the religion has this tag in their dislikes, and the tag as a sermon of negative add +1 \* weight to the tag score
- Now that we have a tag score for that religion, use that and gameSettings.churchPreaching.likeChance.byTag and gameSettings.churchPreaching.dislikeChance.byTag to figure out how many people of this religion liked or disliked the sermon.

- After all that work, here's what I'd expect:
  - A mixture of likes and dislikes, depending on how well my sermon matched the congregation
  - Some people have no reaction, but a good chunk of people have either liked or disliked the sermon

## Update Religious Scorecard

- Based on the work you've done, you can update my.religiousScorecard for each religion in attendance
- +1 to score for each like
- -1 to score for each dislike

## Update Church Buzz

- Based on total likes and dislikes for the day (across all religions) use that to modify my.church.buzz

## Collect Donations

- Finally, use total likes, churchPreaching.donation.chance, my.preacherStrengths.getDonations and getSpiceMultiplier to figure out how many people donated.
- Use churchPreaching.donation.min and churchPreaching.donation.max to figure out how much each person donated.

## Church Attendance Past Day 1

- After your first day, you will start to use my.church.buzz to tweak today's attendees (coupled with the other values used)
- After your first day, use my.religiousScorecard to adjust the demographics of those attendees. Higher scores mean that religion is more likely to show up, lower scores means they are less likely
- The effect of buzz should be noticeable, but not OVERWHELMING. Like if you do really really good one day, maybe that's a 15% increase in attendees the next day. If you do really poorly, maybe that's a 15% decrease in attendees the next day.

## Sterling Silver

PROFILE: Sterling Silver is a disgraced former televangelist currently in prison for tax fraud, money laundering, and other assorted financial crimes. He is introduced as a necessary step for the player to continue the game, but he is also a hinderance to the player's later financial success.

### INSPIRATIONS

- Jim Bakker
- Dr. Eli Gemstone (John Goodman's character in the TV show "The Righteous Gemstones")
- Paulie "Walnuts" Gualtieri (Tony Sirico's character in the TV show "The Sopranos")

### CHARACTER NOTES

- Sterling has lived a very successful life owed equally to his charisma, his pious words, and his ruthlessness. He wants to be seen as a humble servant of The Lord, but he is exclusively in it for the money. He is prone to extreme fits of anger, and will become threatening, violent and vulgar at the drop of a hat, but will switch back to being charming and pious when it suits him.

### INITIAL CONTACT

- The player must have a van and should have preached a location other than Starting Location for 3+ days.
- When the trigger is met, at the end of the day, show a toast that the player found a note on their van.
- Show the note on the screen

### Sterling's Initial Note

> Dearest [playerName],
>
> The Lord has seen fit to bring us together, and I must say, it is no coincidence. I have been watching your work, and it is clear to me that you are destined for something far greater than the humble beginnings you now occupy. You have the spark, the fire, the _potential_ to build a ministry that will echo through the ages.
>
> I am Sterling Silver. If you know anything about faith on television, you know my name—I was once America’s most celebrated televangelist. These days, I write to you from a cell, punished not for my devotion, but by the wicked who envy true greatness. They call it fraud, money laundering [crossed out "maybe murder"] but let me assure you: the righteous are always persecuted. The Lord moves in mysterious ways, and I remain His most devoted servant. Together, we can do great things.
>
> Now, I see in you the opportunity to continue my legacy. Together, we will build something extraordinary—a ministry that will shake the heavens and fill the coffers. You will preach, and I will guide. You will gather, and I will multiply. The Lord’s work is never done, and neither is mine.
>
> Text me at (555) SIL-VERY. Do not keep me waiting.
>
> Yours in faith and commerce,  
> Sterling Silver

- Once you have read the note, you can text Sterling at any time using the chat interface.

### Communicating With Sterling

- At the beginning, there's two things you can do:
- Ask him about the deal
- Agree to the deal

- If you ask him about the deal, he will explain the terms: Sterling will set up a church in the location of your choosing. In return, you will pay him `sterlingCutPercentage` per day of all of your donations.
- He will also say you must give him at least `sterlingMinimumCut` per day, even if your donations are low, but he trusts you can make more than that.
- That's pretty much it. If you ask him again, he clarifies, but it makes him angrier.
- We need a new interface for opening up a church. It should be fairly similar to src\views\megachurch\pug_choose-place.pug except:
  - You must give your church a name
  - You must choose a religion for your church

## Gameplay From Then On

- If you're in the location where your church is, you will preach in your church.
- If you decide to travel somewhere else, you can still preach street sermons, but your church will remain empty that day
- Even if you decide to street preach, Sterling still wants his money
- He doesn't know what you made in donations, so instead he takes his minimum, plus a fee to punish you for leaving "his church"

## Acceptance Criteria

- [ ] As a player, I will see the note from Sterling once the requirements are met
- [ ] Once I see the note, I can text Sterling using a chat interface
- [ ] In the chat iterface, I can ask Sterling about the deal
- [ ] In the chat interface, I can agree to the deal
- [ ] Once I agree to the deal, I am required to choose a location for my church, a name for my church, and a religion for my church
- [ ] If I am in the same location as my church, I will preach in my church
- [ ] Preaching in a church follows the logic described in the Church Sermon Effect section above
- [ ] As I preach in my church, I should see my congregation grow or shrink by a max of 15% per day based on my performance
- [ ] As I preach in my church, I should see the attendee religions be affected by the topics I've selected
- [ ] Preaching in a church, if done correctly, should be more profitable than street preaching, even taking Sterling's cut into consideration

## Implementation Notes

- It is OKAY to add variables, functions, and computeds that aren't strictly doucmented here, if they are needed to implement the documented features.
- It is ENCOURAGED to completely rewrite createChurchSermonEffect() - I have changed a lot of how I want it to work, and so while you definitely should reference it, I feel like it will probably be better if you rewrite that function from scratch.
- It is DISCOURAGED to add hardcoded numbers for logic, instead it is preferred to have those be in either gameSettings. or my. variables, so that they can be easily adjusted later.
- It is WELCOME to add to the AGENT NOTES section at the bottom of this doc with any questiions, next steps, loose threads or notes for me to digest
- It is APPRECIATED if you write any tests while working on your implementation. If you do, please use vitest, and make the tests simple.

## Sample Variables

For reference, this is how I'd like the variables structured, but you can modify as you see fit.

```ts

const my = {
  church {
    isFounded: false,
    location: null,
    name: "",
    religion: null,
    buzz: 0, // This will be used to adjust
  }
  chats: {
    sterling: {
      hasContacted: false,
      moneyOwed: 0,
      isAlive: true,
      currentMood: 0, // Ranges from 100 (extremely pleased) to -100 (murderous rage)
      chatHistory: [],
    },
  }
}
const gameSettings = {
  // ...
  churchPreaching: {
    expectedAttendees: 50, // Unmodified value of the expectation of attendees at a given day's sermon.
    religionMatchBonus: 200, // Percent bonus to both like and dislike checks if the church's religion matches the attendee's religion
    dislikeChance: {
      byReligion: 30,
      byTag: 30,
    },
    likeChance: {
      byReligion: 45
      byTag: 35
    },
    donation: {
      chance: 80, // % chance that someone who likes your sermon donates
      min: 2, // Minimum $ per donation
      max: 10, // Maximum $ per donation
    }
    sterlingCutPercentage: 35, // Sterling's cut of daily donations
    sterlingMinimumCut: 75, // Minimum amount (in dollars) Sterling takes
    emptyChurchPenalty: 50, // If you don't preach at your church, Sterling takes this much extra
  }
}
```

---

AGENT NOTES
