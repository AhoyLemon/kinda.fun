# Issue 76: Church Management and Da Worshop Zone

## Goal of this document

- Describe what is required to add church management and Da Worshop Zone to MegaChurch Tycoon.
- Fulfilling the requirements of this doc will close https://github.com/AhoyLemon/kinda.fun/issues/76

- This is the 5th phase of the game. Please see docs\megachurch\TODO.md for the phases

## Church Building Layout

For the purposes of church management and merch sales, the church consists of the following rooms:

- **Auditorium**: The main worship space with pews and lectern (where sermons are delivered and attendees gather).
- **Office**: Used for church administration and paperwork.
- **Hallway**: The only place where all merch is sold—tables, vending machines, and impulse buys are set up here so every attendee passes by them before and after services.
- **Bathrooms**: For attendee convenience.

**Note:** All merch revenue is generated from sales in the hallway, maximizing exposure and fitting the commercialized, tacky megachurch vibe.

## Gameplay Goals

After founding your church and meeting Sterling, the next phase is managing and upgrading your church. This is done through Da Worshop Zone, a tacky, insecure, early-2000s-style web portal where you buy upgrades, merch, and marketing for your church.

- The player can access Da Worshop Zone after seeing a banner ad (X days after founding the church).
- The site is always available from the end-of-day UI, simulating an old desktop browser (IE6, 800px wide, broken images, etc.).
- Upgrades and merch purchased here affect church attendance, donations, and congregation satisfaction.
- Merch is a separate revenue stream, with each attendee having an X% chance to buy merch each day.
- Marketing options are one-time purchases that boost attendance for a day.
- No ongoing staff system in this phase; only one-time actions (e.g., pay a sign spinner).

## Major Requirements

- [ ] Show a banner ad for Da Worshop Zone X days after church founding, styled as a pop-up/banner from the early 2000s.
- [ ] After seeing the ad, allow the player to access Da Worshop Zone from the end-of-day UI at any time.
- [ ] Simulate the Da Worshop Zone UI as an insecure, retro website (IE6, 800px wide, broken images, fake warnings, etc.).
- [ ] Implement the following categories and items in Da Worshop Zone:
  - **MERCH**: Bottles of Holy Water, Holy Water Vending Machine, Bluetooth Prayer Candles, Saints Flow Energy Drink
  - **CHURCH UPGRADES**: Branded Communion Snacks, Extra Pews, VIP Confession Booths, Audio/Visual Equipment
  - **MARKETING**: Television Ads, Radio Ads, Internet Ads, Sign Spinner
- [ ] Implement merch revenue logic: for each attendee, roll for each available merch item; if successful, add the item's revenue to the day's total. Upgrades (like vending machines) increase the chance or value.
- [ ] Integrate upgrade and marketing effects into daily attendance, donation, and satisfaction calculations.

## Da Worshop Zone Mechanics

### MERCH (Separate Revenue Stream)

- **Bottles of Holy Water**: Sold in the gift shop and vending machines. Each attendee has an X% chance to buy per day. Generates passive income.
- **Holy Water Vending Machine**: Installs in the lobby; increases holy water sales and revenue.
- **Bluetooth Prayer Candles**: Sold as “smart” candles; boosts member engagement and small recurring income.
- **Saints Flow Energy Drink**: (Church-branded energy drink, a subtle nod to the Saints Row video games) Sold in the café; increases youth attendance and revenue.

**Mechanic:**

> At the end of each day, for each attendee, roll for each available merch item. If successful, add the item's revenue to the day's total. Upgrades (like vending machines) increase the chance or value.

### CHURCH UPGRADES

- **Branded Communion Snacks**: Sugary, possibly questionable “communion” products; increases attendee satisfaction and chance of positive sermon reactions.
- **Extra Pews**: Increases maximum church capacity.
- **VIP Confession Booths**: Allows attendees to pay for “express” forgiveness; generates extra income.
- **Audio/Visual Equipment**: Upgrades sound and visuals; increases chance of attendees liking your sermon.

### MARKETING (One-Time Internet Ads)

- **General Internet Ad Campaign**: Run a broad online ad campaign to boost overall attendance for the next sermon. (One-time boost to total attendees.)
- **Targeted Internet Ad Campaign**: Run a targeted online ad campaign to increase the likelihood of a specific religion being represented in your next audience. (One-time boost to chosen religion's attendance share.)
- **Sign Spinner**: Pay someone to spin a sign outside; small, funny boost to attendance (one-time boost).

## Acceptance Criteria

- [ ] As a player, I see a banner ad for Da Worshop Zone after X days of church operation
- [ ] After seeing the ad, I can access Da Worshop Zone from the end-of-day UI
- [ ] Using Da Workshop Zone, I can purchase merch, upgrades, and marketing for my church.
- [ ] Any merch I buy will have the chance of generating additional revenue
- [ ] If my church sells any merch, I will see that indicating in both a mid-preaching toast as well as the end of day screen.
- [ ] If I purchase marketing for the day, it will improve my church attendance in the manner described.
- [ ] If I purchase an upgrade, it will affect my church in the manner described.

## Implementation Notes

- It is OKAY to add variables, functions, and computeds that aren't strictly documented here, if they are needed to implement the documented features.
- It is ENCOURAGED to keep all upgrade/merch/marketing data in a central config for easy balancing.
- It is DISCOURAGED to add hardcoded numbers for logic; use gameSettings or my variables for all tunable values.
- It is APPRECIATED if you write any tests while working on your implementation. If you do, please use vitest, and make the tests simple.
- It is UNDERSTOOD that you may need to modify preaching logic to account for upgrades; please document any such changes in docs\megachurch\preaching.md
- It is UNDERSTOOD that you may need to modify toast logic to account for upgrades; please document any such changes in docs\megachurch\toasts.md

## Sample Variables

For reference, this is how I'd like the variables structured, but you can modify as you see fit.

```ts
interface My: {
  // ...existing properties...
  church: {
    isFounded: boolean,
    location: Place,
    name: string,
    religion: Religion,
    buzz: number,
    maxCapacity: number,
    upgrades: {
      extraPews: number, // level or boolean
      vipConfessionBooths: boolean,
      audioVisual: boolean,
      sacrament: {
        wine: {
          level: number, // 0 = none, 1 = cheap, 2 = mid, 3 = top-shelf
          name: string, // e.g. "Kirkland Merlot"
        },
        bread: {
          level: number, // 0 = none, 1 = cheap, 2 = mid, 3 = top-shelf
          name: string, // e.g. "Wonder Bread"
        },
      },
    },
    merch: {
      holyWater: {
        isUnlocked: boolean,
        price: number, // selling price
        inventory: number, // how many bottles you have
        isVendingMachine: boolean, // whether you have a vending machine
        soldToday: number, // how many sold today
        totalSold: number, // how many sold total
      }
      energyDrinks: {
        isUnlocked: boolean,
        price: number, // selling price
        inventory: number, // how many cans you have
        soldToday: number, // how many sold today
        totalSold: number, // how many sold total
      }
      prayerCandles: {
        isUnlocked: boolean,
        price: number, // selling price
        inventory: number, // how many candles you have
        soldToday: number, // how many sold today
        totalSold: number, // how many sold total
      }
    },
  },
  marketing: {
    generalAdActive: boolean,
    targetedAd: {
      active: boolean,
      targetReligion: Religion | null,
    },
    signSpinnerActive: boolean,
  },
  // ...other properties...
}
```

```ts
interface GameSettings: {
  // ...existing properties...
  church: {
    merch: {
      holyWaterBottles: {
        cost: number, // cost to the player (per item)
        baseChance: number, // base % chance per attendee to buy
      },
      holyWaterVendingMachine: {
        cost: number,
        bonusChance: number, // additional % chance
      },
      bluetoothPrayerCandles: {
        cost: number, // cost to the player (per item)
        baseChance: number, // base % chance per attendee to buy
      },
      saintsFlow: {
        cost: number, // cost to the player (per item)
        baseChance: number, // base % chance per attendee to buy
      },
    },
    upgrades: {
      extraPews: {
        cost: number, // costPerPew
        capacityIncrease: number, // how many more people per pew
      },
      vipConfessionBooths: {
        cost: number,
        revenuePerUse: number,
      },
      sacrements: {
        wine: {
          levels: Array<{ level: number, name: string, cost: number, likeBoost: number }>,
        },
        bread: {
          levels: Array<{ level: number, name: string, cost: number, likeBoost: number }>,
        },
      }
    },
    marketing: {
      generalAd: {
        price: number,
        attendanceBoost: number,
        duration: number, // days
      },
      targetedAd: {
        price: number,
        targetReligionBoost: number,
        duration: number,
      },
      signSpinner: {
        price: number,
        attendanceBoost: number,
        duration: number,
      },
    },
  }



}
```
