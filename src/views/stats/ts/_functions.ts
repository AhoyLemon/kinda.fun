// Adds commas to a number
export const addCommas = (n: number | string | null | undefined): string => {
  if (n === undefined || n === null) return "0";
  return n.toLocaleString();
};
import { timeZoneOffset } from "./_variables";
import { DateTime } from "luxon";
export const formatDate = (d: Date | string | number | null | undefined): string | DateTime => {
  if (d) {
    return DateTime.fromJSDate(new Date(d)).minus({ minutes: timeZoneOffset }).toFormat("MMM d @ h:mm a");
  } else {
    return DateTime.fromJSDate(new Date(d)).minus({ minutes: timeZoneOffset });
  }
};

export const billionsOfDollars = (amount: number, isTruncationRequested?: boolean): string => {
  const dollars = Number(amount * 1000000000);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  if (amount && isTruncationRequested) {
    if (amount > 1000000) {
      return formatter.format(amount / 1000000) + " quadrillion";
    } else if (amount > 1000) {
      return formatter.format(amount / 1000) + " trillion";
    } else {
      return formatter.format(amount) + " billion";
    }
  } else if (amount) {
    return formatter.format(dollars);
  } else {
    return "-";
  }
};

export const dollars = (amount: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  if (amount) {
    return formatter.format(amount);
  } else {
    return "-";
  }
};

export const exceededBudgetOutput = (v: string): string => {
  if (v == "YES" || v == "NO") {
    return v;
  } else {
    return "-";
  }
};

export const formatStatement = (statement: string): string => {
  return statement.replace("{", "").replace("}", "");
};
