import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Static Page Generation", () => {
  it("404.html contains expected page title", () => {
    const filePath = path.resolve(__dirname, "../dist/404.html");
    expect(fs.existsSync(filePath)).toBe(true);
    const html = fs.readFileSync(filePath, "utf8");
    expect(html).toMatch(/<title>404 - Page Not Found \| Kinda fun\.<\/title>/i);
  });

  it("home.html contains expected page title", () => {
    const filePath = path.resolve(__dirname, "../dist/home.html");
    expect(fs.existsSync(filePath)).toBe(true);
    const html = fs.readFileSync(filePath, "utf8");
    expect(html).toMatch(/<title>Kinda fun\. \| Here\'s some games and stuff that Lemon made\. All of it is kinda fun!<\/title>/i);
  });
});
