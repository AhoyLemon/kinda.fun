# Supreme Court: The Card Game

Convince nine justices to agree with you using logic, emotional manipulation, flattery, bribery, and occasional chaos. So, basically the real Supreme Court. Except for the part where they actually change their minds.

You are a lawyer arguing a case. Each justice has a **leaning** from −100 (Strongly Against you) to +100 (Strongly For you). When the trial ends, you want more **For** votes than **Against**.

---

## The Numbers That Matter

| Thing                    | Value                              |
| ------------------------ | ---------------------------------- |
| Justices on the bench    | **9** (can change in Campaign)     |
| Rounds per trial         | **5**                              |
| Cards you play per round | **1** (opponent also plays 1)      |
| Playbook size            | **5** shared cards                 |
| Leaning range            | **−100 → +100**                    |
| Single-target card power | base × **8**                       |
| All-bench card power     | base × **4** per justice           |
| Your tactics hit         | **20% harder** than the opponent's |

**Vote thresholds** (where a justice's leaning lands them):

| Leaning Range | Vote Category               |
| ------------- | --------------------------- |
| +60 or higher | Strongly For                |
| +10 to +59    | Leaning For                 |
| −9 to +9      | **Undecided** (may abstain) |
| −10 to −59    | Leaning Against             |
| −60 or lower  | Strongly Against            |

A justice within **±10** is essentially undecided and can abstain. In a tight trial, **dragging an enemy to neutral is as good as winning their vote** — they stop counting against you.

---

## How a Trial Works

1. You play one tactic from the shared Playbook.
2. The opponent plays one.
3. Leanings shift.
4. Repeat for **5 rounds**, then everyone votes.

Most For votes wins. Ties are possible and they count as ties — don't leave a justice sitting at exactly neutral if you can help it.

---

## Reading a Justice

Tap any justice to see their **stats** and **weaknesses** (each 1–10). Tactics scale off these, so the bench overview bar (best stat, worst stat, biggest exploit) is your targeting cheat sheet.

**Stats**

- **Logic** — receptive to citations and reasoned argument.
- **Charisma** — resists crowd-pleasing stunts; high-charisma justices also _spread_ their swing to allies (see Knock-on).
- **Empathy** — moved by emotional appeals.
- **Susceptibility** — how easily they believe / get rattled. High susceptibility = a mark.
- **Party Loyalty** — how partisan they vote, and how hard partisan plays land.

**Weaknesses** — `flattery`, `bribery`, `blackmail`, `threats`. A weakness-based attack scales **× (weakness ÷ 5)**: a justice with bribery **10** takes _double_ a justice with bribery **5**, while a justice at **2** barely budges (and may resent the attempt).

**Logic vs. Empathy is a spectrum.** "Head" tactics (Cite Precedents) reward justices whose logic beats their empathy; "heart" tactics (Emotional Appeal) reward the reverse. Aiming a heart tactic at a head justice is mostly wasted.

---

## The Playbook (and Denial)

You and your opponent draw from the **same** five face-up cards. Playing a card removes it for the turn, so a card you take is a card they can't.

> Sometimes the strongest play isn't "biggest swing." It's "I refuse to let you have that." If the opponent is one Cite Precedents away from a comeback, take it — or claim it with **I Call Dibs**.

---

## The Chief Justice

The Chief (⚖ badge) is the most valuable single target:

- **Harder to sway** — incoming swings are roughly **halved** in both directions.
- **Influential** — sway the Chief with a single-target card and same-party justices follow at **~50%** of that swing.

Flipping the Chief is slow but contagious. **Elevate to Chief** can also move the crown onto someone you want amplified (and it strips their resistance).

---

## Knock-on Effects

- **Chief knock-on:** single-target sway on the Chief ripples to same-party justices at ~50%.
- **Charisma knock-on:** sway a high-charisma justice (7+) and they may pull a same-party peer along (**7 → 25%**, **8 → 50%**, **9 → 75%**, **10 → 100%** chance, at ~30% of the swing).

Translation: a charismatic, same-party cluster is a force multiplier. Hit the influencer, not the loner.

---

## Tactics Worth Knowing

**Bread and butter**

- **Cite Precedents / Emotional Appeal** — broad sways that reward logical / empathetic benches respectively.
- **Bribe / Leak to the Press / Threaten / Shameless Flattery** — single-target weakness exploits. Check the 🎯 Exploit chip first.

**Tempo & timing**

- **Whisper Campaign** — a small shift toward you _every remaining round_. Worth the most on **Round 1** (it fires all 5 rounds), nearly worthless on Round 5.
- **Encourage a Nap** — a justice skips the next round and wakes **+15** friendlier. Great for parking a swing vote you already own.
- **Mess With The Calendar** — both sides skip a round. A closing move when you're **ahead** and want fewer swings to happen.

**Control & swing**

- **Recuse Yourself!** — resets a target to neutral and makes them sticky. Best used on an enemy who's Strongly Against.
- **Swap Clerks** — exchange two justices' leanings. Turn your worst enemy and best friend into… the opposite.
- **Reframe The Debate** — pick a topic; every justice with a known stance on it lurches **±45**. Swingy, read the bench first.
- **Betray Your Friend** — sacrifice a Strongly-For justice (they flip hard against) to rally opposing-party enemies toward you. A comeback gamble, not a lead-protector.

**Chaos / wildcards**

- **Go To The Lectern Without Notes** — flips the whole Playbook face-down, redraws, reshuffles, and you commit to a card **blind**. Whatever you play resolves at **1.6× power**. High risk, high reward — you can't see what you're playing until it lands, and you can't back out.
- **I Call Dibs** — claim 2 cards for your exclusive use (denial + stash).
- **Purge the Record** — burn all 5 Playbook cards and draw fresh. Use when the board is bad for you and good for them.

---

## A Round-by-Round Plan

- **Rounds 1–2 — Map the bench.** Identify the flippable middle (Undecided/Leaning) and start long-game plays like Whisper Campaign. Don't waste big swings on justices who are already locked.
- **Rounds 3–4 — Commit.** Lock in your best allies, exploit the biggest weakness on the bench, and work the Chief if it's contagious.
- **Round 5 — Count, don't style.** Play for raw vote count. Nudging two enemies to neutral often beats one flashy flip. Protect a lead with denial (Dibs) or a round-skip (Calendar).

**Three habits that win games**

1. **Flip one vote at a time** when it's the deciding one — a single clean flip beats a wide, shallow spread.
2. **Protect your lead late.** When ahead, deny and stall instead of swinging for highlights.
3. **Save chaos for when you're behind.** Lectern Without Notes, Betray, and Reframe are comeback tools, not victory laps.

---

## Campaign Mode

Quick Play is a single trial. **Campaign** strings **5 cases** together with persistent consequences:

- **Objectives** — a win condition for the whole run (e.g. win them all, force 5–4 splits). Chosen at the start.
- **Recess** between cases — collect **reward cards**, and justices may **retire or die** (≈50% chance per recess, **1–3** at a time), opening seats you nominate to fill.
- **Elections** — the sitting president can lose (≈50% in a contested election, capped at **2 terms**), changing who future nominees favor.
- **Campaign-only tactics** — e.g. **Suggest Retirement** (tank a justice now, guarantee their seat opens at recess).

Campaigns reward thinking past the current trial: a justice you can't win today might retire tomorrow.

---

_For engine internals (effect resolution, stat scaling, the composables behind `Court.vue`), see the [Developer Guide](DEVELOPER_GUIDE.md)._
