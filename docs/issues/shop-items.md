## Test Street Preaching Income

Purpose of the doc:

In repeated playtests, I've noticed two problems:

1. The Marketing items in the shop are simply underwhelming. They are too expensive for the value they provide, so they're not worth using.
2. A lot of the items in the Mammon Shop are simply unaffordable. In playtesting, I'm often earning less than $20,000 per game TOTAL, so while it's fun to have very expensive items, and I still one some to be very difficult to buy, I want the player to be able to afford more items in the Mammon Shop before the game ends.

And then, while we're making these changes, I also want to sketch out a new feature for the Eternal Legacy that we can implement later.

## Proposed Changes

### Marketing Items

1. Let's make the General Internet Ad Campaign work differently. It will not be temporary increase, but instead it will be a slight increase to `my.church.buzz`. I will leave it up to you to decide the exact amount, but please make sure that the player will get an idea of the kind of attendance boost they can expect. Also please do your best to adjust the price so that it's on par with the amount of boost it provides. Make it so that it can be purchased multiple times, but it gets 2x as expensive each time it's purchased.
2. For Targeted Internet Ad Campaign, let's make it run for more days. It only runs for 1, but I'm not SURE if the the game logic supports simply supporting `duration` to be increased. Please verify that we're supporting marketing efforts that last more than 1 day, and then increase the duration to 3 days.
3. For the Sign Spinner, let's make it cheaper, and change the UI so that the player can hire the Sign Spinner for multiple days at once. Let's say you'll pay the sign spinner $20 per day, keep the attendance boost the same, and let the sign spinner be hired for up to 7 days at once.
4. For the PR Campaign, let's make it permanent. You get 5 points added to that religion's scorecaard at the point of purchase. This can be purchased as many times as you like. Increase the price to $250

### Mammon Shop Items

Basically what we need to do is allow for the purchase of Mammon Items costing between $500 and $8,000. Let's keep 2 expensive items: The Idol of Baal and the Golden Claf, since those are the most biblically specific pieces, so those can be more exepensive. The rest, make them cheaper. Adjust the names and descriptions to fit the new prices. Also make the prices longer.

### Celebrity Centre

1. The next thing I'm going to want to add to the Eternal Legacy is a celebrity centre, where you can get celebrity endorsements, which gives you BOTH a boost to attendance AND a boost to your Mammon score. Maybe there's celebrities who give you mammon but are toxic to religious audience that they actually decrease your attendance.

But, for now, please sketch up a few celebrties with costs, boosts, and mammmon. A few of the celebrities I'm thinking about right now are:

- A terrible rapper, similar to RiFF RaFF
- A religious tik tok influencer
- A former pornographic actress
- A washed-up action movie star, similar to Steven Seagal

## Notes

- The goal of all of this is to be funny as well as providing gameplay mecahanics. Please maximize the humor and satirical absurdity in your names and descriptions

```ts
export interface EternalLegacyCelebrity {
  id: string;
  name: string;
  cost: number; // One time-cost
  dailyCost?: number; // Amount the celebrity costs per day (if applicable)
  mammon?: number; // Mammon gained when celebritity is gained
  religion?: string; // Name of the religion that this celebrity is popular with
  attendanceBoost?: number; // Flat attendance boost
  religionBoost?: number; // Boost to religion score (if religion is defined)
  description: string; // humorous, please.
  dayEndorsed?: number; // Day of celebrity acquisition
}
```
