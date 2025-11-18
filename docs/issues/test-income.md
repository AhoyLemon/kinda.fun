## Test Street Preaching Income

Purpose of the doc:

The goal of this test is to verify the pace of the game is working as we hoped. We want the player to to be able to make enough money through street preaching to afford the van in a reasonable amount of time, without making it too easy or too hard.

Goals:

- Verify the player can make enough money through street preaching to afford the van within 5-10 days.
- Verify we are not making it too easy to afford the van (e.g., within 1-2 days).
- Identify any potential bottlenecks or frustrations in the income generation process.

## Test Steps

- Create a new Vitest file at src\views\megachurch\tests\street-income.test.js
- Simulate spice level of 0, and select three random topics.
- Simulate street preaching with the randomly selected topics.
- At the end of each day, check the player's money. If they have enough to buy spice, spend up to $15 on spice (so between 1 to 3 spice for $5 to $15)
- Continue preaching until the player has enough money to buy the van ($75).
- Record the number of days it took to afford the van.
- Repeat the test 10 times to ensure consistency.
- When the tests are complete, show the average number of days to afford the van, plus the min and max days taken across all tests.

## Imports

- I REALLY REALLY want to make sure we're importing variables and functions from the actual game code, so we're not creating logic in tests that will be out of sync with the game
- To that end, make sure you import `my` and `gameSettings` variables and use those in the logic. Also please try to import any functions necessary to simulate preaching, such as `createStreetPreachingEffect()`.
- If you need to refactor any functions in `src\views\megachurch\Megachurch.vue` to make them more importable, please do so, as long as you don't change any game logic.

## Expected Outcomes

- It is POSSIBLE to not be able to afford $10 worth of spice in early days, but it should be RARE.
- The average number of days to afford the van should be between 5 and 10 days.

## Notes

- Most of the balancing will likely be made by tweaking the variables in `gamesSetings.streetPreaching`, so if you find the test is failing, please suggest specific variable changes to help bring the results into the desired range.
- Please use the `my` and `gameSettings` variables in your test logic rather than hardcoding any values that exist in those variables.
- Please don't edit any variables, though you can suggest where changes would be effective.
- Please document how to run the test in a newly created file at `docs/vitests.md` - Assuming that this new file will eventually create the documentation for all vitest files.
- If you've learned anything interesting in writing this test that you'd want to document for later copilot instructions, please amend `.github\copilot-instructions.md` with that information.
