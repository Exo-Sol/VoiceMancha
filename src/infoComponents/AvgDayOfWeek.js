import React, { useState, useEffect } from "react";
import { TimeStamp } from "../TimeStamp";
import getModeManch from "../data/getModeManch";
import styles2 from "../css/info.module.scss";

const AvgDayOfWeek = ({ percFix }) => {
  const [percWeekDay, setPercWeekDay] = useState(0);
  const { dayOfWeekObj } = getModeManch();

  useEffect(() => {
    const weekDay = TimeStamp().weekDay;
    const weekDayManch = dayOfWeekObj[weekDay];
    const num = weekDayManch.length;
    const tot = weekDayManch.reduce((a, b) => a + b, 0);
    const percen = tot / num;
    setPercWeekDay(percen);
    return () => {
      setPercWeekDay(0);
    };
  }, []);

  return (
    <div className={styles2.weekDayPerc}>{`all ${
      TimeStamp().weekDay
    } : ${percFix(percWeekDay)}`}</div>
  );
};

export default AvgDayOfWeek;
