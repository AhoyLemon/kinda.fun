export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffle(o) {
  for (
    var j, x, i = o.length;
    i;
    j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

export function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function findInArray(haystack, needle) {
  let n = haystack.indexOf(needle);
  if (n > -1) {
    return n;
  } else {
    return null;
  }
}

export function removeFromArray(haystack, needle) {
  for (var i = haystack.length - 1; i--; ) {
    if (haystack[i] == needle) {
      haystack.splice(i, 1);
    }
  }
}

export function percentOf(total, part) {
  if (total == 0 || part == 0) {
    return 0;
  } else {
    return Math.round((part * 100) / total);
  }
}
export function preceisePercentOf(total, part) {
  if (total == 0 || part == 0) {
    return 0;
  } else {
    return (part * 100) / total;
  }
}

export function sendEvent(c, a, l, v) {
  console.log(
    "CATEGORY: " + c + ", ACTION:" + a + ", LABEL:" + l + ", VALUE:" + v,
  );
  // if (_paq && _paq != undefined) {
  //   if (v) {
  //     _paq.push(['trackEvent', c, a, l, v]);
  //     //ga('send', 'event', { eventCategory: c, eventAction: a, eventLabel: l, eventValue:v });
  //     console.log('CATEGORY: '+c+', ACTION:'+a+', LABEL:'+l+', VALUE:'+v);
  //   } else if (l) {
  //     _paq.push(['trackEvent', c, a, l]);
  //     //ga('send', 'event', { eventCategory: c, eventAction: a, eventLabel: l });
  //     console.log('CATEGORY: '+c+', ACTION:'+a+', LABEL:'+l);
  //   } else {
  //     _paq.push(['trackEvent', c, a]);
  //     //ga('send', 'event', { eventCategory: c, eventAction: a });
  //     console.log('CATEGORY: '+c+', ACTION:'+a);
  //   }
  // } else {

  // }
}

///////////
// sisyphus
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

//////////////////
// Cameo
export function dollars(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
}
