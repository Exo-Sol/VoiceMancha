import React, { useState, useEffect } from "react";
import { TimeStamp } from "../TimeStamp";

const PercentageToday = ({ resetToMain }) => {
  const [percToday, setPercToday] = useState(0);

  const dateToday = `${TimeStamp().month}.${TimeStamp().day}`;
  const storage = { ...localStorage };

  const retrivedDates = Object.keys(storage);

  useEffect(() => {
    retrivedDates.forEach((e) => {
      if (e === dateToday) {
        console.log(JSON.parse(storage[e]));
        console.log(e);
        console.log(dateToday);
        let parsedStorage = JSON.parse(storage[e]);
        const todayManch = parsedStorage.map((ele) => {
          console.log(ele.manch);
          return ele.manch;
        });
        const num = todayManch.length;
        const tot = todayManch.reduce((a, b) => a + b, 0);
        const percen = tot / num;
        setPercToday(percen);
      }

      return () => {
        setPercToday(0);
      };
    });
  }, []);

  setTimeout(() => {
    resetToMain();
  }, [2500]);

  return (
    <>
      <div>{percToday.toFixed(2)}</div>
    </>
  );
};

export default PercentageToday;
