# Comparatively Famous

Cameo is a website that has celebrities providing personalized messages for customers, at prices set by the celebrities themselves.

This is a game about those prices.

## How to Play

Each round, you'll be provided with three celebrities in the left column. Your job is to put them in the right column, sorted by value.

After verifying your results, you'll be shown two celebrity prices. You must guess on that missing celebrity price, knowing that each on is in order.

For example, if the most expensive celebrity is $300, and the least expensive is $100, and you have to guess the middle. You know your guess should be between $101 and $299.

### The Final Round

Pasha may email you while you're playing. If he does, you'll need to do a job for him. Don't break the budget.

## Game Mechanics & Scoring

### Rounds

- **Maximum rounds:** 4 regular rounds + 1 final round
- **Celebrities per round:** 3 celebrities to sort

### Scoring System

| Action                                     | Points Awarded                |
| ------------------------------------------ | ----------------------------- |
| **Correct celebrity sort**                 | 100 points                    |
| **Perfect price guess**                    | 250 points                    |
| **Close price guess** (within $50)         | 200 - (difference × 4) points |
| **Successful birthday wish** (final round) | 100 points                    |

### Price Guessing Mechanics

- **Perfect guess:** Exactly correct = 250 points
- **Close guess:** Within $50 = sliding scale (196-200 points)
- **Far guess:** More than $50 off = 0 points

### Final Round (Pasha's Budget)

- **Budget calculation:** Sum of all 10 celebrities ÷ 2.5
- **Budget cap:** Maximum of $1,000
- **Success condition:** Stay within budget to keep all points
- **Failure penalty:** Lose ALL final round points if budget exceeded

### Penalty System

- **Incorrect sorts:** No points deducted, just no points awarded
- **Budget exceeded:** Lose all final round points earned
- **Bad price guesses:** No points deducted, just no points awarded

## Game Variables

| Variable                    | Value                         | Purpose                                  |
| --------------------------- | ----------------------------- | ---------------------------------------- |
| `settings.maxRounds`        | 4                             | Number of regular rounds                 |
| `settings.maxBudget`        | 1000                          | Maximum budget cap                       |
| `settings.minBudget`        | 500                           | Minimum budget floor                     |
| **Sort points**             | 100                           | Points per correct celebrity ranking     |
| **Perfect valuation**       | 250                           | Points for exact price guess             |
| **Close valuation formula** | 200 - (difference × 4)        | Points for guesses within $50            |
| **Birthday wish points**    | 100                           | Points per celebrity hired within budget |
| **Budget formula**          | (sum of 10 celebrities) ÷ 2.5 | How Pasha's budget is calculated         |
| **Close guess threshold**   | $50                           | Maximum difference for "close" bonus     |

## Special Game Modes

The game includes several themed rounds with pre-selected celebrity lists:

- Sopranos cast members
- Dog-related celebrities
- Various other themed collections

These use the same scoring mechanics but with curated celebrity lists instead of random selections.
