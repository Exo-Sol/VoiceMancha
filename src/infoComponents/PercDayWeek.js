import React, { useState, useEffect } from "react";
import { TimeStamp } from "../TimeStamp";
import { Bar } from "react-chartjs-2";
import styles2 from "../css/info.module.scss";

const PercDayWeek = () => {
  // const percent = function (t) {
  //   return t.total / t.num;
  // };

  const [percentage, setPercentage] = useState([]);
  const [manch, setManch] = useState(0);
  const [num, setNum] = useState(0);
  // const [weekDayManchArr, setWeekDayManchArr] = useState([
  //   {
  //     id: "Pon",
  //     total: 0,
  //     num: 0,
  //     perc: percent(this),
  //   },
  //   {
  //     id: "Uto",
  //     total: 0,
  //     num: 0,
  //     perc: percent(this),
  //   },
  //   {
  //     id: "Sri",
  //     total: 0,
  //     num: 0,
  //     perc: percent(this),
  //   },
  //   {
  //     id: "Cet",
  //     total: 0,
  //     num: 0,
  //     perc: percent(this),
  //   },
  //   {
  //     id: "Pet",
  //     total: 0,
  //     num: 0,
  //     perc: percent(this),
  //   },
  //   {
  //     id: "Sub",
  //     total: 0,
  //     num: 0,
  //     perc: percent(this),
  //   },
  //   {
  //     id: "Ned",
  //     total: 0,
  //     num: 0,
  //     perc: percent(this),
  //   },
  // ]);

  // ] {
  //   Pon: 0,
  //   Uto: 0,
  //   Sri: 0,
  //   Cet: 0,
  //   Pet: 0,
  //   Sub: 0,
  //   Ned: 0,
  // });
  const storage = { ...localStorage };
  const retrivedDates = Object.keys(storage);

  useEffect(() => {
    retrivedDates.forEach((e) => {
      // mancha tog datuma
      let parsedStorage = JSON.parse(storage[e]);
      console.log(parsedStorage);
      // za svaku manchu tog datuma
      parsedStorage.map((ele) => {
        setManch(manch + ele.manch);
        setNum(num + 1);
      });
      console.log(manch);
      console.log(num);
      setPercentage((prev) => [...prev, manch / num]);

      //       if (parsedStorage[0].timeObj.month === selectedMonth) {
      //         const tot = todayManch.reduce((a, b) => a + b, 0);
      //         const num = todayManch.length;
      //         const percen = tot / num;
      //         const month = parseInt(e.split(".")[0]);
      //         const day = parseInt(e.split(".")[1]);
      //         // change display from sum to percent
      //         if (sumPerc) {
      //           setDateManchObj((prev) => [...prev, [{ day, month }, tot]]);
      //         } else {
      //           setDateManchObj((prev) => [...prev, [{ day, month }, percen]]);
      //         }
      //       }

      //     return () => {
      //       setDateManchObj([]);
      //
    });
  }, []);

  return <div>hello</div>;
};
export default PercDayWeek;
