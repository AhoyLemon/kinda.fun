# Sermon Preparation

- First, we use `my.sermonToday.topics` to generate `my.sermonToday.likedBy`, `my.sermonToday.dislikedBy`, and `my.sermonToday.mixedMessages`.
  - Each topic has a `likedBy.tags`, `dislikedBy.tags`, `likedBy.religions`, and `dislikedBy.religions`
  - FOR EACH TOPIC IN `my.sermonToday.topics`
    - go through `likedBy.religions` and add to `my.sermonToday.likedBy.religions` if not already present
      - if it IS already present, add +1 to the weight
    - go through `dislikedBy.religions` and add to `my.sermonToday.dislikedBy.religions` if not already present
      - if it IS already present, add -1 to the weight
    - go through `likedBy.tags` and add to `my.sermonToday.likedBy.tags` if not already present
      - if it IS already present, add +1 to the weight
    - go through `dislikedBy.tags` and add to `my.sermonToday.dislikedBy.tags` if not already present
      - if it IS already present, add -1 to the weight
    - THEN, go through `my.sermonToday.likedBy.religions` and see if any are ALSO in `my.sermonToday.dislikedBy.religions`
      - If so, to `my.sermonToday.mixedMessages.religions`
    - THEN, go through `my.sermonToday.likedBy.tags` and see if any are ALSO in `my.sermonToday.dislikedBy.tags`
      - If so, to `my.sermonToday.mixedMessages.tags`

## The Goal of Sermon Collection

- Use the three topics to get the religions and tags who will like and dislike your sermon, if you mention a religion or tag more than once, that increases the liklihood of that effect
- However if a religion or tag is in both likedBy or dislikedBy, that effect is nullified (regardless of weight)

## Once you have a sermon collected, you will advance to either Street Preaching or Church Preaching (depending)

## Street Preaching

- Variables used:
  - `my.preacherStrengths`
  - `my.sermonToday`
  - `my.placeIndex`
  - `getSpiceMultiplier`
  - `gameSettings.streetPreaching`
  - `places[yourPlaceIndex]`

### HIGH LEVEL CONCEPTS

- The crowd will be fresh every time, determined by the demographics of the location only.
- Street Preaching crowds are disposable. You'll get likes, dislikes and donations, but what you do one day has little if any effect on the next.
- Structurally, create a crowd of individuals with a neutral reaction, try to run processes to get them to a "like" or "dislike" state.
- Once a person is in either a "like" or "dislike" state, they will not change their mind
- At the end of the day, the amount of "neutral" reactions should be >= the "like" and "dislike" reactions combined.

### Steps

1. Create a crowd.

- The number of people in the crowd is determined by `gameSettings.streetPreaching.baseCrowdSize` modfied by `my.preacherStrengths.gatherCrowd`, `getSpiceMultiplier()`, and the location's `totalPopulation`

2. Determine the religions of the crowd

- For each person in the crowd, use the location's `religions` array to determine each person's religion. The `weight` property is a multiplier, so a religion with a weight of 2 is twice as likely to be chosen as one with a weight of 1. You should now have an array of people with neutral reactions to the player.

3. Try for likes and dislikes based on your religion

- For each person in the crowd, see if their religion is in `my.sermonToday.likedBy.religions` and/or `my.sermonToday.dislikedBy.religions` and/or `my.sermonToday.mixedMessages.religions`.
  - If there's a match in mixedMessages, fail this check. Mixed messages will fail to convince.
  - If there's a match in dislikedBy, there is a `gameSettings.streetPreaching.dislikeChance.byReligion` percent chance of that person disliking your sermon.
  - If there's a match in likedBy, there is a `gameSettings.streetPreaching.likeChance.byReligion` percent chance of that person liking your sermon.

4. Try for likes and dislikes based on your tags

- Create a new temporary array which gathers up all the tags in `my.sermonToday.likedBy.tags` and `my.sermonToday.dislikedBy.tags` which don't also appear in `my.sermonToday.mixedMessages.tags`
- Shuffle the array
- For each person in the crowd still in a neutral state, see if their religion likes or dislikes the tags, handled in the order of the shuffled array
  - If their religion is in `my.sermonToday.dislikedBy.tags`, there is a `gameSettings.streetPreaching.dislikeChance.byTag` percent chance of that person disliking your sermon.
  - If their religion is in `my.sermonToday.likedBy.tags`, there is a `gameSettings.streetPreaching.likeChance.byTag` percent chance of that person liking your sermon.
  - Continue like this until the person is either in a like or dislike state, or you've run out of tags.

4. Now collect donations

- For each person in the crowd, if they are in the "like" state, there is a `gameSettings.streetPreaching.donationChance` percent chance of them donating.
- If they do donate, they will donate an amount between `gameSettings.streetPreaching.donationAmount.min` and `gameSettings.streetPreaching.donationAmount.max`, modified by `my.preacherStrengths.collectDonations` and `getSpiceMultiplier()`.

## Church Preaching

- Variables used:
  - `my.preacherStrengths`
  - `my.sermonToday`
  - `my.placeIndex`
  - `my.sermonYesterday`
  - `getSpiceMultiplier`
  - `gameSettings.churchPreaching`
  - `places[yourPlaceIndex]`

### High Level Concepts (Church Preaching)

- A lot of this works similarly to street preaching, but for key differences:
  - Unlike with street preaching, `my.religiousScorecard` plays a key effect. It will be used to generate your audience demographics, and updated at the end of your sermon each day.
  - Additionally, `my.church.religion` will also play an effect. Your congregation is 2x as likely to be of your religions' declared religion as they would be otherwise.
  - Also, your congregation can get bored of a topic if they've already heard it, so topics delivered two days in a row will have a diminished effect

### Steps

1. Create a crowd

- The number of people in the crowd is determined by `gameSettings.churchPreaching.baseCrowdSize` modfied by `my.preacherStrengths.gatherCrowd`, `getSpiceMultiplier()`, and the location's `totalPopulation`.
- It is capped by `my.church.maxAttendance`

2. Determine the religions of the crowd

- Look at the location's `religions` array. Each religion has a `weight` property, which is a multiplier for how likely that religion is to be chosen.
- Then look at `my.religiousScorecard`. The scores provided there will further, adjust the weight, so if one religion has a weight of 2, and a score of +3, that religion is 5x as likely to be chosen as one with a weight of 1 and a score of 0.
- Finally, if a religion matches `my.church.religion`, that religion's weight is doubled.
- You should now have an array of people with neutral reactions to the player.

3. Try for likes and dislikes based on the person's religion

- This logic is identical to how it works for street preaching, except you'll use `gameSettings.churchPreaching` for all checks instead of `gameSettings.streetPreaching`

4. Try for likes and dislikes based on your tags

- This logic is identical to how it works for street preaching, except you'll use `gameSettings.churchPreaching` for all checks instead of `gameSettings.streetPreaching`

5. Now collect donations

- This logic is identical to how it works for street preaching, except you'll use `gameSettings.churchPreaching` for all checks instead of `gameSettings.streetPreaching`

5.  Finally, update `my.religiousScorecard`

- For each person in the crowd who liked your sermon, increase that religion's score by 1
- For each person in the crowd who disliked your sermon, decrease that religion's score by 1
- ALSO, we need to track the change for the day, so each object tin `my.religiousScorecard` should also have a `change` property which is reset to 0 at the start of each day, and updated here.

6. End of Day

- Give Sterling Silver's cut (`gameSettings.churchPreaching.sterlingSilverCut` percent of today's donations)
  - If Sterling Silver's cut is less than `gameSettings.churchPreaching.sterlingMinimumCut`, give them that instead.
- Move `my.sermonToday` to `my.sermonYesterday`
- Use `src\views\megachurch\pug\_sermon-results.pug` to show the player:
  - How many attended
  - How many donated
  - Changes to your religious scorecard for today
  - Total donations
  - Total donations after Sterling Silver's cut

## Expectations

- [ ] Preaching in a church will have a better chance for donations than preaching on the street
- [ ] As you continue to curry favor with a religion, they will be more likely to attend your church in the following days
- [ ] In street preaching, it is normal more people will feel neutral about your sermon that likes and dislikes combined.
- [ ] If you preach about a topic two days in a row, it will be less effective the second day, but only if you do it in church
