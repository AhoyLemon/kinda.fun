export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomFrom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffle<T>(o: T[]): T[] {
  for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

export function addCommas(x: number | string): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function findInArray<T>(haystack: T[], needle: T): number | null {
  const n = haystack.indexOf(needle);
  return n > -1 ? n : null;
}

export function removeFromArray<T>(haystack: T[], needle: T): void {
  for (let i = haystack.length - 1; i >= 0; i--) {
    if (haystack[i] === needle) {
      haystack.splice(i, 1);
    }
  }
}

export function percentOf(total: number, part: number): number {
  if (total === 0 || part === 0) {
    return 0;
  } else {
    return Math.round((part * 100) / total);
  }
}

export function precisePercentOf(total: number, part: number): number {
  if (total === 0 || part === 0) {
    return 0;
  } else {
    return (part * 100) / total;
  }
}

export function sendEvent(c?: string, a?: string, l?: string, v?: number): void {
  const output: string[] = [];
  if (c !== undefined) output.push("CATEGORY: " + c);
  if (a !== undefined) output.push("ACTION:" + a);
  if (l !== undefined) output.push("LABEL:" + l);
  if (v !== undefined) output.push("VALUE:" + v);
  if (output.length) console.log(output.join(", "));
}

export function findKeyInArray<T>(array: T[], key: keyof T, value: any): number | undefined {
  for (let i = array.length - 1; i >= 0; --i) {
    if (array[i][key] === value) {
      return i;
    }
  }
}

export function removeFromArrayByKey<T>(array: T[], key: keyof T, value: any): void {
  for (let i = array.length - 1; i >= 0; --i) {
    if (array[i][key] === value) {
      array.splice(i, 1);
    }
  }
}

export function dollars(amount: number, alwaysShowDecimals: boolean = false): string {
  const minimumFractionDigits = alwaysShowDecimals ? 2 : Number.isInteger(amount) ? 0 : 2;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: minimumFractionDigits,
  });
  return formatter.format(amount);
}
