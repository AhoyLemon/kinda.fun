# MegaChurch Tycoon - Things to do

## Game Phases

- [x] Street Preaching Phase
  - Player can experiment with different sermons and see results
- [x] Spice Addiction
  - Player can experiment with taking no/some/a lot of spice and see how it affects results
- [x] Move Locations
  - Players can move to different locations in the van and see how demographics affect results
- [x] Church Founding
  - Player can found a church and transition from street preaching to church preaching
- [x] Church Management
  - Player can manage the church, including finances, member engagement, and expansion
  - Player is also incentivized to get rid of Sterling Silver
- [x] Lucre Acquisition
  - Players can acquire expensive crap, which is the ultimate goal of the game
- [ ] MegaChurch Franchising (MAYBE NOT YET)
  - Players can found multiple churches in different locations, creating a religious empire
  - NOTE: I may skip this step for v1.0 as it creates more complications, and lucre and shutdown are more important and interesting. Franchising can be added later as a post-1.0 update.
- [x] FBI Shutdown
  - The game cannot go on forever. At some point, your crimes (both fiscal and otherwise) will catch up to you, and will be raided by the FBI, IRS and/or the DOJ. At that point, what matters is how much lucre you have acquired, which is your final score.

## Build System Issues

### Prevent Vite from generating unnecessary index.js

- [ ] Vite auto-generates a large 886kB `dist/index.js` file that has no reason to exist. Figure out why this happens and prevent it.

## Future Feature Ideas

### Da Worshop Zone - Shopping Cart System

### Prosperity Gospel Scratch-Off Tickets (Satirical Merch)

- Add lottery/scratch-off tickets as a purchasable merch item in the shop
- Mechanic: tickets are always losers, or have rigged odds with only joke prizes
- Satirical commentary on prosperity gospel and "the house always wins"

Currently, each merch item has a fixed $15 shipping cost applied to every purchase, which encourages bulk buying but can feel clunky. A more sophisticated shopping cart system would provide better UX and more strategic gameplay.

**Requirements for Shopping Cart Implementation:**

1. **Cart State Management**
   - Add cart state to UI reactive object
   - Track items, quantities, and running totals
   - Persist cart state across sessions (localStorage)

2. **UI Components**
   - Replace individual "BUY X FOR $Y" buttons with "ADD TO CART" buttons
   - Add cart sidebar/modal showing current items and totals
   - Quantity adjustment controls (+ / - buttons, direct input)
   - Remove item functionality
   - Clear cart option

3. **Shipping Cost Logic**
   - Base shipping cost (e.g., $15 for any order)
   - Potential shipping tiers:
     - Orders under $X: $15 shipping
     - Orders $X-$Y: $10 shipping
     - Orders over $Y: Free shipping
   - Or flat rate regardless of quantity/value

4. **Checkout Flow**
   - Cart review screen with itemized costs
   - Shipping cost clearly displayed
   - Total cost calculation
   - Confirm purchase button
   - Success/failure feedback

5. **Technical Implementation**
   - New Vue components: CartSidebar, CartItem, CheckoutModal
   - Update WorshopZone to use cart instead of direct purchase
   - New functions: addToCart, removeFromCart, updateQuantity, checkout
   - Integration with existing money/inventory system

6. **Gameplay Benefits**
   - More strategic purchasing decisions
   - Better understanding of shipping economics
   - Ability to "window shop" before committing
   - More realistic e-commerce experience (fitting the satire)

**Estimated Complexity:** Medium-High (requires significant UI/UX changes and state management)
