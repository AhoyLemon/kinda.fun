// ─── Re-export shim ─────────────────────────────────────────────────────────
// This file is kept for backward compatibility.
// All justice data now lives in ./justices/ partials.
// New code should import directly from "./justices".

export {
  currentJustices,
  historicalJustices,
  fictionalJustices,
  celebrityJustices,
  warrenJustices,
  lochnerJustices,
  justices,
  presetBenchConfigs,
} from "./justices";

export type { PresetBenchConfig } from "./justices";

// Legacy aliases (old singular-prefix names)
export { currentJustices as justiceCurrent } from "./justices";
export { historicalJustices as justiceHistorical } from "./justices";
export { fictionalJustices as justiceFictional } from "./justices";
export { celebrityJustices as justiceCelebrity } from "./justices";
export { warrenJustices as justiceWarrenExtra } from "./justices";
export { lochnerJustices as justiceLochnerExtra } from "./justices";
