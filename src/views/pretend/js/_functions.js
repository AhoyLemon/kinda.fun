export function workThisArray(myArray) {
  let r = Math.floor(Math.random() * myArray.length);
  let message = "";

  myArray[r].forEach(function (k) {
    //console.log(typeof k);
    if (typeof k == "object") {
      //console.log(k)
      var z = Math.floor(Math.random() * k.length);

      if (typeof k[z] == "object") {
        k[z].forEach(function (a) {
          if (typeof a == "object") {
            message += a[Math.floor(Math.random() * a.length)];
          } else {
            message += a;
          }
        });
      } else {
        message += k[z];
      }
    } else {
      message += k;
    }
  });
  return message;
}

export function stringInArray(s, a) {
  let n = a.indexOf(s);
  if (n > -1) {
    return true;
  } else {
    return false;
  }
}

export function capitalize(string) {
  if (!string || typeof string !== "string") {
    return "";
  }

  // Split the string into words by whitespace
  const words = string.trim().split(/\s+/);

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back into a string and return
  return capitalizedWords.join(" ");
}

export function bold(string) {
  return "<strong>" + string + "</strong>";
}

export function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

export function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  let costs = [];
  for (let i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

export function testChance(chance) {
  let r = Math.floor(Math.random() * 100) + 1;
  if (chance >= r) {
    return true;
  } else {
    return false;
  }
}
