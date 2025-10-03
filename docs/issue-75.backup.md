# Proposal for Resolving Issue #75: Founding a Church

## Overview
This document outlines the requirements and potential implementation details for resolving [Issue #75](https://github.com/AhoyLemon/kinda.fun/issues/75). The feature involves allowing players to found a church after acquiring a van and moving to a new location. This document explores the mechanics, interface design, and gameplay implications of this feature.

---

## Requirements

### 1. Prerequisites
- **Van Ownership**: The player must own a van.
- **Relocation**: The player must have moved to a new location using the van.

### 2. Access to Church Founding Interface
- **Trigger**: After meeting the prerequisites, the player gains access to a new interface for founding a church.
- **Interface Design**:
  - **Option 1**: A popup or modal appears after relocation, offering the opportunity to buy a building.
  - **Option 2**: A new menu option becomes available in the UI, labeled "Found a Church."
  - **Option 3**: The opportunity is presented as a quest or mission, with a narrative-driven introduction.

### 3. Building Purchase
- **Cost**: Buying a building requires a significant upfront cost.
- **Daily Upkeep**: The building may require daily upkeep costs, such as rent, utilities, or maintenance.
- **Building Types**:
  - Small, affordable buildings with limited capacity.
  - Larger, more expensive buildings with higher capacity and prestige.

### 4. Declaring a Religion
- **Requirement**: The player must declare a religion to found a church.
- **Mechanics**:
  - Choose from existing religions in the game.
  - Option to create a custom religion with unique traits.
- **Impact**: The declared religion influences gameplay, including demographics and upgrades.

### 5. Church Upgrades
- **Initial Upgrade Ideas**:
  - **Seating Capacity**: Increase the number of attendees.
  - **Audio-Visual Equipment**: Enhance sermon quality and appeal.
  - **Community Outreach**: Attract more followers from the local population.
  - **Decorations**: Improve the aesthetic appeal of the church.
  - **Staff Hiring**: Recruit assistants to manage church operations.

### 6. Transition from Street Preaching to Church Preaching
- **Gameplay Shift**:
  - Street preaching is replaced by church preaching once a church is founded.
  - Church preaching focuses on attracting routine attendees rather than random crowds.
- **Demographics**:
  - The declared religion and past sermons influence the demographics of attendees.
  - Favorable preaching about certain religions attracts their followers.
  - Religions that dislike the player are less likely to attend.

---

## Theoretical Gameplay Flow

1. **Prerequisite Check**:
   - Player acquires a van and relocates to a new location.
2. **Church Founding Opportunity**:
   - The player is presented with the option to buy a building.
3. **Building Purchase**:
   - The player selects a building and pays the upfront cost.
4. **Religion Declaration**:
   - The player declares a religion or creates a custom one.
5. **Church Operations**:
   - The player begins preaching in the church, attracting routine attendees.
6. **Upgrades**:
   - The player invests in upgrades to improve the church and attract more followers.

---

## Implementation Plan

### Core Features

1. **Triggering Sterling's Offer:**
   - At the end of the day, after the player relocates to a new location with the van, they find a note on their van.
   - The note introduces Sterling Silver as a disgraced former televangelist currently in prison for tax fraud. It hints at an "opportunity" without revealing specifics.

2. **Texting Sterling:**
   - The player can text Sterling using the existing texting system.
   - Sterling responds with a mix of pious language and self-interest, pitching the idea of founding a church together.

3. **Choosing a Location:**
   - The player selects a location for the church from a list of available properties.
   - Sterling claims he will handle the "legalities" but is actually making an under-the-table cash deal.

4. **Founding the Church:**
   - Once the church is founded, the player transitions from street preaching to church preaching.
   - Sterling takes a daily cut of the player’s donations, with a minimum amount enforced.

### Required Variables

- **`my.hasChurch`**: Boolean to track if the player has founded a church.
- **`my.churchLocation`**: Stores the location of the player’s church.
- **`gameSettings.church.dailyCutPercentage`**: Percentage of daily donations Sterling takes.
- **`gameSettings.church.minimumDailyCut`**: Minimum amount Sterling takes per day.

### UI Changes

1. **Note on the Van:**
   - Add a UI element to display the note at the end of the day.
   - Include an option to text Sterling directly from the note.

2. **Texting Interface:**
   - Reuse the existing texting system for conversations with Sterling.
   - Add Sterling’s avatar and unique dialogue.

3. **Church Preaching Interface:**
   - Replace the street preaching interface with a new church preaching interface once the church is founded.
   - Display daily donation totals and Sterling’s cut.

### Gameplay Mechanics

1. **Daily Cut:**
   - Deduct Sterling’s cut (percentage or minimum) from the player’s daily donations.
   - If the player doesn’t meet the minimum, Sterling sends angry texts.

2. **Church Preaching:**
   - Focus on attracting routine attendees rather than random crowds.
   - Demographics are influenced by the player’s declared religion and past sermons.

### Implementation Steps

1. **Create Variables:**
   - Add `my.hasChurch`, `my.churchLocation`, `gameSettings.church.dailyCutPercentage`, and `gameSettings.church.minimumDailyCut`.

2. **Design Note UI:**
   - Implement the note UI to trigger Sterling’s offer.

3. **Extend Texting System:**
   - Add Sterling as a contact with unique dialogue and responses.

4. **Build Church Preaching Interface:**
   - Replace the street preaching interface with a church preaching interface.

5. **Implement Daily Cut Logic:**
   - Deduct Sterling’s cut from daily donations and handle minimum enforcement.

6. **Test and Refine:**
   - Playtest the feature to ensure balance and engagement.

### Open Questions

1. **Daily Cut Percentage:**
   - What is a fair percentage for Sterling’s cut? Should it scale with the player’s income?

2. **Minimum Daily Cut:**
   - What should the minimum amount be? How punitive should Sterling’s texts be if the player doesn’t meet it?

3. **Church Preaching Mechanics:**
   - How should the demographics of attendees be determined? Should there be a way to influence them actively?

4. **Long-Term Relationship with Sterling:**
   - Will the player have the option to buy Sterling out or confront him later in the game?

5. **Future Expansion:**
   - How will founding a church tie into future gameplay mechanics, such as upgrades or rivalries?

This plan provides a clear roadmap for implementing Sterling Silver’s offer and the transition to church preaching. Feedback and collaboration are welcome to refine these ideas further.

---

## Open Questions
- **Narrative Integration**: How should the opportunity to found a church be introduced narratively?
- **Custom Religions**: What level of customization should be allowed for player-created religions?
- **Balance**: How should the costs and benefits of founding a church be balanced to ensure engaging gameplay?
- **Demographics**: What specific mechanics will determine the demographics of church attendees?

---

## Next Steps
1. Finalize the design of the church founding interface.
2. Define the cost structure for building purchase and upkeep.
3. Develop the mechanics for declaring a religion and its gameplay impact.
4. Design and implement the church preaching system.
5. Playtest the feature to ensure balance and engagement.

---

This document serves as a starting point for resolving Issue #75. Feedback and collaboration are welcome to refine these ideas further.
