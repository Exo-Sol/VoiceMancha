import React from "react";

const getModeManch = (chosen = "Total") => {
  const storage = { ...localStorage };

  let allmanch = [];

  const retrivedDates = Object.keys(storage);

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////

  retrivedDates.forEach((e) => {
    let parsedStorage = JSON.parse(storage[e]);
    parsedStorage.map((ele) => {
      if (chosen === "Total") {
        allmanch.push(ele.manch);
      } else {
        if (ele.timeObj.month === parseInt(chosen)) {
          allmanch.push(ele.manch);
        }
      }
    });
  });
  /////////////////////////////////////////////////////////
  let freqObj = {};
  allmanch.forEach(function (e) {
    if (typeof freqObj[e] == "undefined") {
      freqObj[e] = 1;
    } else {
      freqObj[e] = freqObj[e] + 1;
    }
  });

  const numAll = allmanch.length;
  console.log(numAll);
  console.log(freqObj);

  const totalManch = allmanch.reduce((a, b) => a + b, 0);

  let manchaMods1 = Object.keys(freqObj);
  let manchaValues1 = Object.values(freqObj);

  manchaMods1.sort((a, b) => freqObj[b] - freqObj[a]);
  manchaValues1.sort((a, b) => b - a);

  console.log(manchaMods1);
  console.log(manchaValues1);

  const manchaMods = manchaMods1.slice(0, 6);
  const manchaValues = manchaValues1.slice(0, 6);

  const manchaPerc1 = manchaValues.map((e) => (e / numAll).toFixed(2) * 100);
  const manchaPerc = manchaPerc1.map(
    (e) => Math.round((e + Number.EPSILON) * 100) / 100
  );
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  // by month

  // better mayby to push to array all values so you have the total mancha nad total num so you can derive perc

  let mothObj = {
    1: [], // [0]
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  };

  let dayOfWeekObj = {
    Pon: [], // [0]
    Uto: [],
    Sri: [],
    Cet: [],
    Pet: [],
    Sub: [],
    Ned: [],
  };

  retrivedDates.forEach((e) => {
    let parsedStorage = JSON.parse(storage[e]);
    parsedStorage.map((ele) => {
      let x = ele.timeObj.month;
      mothObj[x].push(ele.manch);
    });
  });

  retrivedDates.forEach((e) => {
    let parsedStorage = JSON.parse(storage[e]);
    parsedStorage.map((ele) => {
      let x = ele.timeObj.weekDay;
      dayOfWeekObj[x].push(ele.manch);
    });
  });

  console.log(mothObj);
  console.log(dayOfWeekObj);

  const maxManch = Math.max.apply(Math, allmanch);

  return {
    manchaMods,
    manchaPerc,
    numAll,
    totalManch,
    manchaValues,
    mothObj,
    maxManch,
    dayOfWeekObj,
  };
};

export default getModeManch;
