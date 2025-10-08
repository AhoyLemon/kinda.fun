## Acceptance Criteria

- [ ] Eternal Legacy phase can be triggered after X days of church operation
- [ ] Heat Meter UI appears and tracks risk, with correct daily and action-based increases
- [ ] Player receives and can play Sterling's voicemail via a new interface
- [ ] Voicemail can be replayed at any time via chat
- [ ] Eternal Legacy Shop UI is accessible, with all items, costs, and mammon values
- [ ] Under the Table section is present, with all items and correct gameplay effects
- [ ] Toasts, notifications, and endgame screen display satirical/twisted Bible verses
- [ ] Endgame triggers on full heat, with legacy score and parody messaging
  - [ ] The full endgame buildout will be handled in a later issue. For the moment, a simple screen with your score and a list of lucre is sufficient.

---

## Implementation Notes

- It is OKAY to add variables, functions, and computeds not strictly documented here if needed for implementation.
- It is ENCOURAGED to keep all Eternal Legacy/Heat Meter/shop data in a central config for easy balancing.
- It is DISCOURAGED to add hardcoded numbers for logic; use gameSettings or variables for all tunable values.
- It is APPRECIATED if you write any tests while working on your implementation. If you do, please use vitest, and make the tests simple.
- It is UNDERSTOOD that you may need to modify endgame, shop, or notification logic to account for new features; please document any such changes in the appropriate docs/megachurch/\*.md files.

---

## 1. Logic to Start Eternal Legacy Mechanics

- The Eternal Legacy phase is triggered after the player has managed their church for a set number of in-game days.
- When the trigger is met, the player receives a voicemail from Sterling
- Upon triggering, the Heat Meter UI appears and begins tracking the player's risk of shutdown. Heat increases daily, influenced by the amuount of money the player earns, and increases more with suspicious/illegal actions.
- Once the player has a Heat Meter, they can access the Eternal Legacy shop from the end-of-day UI.

---

## 2. Voicemail Interface

- When the inciting incident trigger is met, the game notifies the player: "You have a new voicemail." The player is presented with an interface to play the voicemail from Sterling.
- The voicemail is recorded by the designer (not synthesized) and can be replayed at any time via the Chat.vue interface.
- Example script:

> Blessings and favor upon you, my dear friend—Sterling here. I trust you’re walking in the Lord’s abundance, as always.
>
> …Alright, let’s cut the shit. The Feds are paying attention. And let me be clear: they’re going to keep paying attention to you. The money you’ve made for me so far has been spent on things the federal government has traditionally taken exception to—simple-minded Judases who never understood that part of my religious mission involves a demonstration of the divine. And what’s more divine than the gold-plated shoes I just bought? If it were up to them, they’d say a man of God shouldn’t own a racehorse in the first place!
>
> Now, I know what you’re thinking—how do I get out of this? But let me stop you right there. I know how this ends: one way or another, you’re going in a box. It’s just a matter of time. So before the final altar call, do what any wise servant would: earn me enough mammon so we can both secure our eternal legacy. You catch my drift.
>
> I’ll be praying for you. But obviously, we’ve never met. Godspeed, servant of the Lord.

---

## 3. Eternal Legacy Shop

### Mammon-Scoring Items

> **Note:** Eternal Legacy items are very expensive and it is likely that most players will not be able to purchase all of them (or even most of them) in a single run. This is a game balance issue—should the player be able to buy more, or should the shop be aspirational and out-of-reach? Needs further consideration and playtesting.

| Item                            | Cost ($)   | Mammon Value | Description                                                              |
| ------------------------------- | ---------- | ------------ | ------------------------------------------------------------------------ |
| Golden Calf Statue              | $250,000   | 30,000       | The original idol investment. Guaranteed to anger at least two prophets. |
| Tower of Babel Playset          | $500,000   | 50,000       | Build your own monument to hubris—now with extra language packs!         |
| Thirty Pieces of Silver         | $3,000     | 300          | A collector’s set for the truly committed betrayer.                      |
| Pharaoh’s Chariot               | $400,000   | 40,000       | For when you want to ride in style—straight into the Red Sea.            |
| Sodomite Real Estate Portfolio  | $1,200,000 | 120,000      | Location, location, abomination.                                         |
| Babylonian Luxury Robes         | $60,000    | 6,000        | Fit for a king, or at least a cautionary tale.                           |
| Serpent-Handled Staff           | $35,000    | 3,500        | For miracles, mischief, and plausible deniability.                       |
| Idol of Baal                    | $200,000   | 20,000       | For when you want to hedge your bets on the afterlife.                   |
| Pearl Gates Keychain            | $12,000    | 1,200        | Why wait for heaven when you can carry the keys now?                     |
| Diamond-Encrusted Cufflinks     | $25,000    | 2,500        | For when you need to shine at the Lord’s table—and the IRS audit.        |
| LED Hubcaps (Custom Name)       | $10,000    | 1,000        | Let your chariot proclaim His glory in scrolling RGB.                    |
| Platinum Chalice                | $50,000    | 5,000        | Because the blood of Christ deserves nothing less than 24k.              |
| Solid Gold Business Card Holder | $30,000    | 3,000        | Blessed are those who network in style.                                  |
| Luxury Jet with Gold Trim       | $2,500,000 | 250,000      | Soar above temptation—and the common folk.                               |
| Diamond Fronts (Grillz)         | $60,000    | 6,000        | Let your smile dazzle the congregation and blind your enemies.           |
| Marble Baptismal Pool           | $120,000   | 12,000       | For baptisms that truly make a splash.                                   |
| Velvet Rope for VIP Section     | $15,000    | 1,500        | He said ‘let the children come to me’—but not without bottle service.    |
| Crystal Pulpit                  | $80,000    | 8,000        | Transparency in all things, except finances.                             |

### "Under The Table" Items (Gameplay/Story Effects, No Mammon)

| Item                     | Cost ($) | Effect/Description                                                                                           |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------ |
| Shredder Upgrade         | $25,000  | Temporarily slows heat gain, but lowers church reputation and reduces weekly donations.                      |
| "Sterling's Special Cut" | $50,000  | Sterling bribes the authorities to slow the investigation, but his cut of your income increases permanently. |
| Tax Attorney Retainer    | $100,000 | Reduces the amount you must pay Sterling, but increases heat and causes a scandal in your congregation.      |
| "Consultation with Tony" | $500,000 | Eliminates Sterling, dramatically increases heat, and triggers a major investigation event.                  |

### Shop Bible Verses & Satirical Messaging

Display a rotating selection of biblical verses about wealth at the top or bottom of the Eternal Legacy shop, but twist their meaning to fit the game’s parody.

> "It is easier for a camel to go through the eye of a needle than for a rich man to enter the kingdom of God—unless he has a private jet." (Mark 10:25, Prosperity Edition)

> "Do not store up for yourselves treasures on earth, unless they are tax-deductible." (Matthew 6:19, MegaChurch Translation)

> "For what does it profit a man to gain the whole world and lose his soul? But what if he gains a luxury yacht?" (Mark 8:36, Revised)

> "Render unto Caesar what is Caesar’s, and unto the Lord what is offshore." (Matthew 22:21, Executive Pastor’s Study Bible)

> "Blessed are the meek, for they shall inherit the VIP section." (Matthew 5:5, Velvet Rope Edition)

> "No one can serve two masters. Unless one of them is his accountant." (Matthew 6:24, Audit-Proof Version)

---

## Heat Meter Mechanics

- **Daily Increase:** Heat rises a little every day, and more if you earn a lot in a day.
- **Illegal Actions:** Buying illegal items increases heat significantly.
- **UI:** Always visible, styled as a thermometer. Tooltip: "The higher your heat, the closer you are to a federal raid."

---

## Endgame Stub

- At the moment, we can simply stub out the endgame. Once the player reaches full heat, they get a game over screen with:
- Days elapsed
- Total (mammon) acquired
- A list of all lucre items purchased
- Sterling's status (alive/dead? Does he like you?)
- The full endgame buildout will be handled in a later issue. For the moment, a simple screen with your score and a list of lucre is sufficient.

## Sample Variables

```ts
interface My {
  eternalLegacy: {
    isActive: boolean;
    heat: number;
    heatMeterMax: number;
    heatDailyIncrease: number;
    heatActionIncrease: Record<string, number>;
    voicemailPlayed: boolean;
    voicemailReplayAvailable: boolean;
    lucre: Array<{
      item: string;
      cost: number;
      mammon: number;
    }>;
  };
  // ...other properties...
}

interface GameSettings {
  eternalLegacy: {
    heat: {
      dailyIncrease: number;
      actionIncreases: Record<string, number>;
      max: number;
    };
    shop: {
      items: Array<{
        id: string;
        cost: number;
        mammon: number;
      }>;
      underTheTable: Array<{
        id: string;
        cost: number;
        effect: string;
      }>;
    };
  };
  // ...other properties...
}
```

---
