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
  const [sumPerc, setSumPerc] = useState(true);

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) =>
      setSelectedMonth(() => monthFwd(selectedMonth, eventData)),
    ...config,
    onSwipedRight: (eventData) =>
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
  const retrivedDatesUnsorted = Object.keys(storage);
  console.log(retrivedDatesUnsorted);
  
  // sort by days of month , all moths, so when we seperate specific moth all days are in order
  const retrivedDates = retrivedDatesUnsorted.sort(
    (a, b) => a.split(".")[1] - b.split(".")[1]
  );
  console.log(retrivedDates);

  // split(".")[1]

  const changeBar = () => {
    setSumPerc(!sumPerc);
  };

  useEffect(() => {
    retrivedDates.forEach((e) => {
      let parsedStorage = JSON.parse(storage[e]);
      console.log(parsedStorage);

      const todayManch = parsedStorage.map((ele) => {
        if (ele.timeObj.month === selectedMonth) {
          return ele.manch;
        }
      });
      if (parsedStorage[0].timeObj.month === selectedMonth) {
        const tot = todayManch.reduce((a, b) => a + b, 0);
        const num = todayManch.length;

        const percen = tot / num;
        const month = parseInt(e.split(".")[0]);
        const day = parseInt(e.split(".")[1]);
        // change display from sum to percent
        if (sumPerc) {
          setDateManchObj((prev) => [...prev, [{ day, month }, tot]]);
        } else {
          setDateManchObj((prev) => [...prev, [{ day, month }, percen]]);
        }
      }
    });
    return () => {
      setDateManchObj([]);
    };
  }, [selectedMonth, sumPerc]);

  const chartData = {
    labels: dateManchObj.map((e) => {
      return `${e[0].day}.`;
    }),
    datasets: [
      {
        label: "KN",
        data: dateManchObj.map((e) => {
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
      <h3 style={{ paddingTop: "30px" }}>Mjesečni prikaz</h3>

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
      <button
        className={styles2.backButt}
        id={styles2.percButton}
        onClick={changeBar}
      >
        {sumPerc ? "∑" : "%"}
      </button>
    </div>
  );
};

export default MonthlyDisplay;
