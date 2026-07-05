# Writing Sermon Topics — Style Guide

Guidance for authoring entries in [`_sermons.ts`](./_sermons.ts) (the `themes` array).
Written for humans and agents. Two things matter equally: **it must be funny**,
and **it must serve the gameplay blend**. A topic that nails only one is not done.

## The comedic bar

Every topic is **parody first**. Whimsy and absurdity are tools, not
requirements, and they often land hardest as a counterpoint to an otherwise
straight-faced sermon. **Crassness and brutality are a knob** you turn up or down
to taste, topic by topic, not a constant setting. The move that reliably works:
cast the **player (the preacher) as manipulative, selfish, or exploitative**,
using a real religious idea to license it (Buddhist non-attachment becomes
"surrender your possessions, ideally into this collection plate").

## Voice rules

- **You are a preacher addressing a congregation.** Exhort, proclaim, or tell a
  story. **Command the flock** ("Go forth and ruin a dinner party"), never
  narrate your own action in the moment ("Let me ruin this dinner party") — the
  preacher isn't at the party, they're preaching about it.
- **Know where it's preached.** Every sermon is delivered one of two ways:
  shouted on a street corner, or preached to a devoted flock inside a church.
  Some titles suit one setting better than the other, and that's fine, but the
  strongest ones work in both mouths.
- **The title must be as funny as the description**, and the two must **agree**.
  The common failure is a description funnier than a soft, generic title.
- **Build to the payoff.** Put the comedic turn at the _end_ of the title so the
  reader gets a beat of "where is this going… ohhh." ("Nothing Proves Your
  Genius Like Ruining a Dinner Party.")
- **Be specific and concrete.** Invent the detail: a named form (_Form 27-B_), a
  named dead relative (_Great-Grandma Mabel_), a _Chili's_ parking lot.
  Specifics are funnier than generalities.
- **Target religions obliquely.** A sermon literally about driving fast screams
  "2 Fast 2 Faithful" and players spot it instantly. Reach a religion through
  _subject and tags_, not by naming its whole deal. (A theme praising quitting
  and mediocrity repels the strength/speed crowd without ever mentioning cars.)
- **Avoid sermon clichés in titles** ("Blessed are the…", "In the beginning…")
  unless you're subverting them. Descriptions may use them sparingly.
- **Match the register, and don't self-censor suggestions.** The game runs
  crude, explicit, and offensive on purpose. When drafting _for Lemon's review_,
  pitch the spicy version. He reads every topic and dials anything back himself,
  so "too far" is his call to make, not yours to pre-empt. Timid suggestions
  waste the review.

## Writing mechanics

- Follow Lemon's general writing guide:
  `preferences/instructions/writing/writing.instructions.md`. Most relevant here:
  **no em-dashes (—) and no semicolons (;)** — both hard rules, use periods or
  commas — plus the list of AI "tells" to avoid.
- Keep each description to **one tight paragraph** (roughly 2–5 sentences).
- Use **single quotes** for any quotation inside a description (the field itself
  is a double-quoted string).

## Serving the blend (before and after writing)

Run the coverage report:

```
bun run megachurch:sermons
```

It prints tag usage and a **religion-coverage table** (how many themes each
religion likes / dislikes) and writes `coverage-report.txt` listing unused tags,
tags no sermon touches, and under-served religions. Use it to:

1. **Find gaps first** — target under-served religions and unused tags so the
   pool stays balanced. Every religion wants a spread of themes that appeal to
   it _and_ themes that repel it (a religion nothing offends is a gameplay dead
   end). Tags come from the `Tags` union and religions from `ReligionNames` in
   [`_types.ts`](./_types.ts) / [`_religions.ts`](./_religions.ts).
2. **Check yourself after** — re-run and confirm you didn't over-concentrate on
   already-rich faiths (Southern Baptist, the Sovereign Guild, the Alpha Male).

## Workflow

1. Run the report, find the gaps, draft toward them.
2. **Run every topic past Lemon and get an explicit yes before it ships.** Never
   commit or push a topic he hasn't approved. Titles especially get rewritten in
   review, so treat drafts as proposals, not finished work.
3. Append approved topics to `themes` with the next sequential id, then re-run
   the report to confirm the blend held.
4. One joke, one best phrasing: don't add alternate titles for a theme, it only
   dilutes the funniest version.
