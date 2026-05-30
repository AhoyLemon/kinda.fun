import type { Justice, CourtGameState, President, Tactic } from "./_types";
import { gameSettings } from "./_settings";

interface CaseHistoryEntry {
  caseName: string;
  votes: Record<number, boolean>;
}

export function useCourtHelpers(game: CourtGameState, caseHistory: CaseHistoryEntry[]) {
  function voteMeterStyle(justice: Justice): Record<string, string> {
    const leaning = game.leanings[justice.id] ?? 0;
    const halfPct = (Math.abs(leaning) / 100) * 50;
    const color = leaning > 0 ? "#2a7a3a" : leaning < 0 ? "#8b2020" : "transparent";
    if (leaning >= 0) {
      return { left: "50%", width: `${halfPct}%`, backgroundColor: color };
    } else {
      return { left: `${50 - halfPct}%`, width: `${halfPct}%`, backgroundColor: color };
    }
  }

  function verdictJusticeBarStyle(justice: Justice): Record<string, string> {
    const leaning = game.leanings[justice.id] ?? 0;
    const pct = Math.abs(leaning);
    const color =
      leaning >= gameSettings.abstentionThreshold
        ? "#2a7a3a"
        : leaning <= -gameSettings.abstentionThreshold
          ? "#8b2020"
          : "#5a4a3a";
    return { width: `${pct}%`, backgroundColor: color };
  }

  function justiceVoteHistory(justice: Justice): Array<{ caseName: string; votedFor: boolean }> {
    return caseHistory.filter((c) => justice.id in c.votes).map((c) => ({ caseName: c.caseName, votedFor: c.votes[justice.id] }));
  }

  return { voteMeterStyle, verdictJusticeBarStyle, justiceVoteHistory };
}

// ── Pure helper functions ─────────────────────────────────────────────────────

export function getKeyStats(justice: Justice): Record<string, number> {
  return {
    Logic: justice.stats.logic,
    Charisma: justice.stats.charisma,
    Loyalty: justice.stats.partyLoyalty,
  };
}

export function justiceTypeLabel(type: Justice["justiceType"]): string {
  return { current: "Current", historical: "Historical", fictional: "Fictional", celebrity: "Celebrity" }[type] ?? type;
}

export function sideStanceTags(
  stances?: Partial<Record<string, string>>,
): { label: string; position: string }[] {
  if (!stances) return [];
  return (Object.entries(stances) as [string, string][])
    .filter(([, pos]) => pos !== "Neutral")
    .map(([topic, position]) => ({ label: topic.replace(/([A-Z])/g, " $1").trim(), position }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function targetLabel(effectType: Tactic["effectType"]): string {
  return (
    {
      "sway-one": "🎯 Single target",
      "sway-all": "🌊 All justices",
      "request-amicus": "📚 All justices",
      "recite-dissent": "📖 No target",
      "catch-phone": "📱 Single target",
      "plant-story": "🌱 Single target",
      susceptibility: "😴 All justices",
      "lemon-test": "🍋 All justices",
      shield: "🛡️ Ally only",
      "discard-all": "🗑️ Playbook",
      "claim-two": "🗑️ Playbook",
      "make-chief": "👑 Chief Justice",
      "insult-chief": "👑 Chief Justice",
      "presidential-call": "📞 All justices",
      recuse: "🔕 Single target",
      "betray-friend": "🗡️ Strongly For only",
      "swap-clerks": "🔄 Two justices",
      "encourage-nap": "💤 Single target",
      "justice-cocktails": "🍸 Single target",
      "saint-patricks": "☘️ All justices",
      "invite-church": "⛪ Single target",
      "suggest-retirement": "🏖️ Single target",
      "keep-crown": "👑 Chief Justice",
      "gift-boxes": "🎁 All justices",
      "drag-them": "🎯 Single target",
      "whisper-campaign": "🎯 Single target",
      "fog-machine": "🪩 All justices",
      "alien-abduction": "👽 All justices",
      "mess-calendar": "📅 Skip a day",
      "international-law": "🌍 All justices",
      "reframe-debate": "📣 Choose a stance",
      "suggest-yoga": "🧘 Single target",
    }[effectType] ?? effectType
  );
}

export function voteLabel(leaning: number): string {
  const t = gameSettings.abstentionThreshold;
  if (leaning >= 60) return "Strongly For";
  if (leaning >= t) return "Leaning For";
  if (leaning > -t) return "Undecided";
  if (leaning > -60) return "Leaning Against";
  return "Strongly Against";
}

export function justiceImageUrl(justice: Justice): string | null {
  return justice.image ? `/img/court/justices/${justice.image}` : null;
}

export function presidentImageUrl(president: President): string | null {
  return president.image ? `/img/court/presidents/${president.image}` : null;
}

export function justiceHints(justice: Justice, limit = 4): string[] {
  const hints: string[] = [];
  if (justice.stats.partyLoyalty >= 8) hints.push("📌 Deeply partisan");
  else if (justice.stats.partyLoyalty <= 3) hints.push("🎯 Votes independently");
  if (justice.weaknesses.flattery >= 7) hints.push("😊 Loves being flattered");
  else if (justice.weaknesses.flattery <= 2) hints.push("🙄 Immune to flattery");
  if (justice.weaknesses.bribery >= 7) hints.push("💰 Open to bribery");
  else if (justice.weaknesses.bribery <= 2) hints.push("🚫 Incorruptible");
  if (justice.weaknesses.blackmail >= 7) hints.push("🤫 Has something to hide");
  else if (justice.weaknesses.blackmail <= 2) hints.push("🩻 Difficult to blackmail");
  if (justice.weaknesses.threats >= 7) hints.push("😰 Unnerved by pressure");
  else if (justice.weaknesses.threats <= 2) hints.push("🦁 Nearly impossible to threaten");
  if (justice.stats.susceptibility >= 7) hints.push("🌀 Easily swayed");
  else if (justice.stats.susceptibility <= 3) hints.push("🪨 Hard to budge");
  if (justice.stats.empathy >= 8) hints.push("❤️ Responds to emotional appeals");
  else if (justice.stats.empathy <= 2) hints.push("🧊 Cold to emotional arguments");
  if (justice.stats.logic >= 8) hints.push("📚 Won over by sound reasoning");
  else if (justice.stats.logic <= 3) hints.push("❓ Logic rarely lands here");
  return hints.slice(0, limit);
}
