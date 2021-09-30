import React, { useState, useEffect } from "react";
import { TimeStamp } from "../TimeStamp";
import { useSwipeable, config } from "react-swipeable";
import { Bar } from "react-chartjs-2";
import styles2 from "../css/info.module.scss";

import swipe from "../icons/swipe.png";

//"mjesečni prikaz"
const MonthlyDisplay = ({ resetToMain }) => {
  const [dateManchObj, setDateManchObj] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => TimeStamp().month);

  const handlers = useSwipeable({
    onSwipedRight: (eventData) =>
      setSelectedMonth(() => monthFwd(selectedMonth, eventData)),
    ...config,
    onSwipedLeft: (eventData) =>
      setSelectedMonth(() => monthBack(selectedMonth, eventData)),
    ...config,
  });

  const monthFwd = (month, eventData) => {
    if (month === 12) {
      return 1;
    } else return month + 1;
  };

  const monthBack = (month, eventData) => {
    if (month === 1) {
      return 12;
    } else return month - 1;
  };

  const storage = { ...localStorage };
  const retrivedDates = Object.keys(storage);

  useEffect(() => {
    retrivedDates.forEach((e) => {
      let parsedStorage = JSON.parse(storage[e]);
      console.log(parsedStorage);

      const todayManch = parsedStorage.map((ele) => {
        if (ele.timeObj.month === selectedMonth) {
          return ele.manch;
        }
      });
      const tot = todayManch.reduce((a, b) => a + b, 0);
      const month = parseInt(e.split(".")[0]);
      const day = parseInt(e.split(".")[1]);
      setDateManchObj((prev) => [...prev, [{ day, month }, tot]]);
    });
    return () => {
      setDateManchObj([]);
    };
  }, [selectedMonth]);

  const chartData = {
    labels: dateManchObj
      .slice(0)
      .reverse()
      .map((e) => {
        return `${e[0].day}.`;
      }),
    datasets: [
      {
        label: "KN",
        data: dateManchObj
          .slice(0)
          .reverse()
          .map((e) => {
            return e[1];
          }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles2.main}>
      <h1>hellou</h1>

      <Bar data={chartData} height={"200px"} />
      <div>
        <h2 {...handlers}>
          <div id={styles2.block}>
            <p className={styles2.swipeArrows1}>{`<`}</p>
            <p className={styles2.swipeArrows2}>{`<`}</p>
            <p id={styles2.month}>{` \t ${selectedMonth}`}</p>
            <p className={styles2.swipeArrows2}>{`>`}</p>
            <p className={styles2.swipeArrows1}>{`>`}</p>
          </div>

          <img id={styles2.swipeIcon} src={swipe} alt="swipe" />
        </h2>
      </div>
      <button className={styles2.backButt} onClick={resetToMain}>
        back
      </button>
    </div>
  );
};

export default MonthlyDisplay;
