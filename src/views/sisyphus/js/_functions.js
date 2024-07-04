export function sendEvent(c, a, l, v) {
  console.log(c, a, l, v);

  // if (_paq && _paq != undefined) {
  //   if (v) {
  //     _paq.push(["trackEvent", c, a, l, v]);
  //     //ga('send', 'event', { eventCategory: c, eventAction: a, eventLabel: l, eventValue:v });
  //     console.log(
  //       "CATEGORY: " + c + ", ACTION:" + a + ", LABEL:" + l + ", VALUE:" + v,
  //     );
  //   } else if (l) {
  //     _paq.push(["trackEvent", c, a, l]);
  //     //ga('send', 'event', { eventCategory: c, eventAction: a, eventLabel: l });
  //     console.log("CATEGORY: " + c + ", ACTION:" + a + ", LABEL:" + l);
  //   } else {
  //     _paq.push(["trackEvent", c, a]);
  //     //ga('send', 'event', { eventCategory: c, eventAction: a });
  //     console.log("CATEGORY: " + c + ", ACTION:" + a);
  //   }
  // } else {
  // }
}

export function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export function addCommas(x) {
  if (!x) {
    return x;
  } else {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function findKeyInArray(array, key, value) {
  for (var i = array.length - 1; i >= 0; --i) {
    if (array[i][key] == value) {
      return i;
    }
  }
}

export function removeFromArrayByKey(array, key, value) {
  for (var i = array.length - 1; i >= 0; --i) {
    if (array[i][key] == value) {
      array.splice(i, 1);
    }
  }
}
