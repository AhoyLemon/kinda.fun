# Pretend World

## Overview

You are at a party of celebrity impersonators. You see a cheese log. In order to get to the cheese log, you must correctly guess celebrity impersonators.

## How It Works

Each round, you meet a celebrity impersonator and must guess who they're pretending to be. Your guesses affect the mood of the party:

### Your Guesses

| Guess Type  | Points | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| **Correct** | +1.0   | You get their name exactly right             |
| **Close**   | +0.7   | You're close enough (typos, nicknames, etc.) |
| **Wrong**   | -0.85  | You're way off                               |

### Party Mood

| Mood Level           | Score Range   | Description                                 |
| -------------------- | ------------- | ------------------------------------------- |
| **Very Good Mood**   | Above 0.69    | Everyone loves you, you're doing great      |
| **Pretty Good Mood** | 0.40-0.69     | People are enjoying your company            |
| **Neutral Mood**     | 0.20-0.39     | You're blending in fine                     |
| **Pretty Bad Mood**  | -0.18 to 0.19 | People are starting to notice your mistakes |
| **Very Bad Mood**    | Below -0.18   | The party is getting uncomfortable          |

### What Happens

- Good guesses move you closer to the cheese log
- Wrong guesses don't help your cheese progress
- If the party mood gets very bad you will be kicked out.
- Reach the cheese log and you win!
