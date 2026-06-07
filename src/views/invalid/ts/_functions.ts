export function countVowels(word: string): number {
  let vowelCount = 0;
  const matchingInstances = word.match(/[AEIOU]/gi);
  if (matchingInstances) {
    vowelCount = matchingInstances.length;
  }
  return vowelCount;
}
