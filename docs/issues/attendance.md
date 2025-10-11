## Church Attendance Tweaks

Let's tweak the `createChurchSermonEffect()` function (currently lines 888 to 1379 in `src\views\megachurch\Megachurch.vue`) in the following ways:

- Make a discrete function that handles all the stuff in gathering the audience for the day. Call this new function `gatherChurchAudience()`
- Inside that function, it will do everything that already happens to generate the `my.congregation` array, but with some improvements
  1. I'm not seeing `my.marketing.generalAdActive` and `my.marketing.generalAdActive` have an effect. In my playtesting, I'm getting an audience of about 70 whether or not I use those marketing effects
  2. Over time, you should be able to grow your audience by having good sermons. There's a variable called `my.church.buzz` which we're not using, which could be helpful here. Let's have that be affected by how good your sermon was overall.

I think the problem might be that the marketing effect is being reset at the wrong time. You buy the marketing at night, so it should affect what happens the next morning. Fixing this should address the problem we're having with it having no effect even though it looks like it should.

## Buzz

As for buzz, here's what I think we should do:

1. Once all the likes/dislikes, have been determined, use that toal difference (+1 for likes -1 for dislikes) to adjust `my.church.buzz` - It should never have a score of less than 0.
2. Create a new variable of `gameSettings.church.buzzMultiplier`. I'm thinking it should get a number of somewhere around 0.1, but I'm happy to have you play with that number to create the intended effect
3. When gathering an audience for the next day, use `my.church.buzz` and `gameSettings.church.buzzMultiplier` to increase the size of your audience (before marketing effects are applied).
4. The maximum size of your audience should be capped at `my.church.maxCapacity`, which is already being used in the code - but give a toast if that limit is reached.

ALSO: While you can purchase extra pews, let's give it a limit. So let's say the most pews you can buy is 10.

## Acceptance Criteria

- [ ] All the stuff that involves creating your attendance for the day is in a new function, which is called `createChurchSermonEffect()`
- [ ] Baseline attendance should be somewhere around 70 or so.
- [ ] If you preach a good sermon, your attendance the next day should increase by as much as 10-20 people.
- [ ] Marketing efforts (purchased the preivous night) should increase attendance as well
  - [ ] General Ad Campaign: 25%
  - [ ] Sign Spinner: 10%
  - [ ] Buzz will compound
- [ ] Starting max Attendance is 100, increased by 10 with every church pew, to a maximum of 200
