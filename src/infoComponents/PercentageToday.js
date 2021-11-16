import React, { useState, useEffect } from "react";
import { TimeStamp } from "../TimeStamp";
import styles2 from "../css/info.module.scss";
import { useTransition, animated } from "react-spring";

const PercentageToday = ({ resetToMain }) => {
  const [percToday, setPercToday] = useState(0);

  const dateToday = `${TimeStamp().month}.${TimeStamp().day}`;
  const storage = { ...localStorage };

  const retrivedDates = Object.keys(storage);

  const transitions = useTransition(percToday, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 300,
  });

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
  }, [5000]);

  const reset = () => {
    resetToMain();
  };

  const percFix = (perc) => {
    let perc2 = perc.toFixed(2);
    let stringPerc = toString(perc2);
    console.log(perc);
    if (stringPerc[-1] === "0") {
      stringPerc.pop();
      return stringPerc;
    } else {
      return perc2;
    }
  };

  return transitions((style, item) => (
    <animated.div onClick={reset} className={styles2.percToday} style={style}>
      <div>{percFix(percToday)}</div>
    </animated.div>
  ));
  // <div onClick={reset} className={styles2.percToday}>
  //   <div>{percFix(percToday)}</div>
  // </div>
};

export default PercentageToday;
