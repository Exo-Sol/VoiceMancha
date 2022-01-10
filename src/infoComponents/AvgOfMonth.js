import React, { useState, useEffect } from "react";
import { TimeStamp } from "../TimeStamp";
import getModeManch from "../data/getModeManch";
import styles2 from "../css/info.module.scss";

const AvgOfMonth = ({ percFix }) => {
  const [percOfMonth, setpercOfMonth] = useState(0);
  const { mothObj } = getModeManch();

  useEffect(() => {
    const month = TimeStamp().month;
    const monthManch = mothObj[month];
    const num = monthManch.length;
    const tot = monthManch.reduce((a, b) => a + b, 0);
    const percen = tot / num;
    setpercOfMonth(percen);
    return () => {
      setpercOfMonth(0);
    };
  }, []);

  return (
    <div className={styles2.weekDayPerc}>{`this month : ${percFix(
      percOfMonth
    )}`}</div>
  );
};

export default AvgOfMonth;
