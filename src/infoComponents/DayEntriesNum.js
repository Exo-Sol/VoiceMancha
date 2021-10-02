import React, { useState, useEffect } from "react";
import { TimeStamp } from "../TimeStamp";
import styles2 from "../css/info.module.scss";

const DayEntriesNum = ({ resetToMain }) => {
  const dateToday = `${TimeStamp().month}.${TimeStamp().day}`;
  const storage = { ...localStorage };

  const retrivedDates = Object.keys(storage);

  const [countNum, setCountNum] = useState(0);

  useEffect(() => {
    retrivedDates.forEach((e) => {
      if (e === dateToday) {
        let parsedStorage = JSON.parse(storage[e]);

        parsedStorage.forEach((ele) => {
          setCountNum((countNum) => countNum + 1);
        });
      }

      return () => {
        setCountNum(0);
      };
    });
  }, []);

  setTimeout(() => {
    resetToMain();
  }, [2500]);

  return <div className={styles2.percToday}>{countNum}</div>;
};

export default DayEntriesNum;
