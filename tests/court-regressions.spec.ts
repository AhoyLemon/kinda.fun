import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const courtRootPath = path.resolve(__dirname, "../src/views/court");
const courtPugPath = path.join(courtRootPath, "Court.pug");

describe("Court regressions", () => {
  it("gates trial cheats UI behind cheatsActive", () => {
    const courtPug = fs.readFileSync(courtPugPath, "utf8");

    const trialCheatsGuardPattern = /\.trial-cheats\(v-if="cheatsActive\s*&&\s*ui\.phase === 'playing'"\)/;

    expect(courtPug).toMatch(trialCheatsGuardPattern);
  });

  it("uses the correctly spelled susceptibility stat key", () => {
    const files = fs
      .readdirSync(courtRootPath, { recursive: true })
      .filter((entry): entry is string => typeof entry === "string")
      .filter((entry) => entry.endsWith(".ts") || entry.endsWith(".vue") || entry.endsWith(".pug"));

    for (const relativeFile of files) {
      const fullPath = path.join(courtRootPath, relativeFile);
      const contents = fs.readFileSync(fullPath, "utf8");
      expect(contents).not.toContain("succeptibility");
    }
  });

  it("guards dual-target mode behind 2+ eligible justices", () => {
    const courtVue = fs.readFileSync(path.join(courtRootPath, "Court.vue"), "utf8");
    expect(courtVue).toContain("eligibleMultiTargetJustices.length < 2");
    expect(courtVue).toContain("eligibleJusticeIds.size < 2");
  });

  it("uses strict abstention bounds around threshold", () => {
    const courtVue = fs.readFileSync(path.join(courtRootPath, "Court.vue"), "utf8");
    expect(courtVue).toContain("return l > -t && l < t;");
  });
});
