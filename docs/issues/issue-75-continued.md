This is meant to continue the work of the last few agent assisted commits, eventually getting us to a solution for Issue #75 , located here https://github.com/AhoyLemon/kinda.fun/issues/75

- Please consult docs\issue-75.md for the original request...

## TO DO

- [ ] Chat.vue is all over the place, I'd like to consolidate the various arrays of messages into a single object, which I will probably import, something like....

```ts
interface Messages {
  plug: {
    casual: {
    to: string[];
    from: string[];

    }
  };
  harold: {
    haggle: {
      to: string[];
      from: string[];
    },
    chat: [
      to: string[];
      from: string[];
    ]
  };
  sterling: {
    clarify: {
      to: string[];
      from: string[];
    },
    prison: {
      to: string[];
      from: string[];
    }
    // etc
  };
}
```

- [ ] Basically I want a single importable `chatMessages` object that will contain all the possible messages to and from the person, being chatted with, replacing the diaspora of `haroldChatPlayerMessages`, `sterlingClarifyResponses`, `casualPlugResponses` etc etc
- [ ] There is also `sendCasualMessage()` (for the plug), `sendHaroldMessage()` (for Harold), and `sendSterlingMessage()` which are BASICALLY the same, but with slight variations. Instead, I'd like something like `sendMessage(person, messageType)` to normalize out a lot of that work.
- [ ] `sendOrder`, `buyVan()` and `startChurchFounding()` do have some special actions involve. It would be nice if they could also be moved to `sendMessage()`, but they can be left separate if that involves too much refactoring
- [ ] ALSO in `src\views\megachurch\Megachurch.vue` and `src\views\megachurch\ts\_variables.ts` I'm noticing some variables which I **very much hope** can be deprecated and removed....

- [ ] Simplify `preachSermon()`
  - It seems like this function does a lot of prep work before handing it over to either `createStreetPreachingEffect()` or `createChurchSermonEffect()`
  - I question how much of this prep work is being used.
  - [ ] Please make sure all of the prep being done here is actually useful in either of those two functions.
- [ ] Remove `my.followers` (if possible)
  - I BELIEVE, though we are working with it, my.followers doesn't actually have any gameplay effects.
  - I BELIEVE it's not being used for church sermons, which is the only place where you'd have followers.
  - I BELIEVE that it IS being referenced in street preaching, though not creating any actual gameplay effects. Street preaching should be:
    - Gather a crowd based on location demographics
    - Preach to that crowd
    - They either like or dislike you
    - If they like you, they donate.
  - There is should be no concept of followers when you're stret preaching, simply the reaction of the people who like you.
  - If this is correct, please remove all references to `my.followers` and any code that generates or modifies it.
- [ ] Remove `gameSettings.donationCalculation`
  - I BELIEVE this is a vestigial piece of code that is no longer being used.
  - I BELIEVE that donation calculation is the result of `gameSettings.streetPreaching.donation` or `gameSettings.churchPreaching.donation` modified by `my.preacherSterengths` and `getSpiceMultiplier` and possibly some sermon effects.
  - If I'm correct, please kill `gameSettings.donationCalculation` and any references to it.
  - If I'm incorrect, please try to simplify donation calculation, and move any required variables to either `gameSettings.streetPreaching` or `gameSettings.churchPreaching` as appropriate.
- [ ] Remove `gameSettings.sermonScoring`
  - Very much similar to the above, I BELIEVE this is a vestigial piece of code that is no longer being used.
  - I BELIEVE that sermon scoring is the result of either `gameSettings.churchPreaching` or `gameSettings.streetPreaching` modified by `my.preacherStrengths` and `getSpiceMultiplier` and possibly some sermon effects.
  - If I'm correct, please kill `gameSettings.sermonScoring` and any references to it.
  - If I'm incorrect, please try to simplify sermon scoring, and move any required variables to either `gameSettings.streetPreaching` or `gameSettings.churchPreaching` as appropriate.
