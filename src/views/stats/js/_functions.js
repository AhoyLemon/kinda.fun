// Adds commas to a number
export const addCommas = (n) => {
  if (n === undefined || n === null) return "0";
  return n.toLocaleString();
};
import { timeZoneOffset } from "./_variables";
import moment from "moment";
export const formatDate = (d) => {
  if (d) {
    return moment(d).subtract(timeZoneOffset, "minutes").format("MMM Do @ h:ss a");
  } else {
    return moment(d).subtract(timeZoneOffset, "minutes");
  }
};

export const billionsOfDollars = (amount, isTruncationRequested) => {
  const dollars = Number(amount * 1000000000);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  if (amount && isTruncationRequested) {
    if (amount > 1000) {
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

export const dollars = (amount) => {
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

export const exceededBudgetOutput = (v) => {
  if (v == "YES" || v == "NO") {
    return v;
  } else {
    return "-";
  }
};

export const formatStatement = (statement) => {
  return statement.replace("{", "").replace("}", "");
};
