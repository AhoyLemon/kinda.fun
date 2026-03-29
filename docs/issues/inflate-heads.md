## Inflate Guillotine Heads

Okay, so here's what my broad goal is. I want to be able to manipulate the records for guillotine to be about double (perhaps 1.75x) what they currently are, in the dev environment.

This is to compensate for a blackout period where the database got wiped.

SO, I think we can accomplish this in 3 parts.

## Create 3 Scripts

### New CSV Export Script

1. Create a new script in `scripts\firebase` called `guillotine-stats-to-csv.js`. The goal of this file is that it will read every document in `/stats/guillotine/heads/{name}` and write out a CSV file with the following columns:
   1. name
   2. headCount
   3. lastRemoved
   4. netWorth

   NOTE: I _think_ that every one of these documents should have all 4 of these columns. If you find any records that don't have all 4, the script should generate a list once run.

   It should ALSO read the document in `/stats/guillotine` and write out a CSV file with the following columns:
   1. gamesFinished
   2. gameLastFinished
   3. gamesStarted
   4. lastGameStarted
   5. scoresShared
   6. wealthCreated

   Let's put these new files in in `scripts\csv\stats\`

### CSV Manipaulation

2. Create a new script in `scripts\firebase` called `guillotine-inflate-stats.js`. This should go thru all of the heads defined in the first step and for each one, inflate the `headcount` by 1.75x. So if a head has a `headCount` of 100, then we would update that to be 175. The headCount should ALWAYS be an integer! Make sure it is.

- gamesStarted: Increase by 1.75x
- gamesFinished: 90% of whatever gamesStarted ends up as.
- wealthCreated: For each head, add headCount \* netWorth. The total of all of these across each head is the new wealthCreated value.
- scoresShared: Increase by 1.75x

IMPORTANT NOTES:

- Make sure it keeps the original csv files and generates a new one.
- Make 1.75 a constant. I might try a couple different numbers.

### Update Firestore with CSV

I'll review everything before I run it, BUT finally I need you to created a script called `scripts\firebase\guillotine-csv-to-firestore.js`. This will update all the values with the altered ones in the CSV file, but not bother editing any numbers that weren't changing. So, while we'll be updating the `headCount` for each head, we won't be changing the `lastRemoved` or `netWorth` values.

The main reason is that there are 10's of thousands of records, and we need to minimize updates.

Anyway, this script should update all the `headCount` values, as well as the 4 values in the main `guillotine` document.

## References

I have a number of scripts that already do things with Firestore. So you can reference...

- `scripts\firebase\cloneFirestore.js`
- `scripts\firebase\dumpFirestoreToProd.js`
- `scripts\firebase\purgeRooms.js`

## Acceptance Criteria

- [ ] I have 3 newly created scripts.
  1. One to create CSV files from Firestore
  2. One to manipulate the CSV files
  3. One to update Firestore with the new CSV files.
- [ ] When I run the first script, I get two new CSV files in `scripts\csv\stats\` with the correct columns.
- [ ] When I run the first script, it generates a list of any records that are missing any of the 4 columns.
- [ ] That list is saved somewhere. If that does happen, we'll likely need a fourth script, but we'll get to that later.
- [ ] The second script cannot be run if the first script hasn't been run, or if the corresponding CSV files have missing data.
- [ ] When I run the second script, I get two new CSV files in `scripts\csv\stats\` with the correct columns, and the adjustments described above
- [ ] The number to inflate by is is a constant so that it can be easily changed.
- [ ] Each time I run the second script, it generates two new CSV files, BUT they can have the same name. There's no reason I'd need to keep the old ones around.
- [ ] The third script has two consts for me to define the csv files.
- [ ] When run, the third script will update every head in `/stats/guillotine/heads/{name}` with the new `headCount` value, but will not change any of the other values.
- [ ] When run, the third script will update the main `/stats/guillotine` document with the new values for `gamesStarted`, `gamesFinished`, `wealthCreated`, and `scoresShared`, but will not change any of the other values.
- [ ] The third script will TRY to reduce the number of read/write actions, as this is a dev environment and there's 10's of thousands of records. So, minimize the updates so it doesn't break the free tier.
- [ ] If possible, scripts wil use pretty progress bars and colorful tables.
- [ ] `scripts\scripts-help.md` is updated info on these 3 new scripts.

## Notes

For this task, don't run any node scripts yourself, Communicate what I should run via node/pwsh and I'll run those commands via copy/paste.

## Change Requests

- [ ] I noticed you mentioned `cli-progress` not being a dependency. Please create a MD file that adds `cli-progress` (or something comparable, if you have something better/prettier/more modern, that's cool too) and then suggests UI/DX improvements for all the scripts in `/scripts` - I will turn what you write into a new GitHub issue, so call the new file `docs\issues\issue-169.md`
