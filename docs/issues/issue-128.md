# Vite => Nuxt

Let's convert this project from straight Vite to Nuxt, meaning we'll add Nuxt Routing and composables and components. This will be a bit of a rewrite, but it should be worth it in the end. We'll start by creating a new Nuxt project and then we'll move our existing code over to it.

## Reference

- An excellent of a "good" Nuxt build (in my opinion) is my [booz](https://github.com/ahoyLemon/booz) app. This was spun up from scratch, not built on top of an existing Vite project, but it should give us a good reference for how to structure our Nuxt app.
- Please referece [booz](https://github.com/ahoyLemon/booz) for guidance
- Please also reference the [Nuxt (documentation](https://nuxt.com/docs) for guidance on how to use Nuxt features.
- You're welcome to any other Nuxt "best practices" or starterkits that have been WELL VETTED (ex: 5,000+ stars on GitHub, etc) that you think would be a good fit for this project.
- I DO like the Nuxt folder structure, which I know is a big difference from the kinda.fun structure as it is.

## Opinions?

- If you have any disagreements with the way I want this refactor done, you are welcome to share your opinions. But I do want to convert this to Nuxt one way or another.

## Failed Attempts

I actually tried to do this more than once, usually with Copilot at the wheel, and it didn't really work out. See:

1. https://github.com/AhoyLemon/kinda.fun/pull/129
2. https://github.com/AhoyLemon/kinda.fun/pull/131

I think we got close, but each PR ended up having enough problems that we had to start over and try again.

Please do your best to learn from the mistakes of those other PRs.

## Acceptance Criteria

- [ ] Each game (ex: kinda.fun/cameo, kinda.fun/megachurch, kinda.fun/pretend, etc) is rendered server side.
- [ ] Each game will have its own unique meta, this includes og:image, og:description, etc
- [ ] The home page will be rendered server side when you visit the root page, and contains different meta
- [ ] Each game has its own styling and client-side javascript
- [ ] Some components (ex: Vue Toastification, Vue Tippy) can be imported into games, allowing for common looks and settings, but can be customized per game as well.
- [ ] kinda.fun gets deployed to Firebase, via @.github/workflows/firebase-deploy.yml It must still be deployable
- [ ] Vitests works without issue
- [ ] No TypeScript errors
- [ ] Game Properties can be adjusted via Nuxt DevTools
- [ ] A new human-readable file is created at @docs/VITE-2-NUXT.md which gives an overview of what's done in this PR.
- [ ] Make sure JS/CSS payloads are reasonable, and scoped to the game the user is playing.

## Bonus Criteria

(not a dealbreaker, but all "nice to have", since we're making such major changes)

- [ ] Convert JS to TS where possible.
- [ ] Remove jQuery from the project.
- [ ] Vitests are created for new structure created in this PR.
- [ ] Update both [issue 128](https://github.com/AhoyLemon/kinda.fun/issues/128) and any corresponding PRs with status updates, learnings, etc.
- [ ] Reuse functions/computeds/composables across games where possible, but also feel free to create new ones if it makes more sense for the Nuxt structure.
- [ ] @docs/FOLDERS.md explains the file/folder structure and where to find things (encourage brevity with this one)
- [ ] Vet dependencies and adjust @.github/dependabot.yml . IMHO, I have found Dependabot to be VERY annoying with creating PR updates for minor version bumps, which creates "babysitting" work I do not enjoy. Quiet down the dependency updates, only suggesting a new PR if there is a real security problem worth addressing.
  - [ ] However, if you MUST create a PR for a security update, you MAY include other version bumps inside that same PR.

## Steps After This

- [ ] Create a DESIGN.md file, with sections for each game.
- [ ] Launch Supreme Court: The Card Game (depending on when this branch goes launch, SC:TCG may or may not be in a "stealth launch")
