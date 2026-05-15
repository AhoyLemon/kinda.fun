# Issue #193 — Court Campaign Stats Tracking

**Status:** Design & Planning
**Scope:** Add comprehensive Court stats persistence in Firestore for quickplay and campaign

---

## FIREBASE STRUCTURE

This is all rooted at `/stats/court`.

### `/stats/court`

```ts
{
  gamesStarted: number;
  gamesFinished: number;

  quickplaysStarted: number;
  quickplaysFinished: number;
  quickplaysWon: number;
  quickplaysLost: number;
  quickplaysTied: number;
  lastQuickplayStarted: timestamp;
  lastQuickplayFinished: timestamp;
  lastGameStarted: timestamp;
  lastGameFinished: timestamp;

  campaignsStarted: number;
  campaignsFinished: number;
  campaignsWon: number;
  campaignsLost: number;
  lastCampaignStarted: timestamp;
  lastCampaignFinished: timestamp;

  totalCasesWon: number;
  totalCasesLost: number;
  totalCasesTied: number;

  // Optional but recommended
  campaignsAbandoned?: number; // Nah. We can suss this out by subtracting finished from started. That's what we do for all the other kinda.fun games.
  lastCampaignAbandoned?: timestamp; // same
}
```

### `/stats/court/tactics/{tacticName}`

```ts
{
  name: string;
  timesPlayed: number;
  playerPlays: number;
  opponentPlays: number;
  totalNetLeaningShift: number; // sum of all +/− leaning changes this tactic caused
  averageNetShiftPerPlay: number; // digestible headline metric: totalNetLeaningShift / timesPlayed
  totalAbsoluteLeaningShift: number; // how much total movement happened, ignoring direction
  averageAbsoluteShiftPerPlay: number; // secondary digestible metric for raw force
  lastPlayedAt: timestamp;
}
```

### `/stats/court/cases/{caseName}`

```ts
{
  name: string;
  timesPlayed: number;
  timesWon: number;
  timesLost: number;
  timesTied: number;
  defenseWins: number;
  prosecutionWins: number;
  lastPlayedAt: timestamp;
}
```

### `/stats/court/justices/{justiceName}`

```ts
{
  name: string;
  timesAdjudicated: number;
  timesAttacked: number;
  timesRetired: number;
  timesNominated: number;
  lastAdjudicatedAt: timestamp;
}
```

### `/stats/court/campaigns/{campaignName}`

```ts
{
  name: string;
  timesPlayed: number;
  timesWon: number;
  timesLost: number;
  lastPlayedAt: timestamp;
}
```

### `/stats/court/objectives/{objectiveName}`

```ts
{
  name: string;
  timesChosen: number;
  timesFailed: number;
  timesSucceeded: number;
  lastChosenAt: timestamp;
}
```

### `/stats/court/rewards/{rewardName}`

```ts
{
  name: string;
  timesChosen: number;
  timesActivated: number;
  lastChosenAt: timestamp;
  lastActivatedAt: timestamp;
}
```

### `/stats/court/stances/{stanceName}`

```ts
{
  name: string;
  casesFor: number;
  casesAgainst: number;
  casesTied: number;
  lastAdjudicatedAt: timestamp;
}
```

### `/stats/court/justices/{justiceName}/cases/{caseName}`

```ts
{
  name: string; // case name, not justice name
  prosecutionVotes: number;
  defenseVotes: number;
  abstainVotes: number;
  lastVotedAt: timestamp;
}
```

---

## Inconsistencies Found In The Draft

1. Path style was inconsistent.

- Some sections used `/stats/court/...` and others used `stats/court/...`.
- Decision: use leading slash everywhere in docs.

2. Document keys mixed name-based and ID-based references.

- You want name-based keys for Firestore readability, which is valid for this project.
- Decision: use name-based keys as canonical and keep optional `id` fields only when useful for joins/migrations.
- Decision: use the original names for keys (no string mutation), per project preference.

3. Cases tracked wins and losses but not ties.

- Top-level totals include ties, so case-level should too.
- Decision: add `timesTied` to case docs.

4. Reward telemetry was ambiguous.

- Selection and activation are different events in campaign flow.
- Decision: track both `timesChosen` and `timesActivated`.

5. Stance metrics implied one issue per case.

- A case side can include multiple stance topics.
- Decision: update all winning-side stance topics each verdict.

6. Justice-by-case vote history requested was not structurally defined.

- Existing runtime vote snapshots are not persisted to Firestore in a query-friendly way.
- Decision: prefer `/stats/court/justices/{justiceName}/cases/{caseName}` for readable browsing in Firestore.

7. Campaign doc key should be stable while still human-readable.

- Decision: key by campaign name directly.
- If a campaign name ever changes, run a one-time backfill/migration for older docs.

---

## Additional Metrics We Could Capture

Each item includes a usefulness confidence rating.

1. Campaigns abandoned mid-run

NO. Because... that would require measuring disconnects. I'd rather just track started vs finished and infer abandonment from the delta. It's simpler and less error-prone.

2. Objective failure reason breakdown

NO. Because the reason for failure is baked into the objective itself.

3. Average rounds per case

NO. Because it's always 5. That's a game setting. If the game setting changes, that's not worth tracking.

4. Reward effectiveness

NO. Because that would require a lot of outside logic that could be wrong. I'd prefer numbers, not conclusions.

5. Nominations by president

YES. Okay, this is interesting and easy to track. Maybe `/stats/court/presidents/{presidentName}` with nomination counts and success rates?

6. Tactic effectiveness score

YES. We will track this as direct movement data instead of inferred quality.

- Metric fields on each tactic doc:
  - `totalNetLeaningShift`
  - `averageNetShiftPerPlay`
  - `totalAbsoluteLeaningShift`
  - `averageAbsoluteShiftPerPlay`
- Confidence: High usefulness
- Why: these are simple arithmetic summaries of real gameplay effects, not opinionated conclusions.

7. Raw turn-by-turn event logs for all actions

NO. This is just adding garbage and Firebase cost.

8. UI clickstream telemetry for modal interactions

NO. We are measuring gameplay, not site telemetry. This is a video game that's supposed to be fun. That's the thing I want to measure: Fun. Not whether people are clicking the "i" icon on the tactic card before playing it. That's not a fun metric. If we find that we need to know that, we can add it later.

---

## Stat Triggers (Canonical)

SHORT VERSION: Trigger on game start, trial end, and campaign start. At that stage, log the relevant gameplay things that took place.

This is just to batch these updates together, so we're not doing Firestore calls on every click (which, frankly would be expensive and slow).

### Quickplay Start

- Increment `gamesStarted`
- Increment `quickplaysStarted`
- Set `lastQuickplayStarted`
- Set `lastGameStarted`

### Quickplay End (Verdict)

- Increment `gamesFinished`
- Increment `quickplaysFinished`
- Increment one of `quickplaysWon`, `quickplaysLost`, `quickplaysTied`
- Set `lastQuickplayFinished`
- Set `lastGameFinished`
- Increment one of `totalCasesWon`, `totalCasesLost`, `totalCasesTied`
- Update `/stats/court/cases/{caseName}`
- Update `/stats/court/justices/{justiceName}` for each bench justice
- Update `/stats/court/tactics/{tacticName}` for each tactic used
- Update `/stats/court/stances/{stanceName}` for each winning-side stance
- Update `/stats/court/justices/{justiceName}/cases/{caseName}`

### Campaign Start

- Increment `gamesStarted`
- Increment `campaignsStarted`
- Set `lastCampaignStarted`
- Set `lastGameStarted`
- Update `/stats/court/campaigns/{campaignName}`
- Update `/stats/court/objectives/{objectiveName}` when selected

### Campaign Trial End (Each Verdict)

- Increment one of `totalCasesWon`, `totalCasesLost`, `totalCasesTied`
- Update `/stats/court/cases/{caseName}`
- Update `/stats/court/justices/{justiceName}` for each bench justice
- Update `/stats/court/tactics/{tacticName}` for each tactic used
- Update `/stats/court/stances/{stanceName}` for each winning-side stance
- Update `/stats/court/justices/{justiceName}/cases/{caseName}`
- Update `/stats/court/rewards/{rewardName}` for reward selection and separately for activation

### Campaign End

- Increment `gamesFinished`
- Increment `campaignsFinished`
- Increment one of `campaignsWon`, `campaignsLost`
- Set `lastCampaignFinished`
- Set `lastGameFinished`

### Campaign Abandon

- Not tracked directly in this issue
- Inferred metric: `campaignsStarted - campaignsFinished`

---

## Implementation Plan

### Phase 1: Add stats helper module

Create `src/views/court/ts/_statsHelpers.ts` with typed, reusable write functions:

- `writeCourtAggregateStats`
- `writeCaseStats`
- `writeJusticeStats`
- `writeTacticStats`
- `writeCampaignStats`
- `writeObjectiveStats`
- `writeRewardStats`
- `writeStanceStats`
- `writeCaseJusticeVoteStats`

Implementation notes:

- Use Firestore `setDoc(..., { merge: true })` and `increment(...)`.
- Use original name keys for Firestore paths.
- Keep writes non-fatal: log warnings and continue gameplay.

### Phase 2: Hook into Court lifecycle

Wire helper calls into:

- Quickplay start and end flows
- Tactic play tracking flow
- Campaign start and objective pick
- Campaign trial verdict flow
- Reward selection and reward activation
- Campaign completion flow

### Phase 3: Align vote classification

Use one shared helper to classify each justice vote:

- `abstain` when leaning is exactly `0`
- otherwise map positive/negative leaning relative to player side to prosecution/defense

This keeps vote UI and Firestore analytics aligned.

Also: this issue explicitly tracks which justices voted what on which cases via
`/stats/court/justices/{justiceName}/cases/{caseName}` and tracks case frequency via
`/stats/court/cases/{caseName}`.

### Phase 3.5: Tactic impact aggregation

On each tactic resolution, compute the trial-level effect as:

- `netShift = sum(result.change)` across all impacted justices
- `absoluteShift = sum(abs(result.change))` across all impacted justices

Then aggregate on `/stats/court/tactics/{tacticName}`:

- increment `totalNetLeaningShift` by `netShift`
- increment `totalAbsoluteLeaningShift` by `absoluteShift`
- recompute:
  - `averageNetShiftPerPlay = totalNetLeaningShift / timesPlayed`
  - `averageAbsoluteShiftPerPlay = totalAbsoluteLeaningShift / timesPlayed`

Digestible read:

- `averageNetShiftPerPlay` answers: on average, did this tactic help or hurt me, and by how much?
- `averageAbsoluteShiftPerPlay` answers: how much total chaos/movement does this tactic create?

### Phase 4: Add tests

Create:

- `tests/court-stats-helpers.spec.ts`
- `tests/court-campaign-stats.spec.ts`

Test coverage targets:

- Name-based keys are used in all stat paths
- Correct counter increments for win/loss/tie outcomes
- Reward chosen vs activated tracked separately
- Justice case vote docs update prosecution/defense/abstain buckets correctly
- Multi-stance cases update all relevant stance docs
- Tactic impact metrics update correctly for positive, negative, and mixed multi-target outcomes

---

## Success Criteria

1. Firestore keys are stable, human-readable, and name-based.
2. All counters update at the correct trigger points.
3. Ties are tracked consistently in aggregate, per-case, and per-stance metrics.
4. Justice-by-case voting records are queryable at `/stats/court/justices/{justiceName}/cases/{caseName}`.
5. Reward selection and activation are tracked as separate events.
6. Stats writes never crash gameplay.
7. Unit tests cover the above behaviors.

---

## Open Questions For Review

1. None blocking for this issue right now.
2. Optional future decision: if a display name changes later, should we backfill historical docs or start a new bucket?
