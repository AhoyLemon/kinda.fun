# MegaChurch

## Game Overview

MegaChurch is a satirical religious empire-building game where players start as street preachers and work their way up to building massive religious organizations. The game combines strategic sermon planning, audience psychology, resource management (including spice addiction mechanics), and gradual progression from street corners to megachurches.

## Core Systems

### Street Preaching System

Players begin as street preachers, testing their sermon topics on diverse urban audiences before they can afford churches or other venues.

**Key Features:**

- **Audience Simulation**: Each location has different religious demographics that react to sermon content
- **Mixed Messages**: When sermon topics contain contradictory elements that both appeal and repel the same religion group
- **Spice Effects**: Performance-enhancing substances that affect preaching effectiveness (with addiction consequences)
- **Donation Mechanics**: Audience engagement directly affects financial rewards
- **Progression Path**: Success in street preaching enables purchasing vans, churches, and other upgrades

### Configuration & Tuning

Most game balance settings are centralized in `src/views/megachurch/ts/_variables.ts`:

#### `gameSettings.streetPreaching`

- **Audience behavior**: Engagement rates, like/dislike thresholds and percentages
- **Donation ranges**: Min/max donation amounts per engaged audience member
- **Scaling factors**: Population-to-audience conversion rates

#### `gameSettings.donationCalculation`

- **Score multipliers**: How religious approval affects donation amounts
- **Net worth effects**: Location wealth impact on donations
- **Preacher strength bonuses**: Performance multiplier effects

#### `gameSettings.sermonScoring`

- **Tag multipliers**: Point values for sermon topic alignment with religions
- **Religion matching**: Bonus effects when preacher's religion aligns with topics
- **Enthusiasm calculations**: How audience engagement affects overall response

#### `ui.timing`

- **Toast display timing**: Delay ranges for audience reaction notifications
- **UI transition timing**: View switching and animation delays

## Terminology

- **Sermon**: The full program for a service—the collection of things you'll talk about in a day.
- **Topic**: An individual section or point within a Sermon.
- **Theme**: The selectable subject or idea assigned to a Topic (previously called "sermon" in code).

Other terms:

- **Preacher/Pastor**: The person delivering the Sermon.
- **Congregation**: The audience attending the Sermon.
- **Religion**: The belief system chosen by the player, affecting available Themes and gameplay.

Example:
Sermon (whole event)

- Topic 1: Theme A
- Topic 2: Theme B
- Topic 3: Theme C

Players build a Sermon by selecting Themes for each Topic. Religion and audience affect available choices and reactions.

## Developer Guide

### Key Files & Architecture

**Core Game Logic:**

- `src/views/megachurch/Megachurch.vue` - Main game component with all systems
- `src/views/megachurch/ts/_variables.ts` - Centralized configuration and state management
- `src/views/megachurch/ts/_types.ts` - TypeScript interfaces and type definitions

**Content Data:**

- `src/views/megachurch/ts/_religions.ts` - Religion definitions with likes/dislikes
- `src/views/megachurch/ts/_places.ts` - Location data with demographics
- `src/views/megachurch/ts/_sermons.ts` - Available sermon themes and tags

**UI Components:**

- `src/views/megachurch/vue/ListenerToast.vue` - Audience reaction notifications
- `src/views/megachurch/vue/DonationToast.vue` - Financial feedback display
- `src/views/megachurch/vue/FollowerToast.vue` - Follower change notifications

### Adding New Features

**New Sermon Topics:**

1. Add themes to `_sermons.ts` with appropriate tags
2. Update religion preferences in `_religions.ts` if needed
3. Test with different religious demographics

**Balance Adjustments:**

1. Modify values in `gameSettings` object in `_variables.ts`
2. Avoid hardcoding numbers in component logic
3. Use descriptive configuration property names

**New Locations:**

1. Add location data to `_places.ts` with population and religious breakdown
2. Consider economic factors (avgNetWorth) for donation calculations
3. Test audience simulation with new demographics

### Testing Guidelines

**Development Testing:**

- Use debug mode (toggle in-game) to inspect audience calculations
- Test edge cases: very high/low religious scores, extreme spice usage
- Verify mixed message detection with contradictory sermon topics

**Build Validation:**

- Run `npm run build` to catch TypeScript errors
- Test in both development (`npm run dev:client`) and production builds
- Verify no console errors in browser during gameplay

### Next Development Phase

Planned features for upcoming development:

1. **Enhanced Spice UI** - Better interface for spice purchasing and addiction management
2. **Van System** - Transportation mechanics for traveling between locations
3. **Religion Declaration** - Formal religion selection and customization
4. **Church Foundation** - Transition from street preaching to permanent venues
5. **Recovery Mechanics** - Options for overcoming spice addiction
