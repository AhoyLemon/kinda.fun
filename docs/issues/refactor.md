Okay, at this point I need to do a refactor of this: The two major changes I want to address here are:

1. src\views\megachurch\Megachurch.vue is a big and unwieldy file. I want to break it up into smaller files that can be imported
2. The structure of src\views\megachurch is also kind of a mess. I want to clean that up as well.

## Proposed New Structure

```
- src\views\megachurch\ #main megachurch view
  - components\ # Individual components
    - Chat\
      - Chat.vue
      - Chat.pug
      - Chat.scss
    - Toasts\
      - DonationToast.vue
      - DonationToast.pug
      - DonationToast.scss
      - FollowerToast.vue
      - FollowerToast.pug
      - FollowerToast.scss
      - LemonToast.vue
      - LemonToast.pug
      - LemonToast.scss
      - MerchToast.vue
      - MerchToast.pug
      - MerchToast.scss
    - EternalLegacy\
      - EternalLegacyShop.vue
      - EternalLegacyShop.pug
      - EternalLegacyShop.scss
      - HeatMeter.vue
      - HeatMeter.pug
      - HeatMeter.scss
    - Sterling\
      - SterlingNote.vue
      - SterlingNote.pug
      - SterlingNote.scss
      - SterlingVoicemail.vue
      - SterlingVoicemail.pug
      - SterlingVoicemail.scss
    - WorshopZone\
      - WorshopZone.vue
      - WorshopZone.pug
      - WorshopZone.scss
      - WorshopZoneBanner.vue
      - WorshopZoneBanner.pug
      - WorshopZoneBanner.scss
  - pug\ #all partials that are used in src\views\megachurch\Megachurch.pug
    - _choose-place.pug
    - _choose-setup.pug
    (etc)
  - scss\ #all styles that are used in src\views\megachurch\Megachurch.scss
    - libraries\
      - _multiselect-custom.scss
    - _choose.scss
    - _defaults.scss
    (etc)
  - tests\ #all vitest tests for megachurch
    - simulators\
      - street-preaching-simulator.ts
    - street-preaching.test.js
  - ts\ #all typescript files that are used in src\views\megachurch\Megachurch.vue
    - _functions.ts # Vue functions
    - _computeds.ts # Vue computeds
    - _chatMessages.ts
    - _places.ts
    - _religions.ts
    (etc)
  - MegaChurch.pug # layout file that uses all the partials in src\views\megachurch\pug
  - MegaChurch.scss # Global style declarations, uses all the partials in src\views\megachurch\scss
  - MegaChurch.vue # Main vue file. This is the thing I'm trying to make a bit easier to read
  - Page.pug # Used to create \megachurch.html
```

## Implementation Notes

- I know this is a pretty big refactor, the most important thing about this is SIMPLICITY and CLEANLINESS.
- It is more important for the code to be easy for a human to read than to be super optimized.
- I'd PREFER for the functions to be declared in separate file(s) and then imported into Megachurch.vue, but only without a lot of extra workarounds. The goal is ease of edit.
- It is ABSOLUTELY CRUCIAL that this work not actually change how the code works. The end result should look and perform the same, just with it being easier to edit code.
- If you feel you cannot do this refactor without changing things, pleaase try a different method. If that doesn't work, stop what you're doing and recommend a different plan instead.
- It is RECOMMENDED that each particular component in src\views\megachurch\components will be self contained, with the pug in a pug file and the scss in a scss file
- It is NOT ACCEPTABLE for this refactor to change any files which aren't located in src\views\megachurch\
- But within src\views\megachurch\components you can add/delete/edit as you see fit.
