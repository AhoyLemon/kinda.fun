# Invalid Game Documentation

## The Premise

Invalid! is a trivia game about making things difficult for other people. It can accept 2 or more players, but it's best with 3–6.

## How to Play

### Video Explanation

[![Watch the video explanation](https://img.youtube.com/vi/uhA83jtHmzM/0.jpg)](https://www.youtube.com/watch?v=uhA83jtHmzM)

Each round will have one SysAdmin, and everyone else is an employee. The only thing the employees want to do is successfully create a password. If they can successfully create a password, they've succeeded in the round. It's the goal of the SysAdmin to make that as difficult as possible.

Each round, the SysAdmin will choose a category of acceptable passwords (for example: "Types of Cheese"). This will generate a list of acceptable passwords that can be used. The SysAdmin can then cut down that list by adding rules (for example "You can't use the letter R" or "Your password must be more than 6 letters"). Each rule will cost some amount of ƒ, which the SysAdmin can spend as they like.

Once rules are set, the SysAdmin can then create bugs in the system. (For example: "PARMESAN"). If any player types in one of the bugs the SysAdmin set, the server crashes and the round is over. The first bug is free, each additional bug costs 1 ƒ.

There are time limits for both the SysAdmin and the employees.

When the round concludes, a new SysAdmin is named.

## Final Round

In the final round, all players try to crack any other player's password. All passwords entered in any round are fair game. If a player cracks another employee's password, they steal points from that player. Passwords can only be cracked once.

If a player accidentally cracks their own password, they are punished.

## Points

| Player Type | Points | Action                                                            |
| ----------- | ------ | ----------------------------------------------------------------- |
| Employee    | +100   | Password Entered Successfully                                     |
| Employee    | +20    | Bonus For Getting Password First (only for games with 3+ players) |
| SysAdmin    | +3     | For Each Second Of Password Entry                                 |
| SysAdmin    | +100   | Caused A System Crash                                             |
| Any Player  | +40    | Cracked Another's Password                                        |
| Any Player  | -40    | Password Was Cracked                                              |
| Any Player  | -50    | Cracked Your Own Password                                         |

## SysAdmin Powers

Each time you become SysAdmin, you are given a set amount of ƒ (Rulebux) to spend on powers and bugs. The first bug you add is free; each additional bug costs 1 ƒ.

| Power           | Cost (ƒ) | Description                                                                 |
| --------------- | -------- | --------------------------------------------------------------------------- |
| Demand A Letter | 5ƒ       | Password must use letter of SysAdmin's choosing                             |
| Ban A Letter    | 3ƒ       | Password cannot use letter of SysAdmin's choosing                           |
| Shibboleth      | 3ƒ       | Employees must enter word of SysAdmin's choosing before entering password   |
| Flying Pig      | 3ƒ       | A Flying Pig appears on Employee's screen, offering unhelpful advice        |
| Set A Maximum   | 2ƒ       | Maximum Characters are enforced (average character count +2)                |
| Set A Minimum   | 2ƒ       | Minimum Characters are enforced (average character count -1)                |
| Limit Vowels    | 1ƒ       | Maximum Vowel use is enforced (average vowel count + 1)                     |
| Ban A Combo     | 1ƒ       | Employees cannot use two letters of the SysAdmin's choosing in the password |
| Add Bug         | 1ƒ       | Add a bug to the system (first bug is free)                                 |

## Timers

| Player   | Seconds | Activity                               |
| -------- | ------- | -------------------------------------- |
| Employee | 50      | Time To Guess                          |
| Employee | 20      | Time To Guess After 1 Employee Success |
| Admin    | 90      | Time To Set Rules                      |
| Everyone | 30      | Countdown To Final Round               |
| Everyone | 60      | Final Round Guessing                   |

## Round Count

| Players    | Rounds             |
| ---------- | ------------------ |
| 2 players  | 6 rounds           |
| 3 players  | 6 rounds           |
| 4 players  | 8 rounds           |
| 5 players  | 5 rounds           |
| 6+ players | 1 round per player |

|

## Game Phases

| Phase           | Description                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| pregame         | Players are in the lobby, waiting for the host to click start game                                                      |
| choose rules    | The sysadmin hasn't hit "OnBoard Employees" yet. Could be either choosing challenge, setting up rules, or defining bugs |
| add bugs        | The sysadmin has finished with rules and is now adding bugs. Only SysAdmins see this phase                              |
| create password | The guessing has begun!                                                                                                 |
| crashed         | Someone crashed the server. Waiting for SysAdmin to click next round                                                    |
| FINAL ROUND     | This is the FINAL ROUND. You may be cracking passwords or reading instructions                                          |
| GAME OVER       | The game has ended. We're just gonna show you the scores and a summary of what happened                                 |

## Attempt Results

| Result  | Description                                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| failed  | Your password attempt failed. It could be that it violated a rule, or it wasn't a match with the list, or someone else got to it first |
| success | Your password worked and you got points                                                                                                |
| crash   | This password crashed the server                                                                                                       |

## What stats exist?

| Where                                         | What                                                   |
| --------------------------------------------- | ------------------------------------------------------ |
| `/stats/invalid`                              | Games Started & Finished                               |
| `/stats/invalid/bugs`                         | Bugs created & how many times they crashed the system  |
| `/stats/invalid/gameSizes`                    | Games Started/Finished by group size                   |
| `/stats/invalid/challenges`                   | Password challenges played                             |
| `/stats/invalid/passwords`                    | Passwords created and how many times they were cracked |
| `/stats/invalid/rules`                        | Rules implemented                                      |
| `/stats/invalid/letters`                      | Letters that were demanded or banned by a rule         |
| `/stats/invalid/rules/Shibboleth/shibboleths` | Shibboleths deployed                                   |
