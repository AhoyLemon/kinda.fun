# MegaChurch Tycoon - Things to do

## Game Phases

- [x] Street Preaching Phase
  - Player can experiment with different sermons and see results
- [x] Spice Addiction
  - Player can experiment with taking no/some/a lot of spice and see how it affects results
- [x] Move Locations
  - Players can move to different locations in the van and see how demographics affect results
- [ ] Church Founding
  - Player can found a church and transition from street preaching to church preaching
- [ ] Church Management
  - Player can manage the church, including finances, member engagement, and expansion
  - Player is also incentivized to get rid of Sterling Silver
- [ ] Lucre Acquisition
  - Players can acquire expensive crap, which is the ultimate goal of the game
- [ ] MegaChurch Franchising
  - Players can found multiple churches in different locations, creating a religious empire
- [ ] FBI Shutdown
  - The game cannot go on forever. At some point, your crimes (both fiscal and otherwise) will catch up to you, and will be raided by the FBI, IRS and/or the DOJ. At that point, what matters is how much lucre you have acquired, which is your final score.

## Random Bits & Bobs

### Penalize repeating sermon topics

- [ ] Penalize a player for using the same sermon topic multiple days in a row.
  - Currently the game warns you when you repeat a topic, but no actual penalty is applied.
  - [ ] Add a subroutine to both `createStreetPreachingEffect` and `createChurchPreachingEffect` that checks if the topic was used yestereday. If it was, give a diminished effect.
  - [ ] Let the player know about this diminished effect by a toast like...
    - "{religion.followers} are bored of hearing about {tag} again"
    - "{religion.followers} can't believe you're talking about {topic.name} again"
    - "People seem tired of hearing about {tag}."
    - "Your {topic.name} sermon feels stale."
    - "People are noticing you're repeating yourself."
