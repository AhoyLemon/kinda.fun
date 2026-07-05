# Writing Sermon Topics — Style Guide

Guidance for authoring entries in [`_sermons.ts`](./_sermons.ts) (the `themes` array).
Written for humans and agents. Two things matter equally: **it must be funny**,
and **it must serve the gameplay blend**. A topic that nails only one of those
is not done.

## The comedic bar

Every topic must land as **satirical, whimsical, occasionally brutal, and
sometimes absurdist**. If it's merely stating a religion's real belief, it's not
there yet. The best entries take a genuine tenet and twist it so the *player* is
licensed to be selfish, lazy, or destructive (e.g. Buddhist non-attachment
becomes "surrender your possessions, ideally into this collection plate").

## Voice rules

- **You are a preacher addressing a congregation** (street corner or pulpit).
  Exhort, proclaim, or tell a story. **Command the flock** ("Go forth and ruin a
  dinner party"), never narrate your own action in the moment ("Let me ruin this
  dinner party") — the preacher isn't at the party, they're preaching about it.
- **The title must be as funny as the description**, and the two must **agree**.
  A common failure is a description that's funnier than a soft, generic title.
- **Build to the payoff.** Put the comedic turn at the *end* of the title so the
  reader gets a beat of "where is this going… ohhh." ("Nothing Proves Your
  Genius Like Ruining a Dinner Party.")
- **Be specific and concrete.** Invent the detail: a named form (*Form 27-B*), a
  named dead relative (*Great-Grandma Mabel*), a *Chili's* parking lot. Specifics
  are funnier than generalities.
- **Target religions obliquely.** A sermon literally about driving fast screams
  "2 Fast 2 Faithful" and players spot it instantly. Reach a religion through
  *subject and tags*, not by naming its whole deal. (A theme praising quitting
  and mediocrity repels the strength/speed crowd without ever mentioning cars.)
- **Avoid sermon clichés in titles** ("Blessed are the…", "In the beginning…")
  unless you're subverting them. Descriptions may use them sparingly.
- **Match the register — don't clutch pearls.** The game already runs crude and
  explicit (sex, drugs, violence). Spicy is on-brand when it's funny.

## Writing mechanics

- **No em-dashes** (`—`). Use commas, periods, or colons. This is a hard
  preference; keep it out of both titles and descriptions.
- Descriptions are one tight paragraph (roughly 2–5 sentences).
- Use single quotes for quotations inside a description (the field is a
  double-quoted string).

## The data shape

```ts
{
  id: 121,                    // next sequential id
  title: "...",
  desc: "...",
  likedBy:    { tags: [...], religions: [...] },  // who this appeals to
  dislikedBy: { tags: [...], religions: [...] },  // who it repels
}
```

- **Tags** must come from the `Tags` union in [`_types.ts`](./_types.ts).
  **Religions** must come from `ReligionNames` there / [`_religions.ts`](./_religions.ts).
- `likedBy` and `dislikedBy` each carry an independent tag list and religion
  list. Typical shape: ~5–6 liked tags / ~3–4 disliked tags, and 1–3 religions
  per side. A religion in a list reacts to the theme regardless of the tags.
- Effects are derived at runtime from tag/religion overlap — there are no
  per-theme effect numbers to set.

## Serving the blend (do this before and after writing)

Run the coverage report:

```
bun run megachurch:sermons
```

It prints tag usage and a **religion-coverage table** (how many themes each
religion likes / dislikes), and writes `coverage-report.txt` listing unused
tags, tags no sermon touches, and under-served religions. Use it to:

1. **Find gaps first** — target under-served religions and unused tags so the
   pool stays balanced. Every religion should have a healthy spread of themes
   that appeal to it *and* themes that repel it (a religion nothing offends is a
   gameplay dead end).
2. **Check yourself after** — re-run and confirm you didn't over-concentrate on
   already-rich faiths (Southern Baptist, the Sovereign Guild, the Alpha Male,
   etc. tend to be well-covered already).

## Workflow

Draft → run the report to confirm the blend → get the topics approved (they must
clear the comedic bar) → append to `themes` with the next sequential id →
re-run the report. One joke, one best phrasing: resist adding alternate titles
for the same theme; it dilutes the funniest version.
