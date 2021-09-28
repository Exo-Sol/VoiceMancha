import React, { useState } from "react";
import { TimeStamp } from "../TimeStamp";

const PercentageToday = () => {
  const [percToday, setPercToday] = useState(0);

  const dateToday = `${TimeStamp().month}.${TimeStamp().day}`;
  const storage = { ...localStorage };

  for (const key in storage) {
    console.log(`${key}: ${storage[key]}`);
  }

  const retrivedDates = Object.keys(storage);

  retrivedDates.forEach((e) => {
    if (e === dateToday) {
      console.log(JSON.parse(storage[e]));
      console.log(e);
      console.log(dateToday);
      //  const todayManch = JSON.parse(storage.e).map((ele) => {
      //    return ele.manch;
      //  });
      //  const num = todayManch.length;
      //  const tot = todayManch.reduce((a, b) => a + b, 0);
      //  setPercToday(() => tot / num);
    }
  });

  return (
    <>
      <div>{percToday}</div>
      <div>{dateToday}</div>;
    </>
  );
};

export default PercentageToday;
