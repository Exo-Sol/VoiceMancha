import styles from "../css/main.module.scss";
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import React, { useState, useEffect } from "react";

const Total = ({ mancha }) => {
  const calcTotal = () => {
    const manche = mancha.map((e) => {
      return parseInt(e.manch);
    });
    if (manche[0] || manche[0] === 0) {
      const reducer = (prev, cur) => prev + cur;
      const tot = manche.reduce(reducer);
      if (tot <= 100) {
        return [tot, 0];
      } else {
        return [100, tot - 100];
      }
    } else {
      console.log(manche[0]);

      return [0, 0];
    }
  };

  // return <div id={styles.total}>{`${calcTotal()}`}</div>;
  return (
    <div className={styles.totDiv}>
      <CircularProgressbarWithChildren
        className={styles.progBar}
        value={calcTotal()[0]}
        text={`${calcTotal()[0] + calcTotal()[1]}`}
        strokeWidth={3}
        styles={{
          path: {
            // Path color
            stroke: `rgba(75,170,186, ${calcTotal()[0] / 100 + 0.2})`,
            transition: "stroke-dashoffset 1s",
          },
          trail: {
            // Trail color
            stroke: "#d6d6d6",
          },

          text: {
            // Text color
            fill: "#001427",
            fontFamily: "Comfortaa",
          },
        }}
      >
        <CircularProgressbar
          className={styles.progBar2}
          strokeWidth={2}
          value={calcTotal()[1]}
          styles={{
            path: {
              // Path color
              stroke: `rgba(30,56,119, ${calcTotal()[1] / 100 + 0.2})`,
              transition: "stroke-dashoffset 1s",
            },
            trail: {
              // Trail color
              stroke: "#d6d6d6",
            },

            text: {
              // Text color
              fill: "#001427",
              fontFamily: "Comfortaa",
            },
          }}
        ></CircularProgressbar>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Total;
