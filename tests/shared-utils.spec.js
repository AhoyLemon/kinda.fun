import { describe, it, expect } from "vitest";
import { randomNumber, randomFrom, shuffle, addCommas, findInArray, removeFromArray, percentOf } from "../src/shared/js/_functions.js";

describe("Shared Utility Functions", () => {
  it("randomNumber returns a number within range", () => {
    for (let i = 0; i < 10; i++) {
      const n = randomNumber(5, 10);
      expect(n).toBeGreaterThanOrEqual(5);
      expect(n).toBeLessThan(10);
    }
  });

  it("randomFrom returns an element from the array", () => {
    const arr = ["a", "b", "c"];
    for (let i = 0; i < 10; i++) {
      expect(arr.includes(randomFrom(arr))).toBe(true);
    }
  });

  it("shuffle returns an array with same elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle([...arr]);
    expect(shuffled.sort()).toEqual(arr.sort());
    expect(shuffled.length).toBe(arr.length);
  });

  it("addCommas formats numbers with commas", () => {
    expect(addCommas(1000)).toBe("1,000");
    expect(addCommas(1234567)).toBe("1,234,567");
  });

  it("findInArray returns index or null", () => {
    expect(findInArray(["a", "b", "c"], "b")).toBe(1);
    expect(findInArray(["a", "b", "c"], "z")).toBeNull();
  });

  it("removeFromArray removes all occurrences", () => {
    const arr = [1, 2, 3, 2, 4];
    removeFromArray(arr, 2);
    expect(arr).toEqual([1, 3, 4]);
  });

  it("percentOf returns correct percentage", () => {
    expect(percentOf(100, 25)).toBe(25);
    expect(percentOf(0, 10)).toBe(0);
    expect(percentOf(10, 0)).toBe(0);
  });
});
