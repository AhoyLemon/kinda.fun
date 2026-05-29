import type { Card } from "./_allCards";

export interface EventCard extends Card {
  isEventCard: true;
}

export const eventCards: EventCard[] = [
  // === DevSum Stockholm 2026 (June 2–3) — comment out after event ===
  { phrase: `mostly about AI`, points: 10, isEventCard: true, stringMatch: "mostly about ai" },
  { phrase: `olympic swimming`, points: 10, isEventCard: true, stringMatch: "olympic swimming" },
  { phrase: `the DevSum party`, points: 10, isEventCard: true, stringMatch: "devsum party", alternates: ["dev sum party"] },
  { phrase: `ABBA`, points: 10, isEventCard: true },
  { phrase: `Kista`, points: 10, isEventCard: true },
  { phrase: `I keep dancing on my own.`, points: 10, isEventCard: true, stringMatch: "dancing on my own" },
  { phrase: `I'm only here for the gummies.`, points: 10, isEventCard: true, stringMatch: "gummies" },
  { phrase: `I learned more in the hallway.`, points: 10, isEventCard: true, stringMatch: "in the hallway" },
  { phrase: `I'm going to need a few days to decompress.`, points: 10, isEventCard: true, stringMatch: "decompress" },
  { phrase: `I never learned the WiFi password.`, points: 10, isEventCard: true, stringMatch: "wifi password", alternates: ["wi-fi password"] },
  { phrase: `I bought a cardamom bun.`, points: 10, isEventCard: true, stringMatch: "cardamom bun" },
  { phrase: `I accidentally attended a workshop.`, points: 10, isEventCard: true, stringMatch: "attended a workshop" },
  { phrase: `I hope I sleep on the flight home.`, points: 10, isEventCard: true, stringMatch: "sleep on the flight" },
  { phrase: `Ulf is quite tall!`, points: 15, isEventCard: true, stringMatch: "ulf", alternates: ["ulf dalgaard", "dalgaard"] },
  { phrase: `Arthur Doler`, points: 15, isEventCard: true, stringMatch: "arthur doler", alternates: ["doler"] },
  { phrase: `put it on the Tibi Tab!`, points: 15, isEventCard: true, stringMatch: "tibi tab", alternates: ["the tibi tab"] },
  { phrase: `I didn't learn anything.`, points: 15, isEventCard: true, stringMatch: "didn't learn anything" },
  { phrase: `I dunno, I guess I represented the company well.`, points: 15, isEventCard: true, stringMatch: "represented the company" },
  { phrase: `I met Rich Campbell.`, points: 15, isEventCard: true, stringMatch: "rich campbell", alternates: ["campbell"] },
  { phrase: `I sent connection requests to all the speakers.`, points: 15, isEventCard: true, stringMatch: "connection requests" },
  { phrase: `The speaker said "I see you googling that."`, points: 15, isEventCard: true, stringMatch: "googling that" },
  { phrase: `but obviously Lemon's talk was the best`, points: 30, isEventCard: true, stringMatch: "lemon's talk", alternates: ["lemons talk", "lemon talk"] },
  { phrase: `Systembolaget`, points: 30, isEventCard: true, alternates: ["system bolaget"] },
  { phrase: `Is The Little Mermaid Swedish?`, points: 30, isEventCard: true, stringMatch: "little mermaid" },
];
