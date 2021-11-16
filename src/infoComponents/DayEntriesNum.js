import React, { useState, useEffect } from "react";
import { TimeStamp } from "../TimeStamp";
import styles2 from "../css/info.module.scss";
import { useTransition, animated } from "react-spring";

const DayEntriesNum = ({ resetToMain }) => {
  const dateToday = `${TimeStamp().month}.${TimeStamp().day}`;
  const storage = { ...localStorage };

  const retrivedDates = Object.keys(storage);

  const [countNum, setCountNum] = useState(0);

  const transitions = useTransition(countNum, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 300,
  });

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
  }, [5000]);

  const reset = () => {
    resetToMain();
  };

  return transitions((style, item) => (
    <animated.div onClick={reset} className={styles2.percToday} style={style}>
      <div> {countNum}</div>
    </animated.div>
  ));
  // <div onClick={reset} className={styles2.percToday}>
  //   {countNum}
  // </div>
};

export default DayEntriesNum;
