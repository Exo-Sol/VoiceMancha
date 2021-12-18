const storage = { ...localStorage };

let allmanch = [];

const retrivedDates = Object.keys(storage);

retrivedDates.forEach((e) => {
  let parsedStorage = JSON.parse(storage[e]);
  parsedStorage.map((ele) => allmanch.push(ele.manch));
});

let freqObj = {};
allmanch.forEach(function (e) {
  if (typeof freqObj[e] == "undefined") {
    freqObj[e] = 1;
  } else {
    freqObj[e] = freqObj[e] + 1;
  }
});

let manchaMods1 = Object.keys(freqObj);

manchaMods1.sort((a, b) => freqObj[b] - freqObj[a]);

let manchaMods = manchaMods1.slice(0, 6);

export default manchaMods;
