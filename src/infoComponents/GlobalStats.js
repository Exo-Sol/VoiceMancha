import React, { useState, useEffect } from "react";
import styles2 from "../css/info.module.scss";
import GlobalStatsList from "./GlobalStatsList";
// add animation later
import { useTransition, animated } from "react-spring";
import { useSwipeable, config } from "react-swipeable";

import getModeManch from "../data/getModeManch";

const GlobalStats = ({ resetToMain }) => {
  const [display, setDisplay] = useState("Total");

  ///////////////////////////////////////////////////////////////
  const transitions = useTransition(display, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 100,
  });
  ///////////////////////////////////////////////////////////////////////

  const { manchaMods, manchaPerc, numAll, totalManch, manchaValues, mothObj } =
    getModeManch(display);

  let relevantMonths = [];

  console.log(mothObj);

  for (const [key, value] of Object.entries(mothObj)) {
    if (value.length !== 0) {
      relevantMonths.push(key);
    }
  }

  console.log(relevantMonths);

  ///////////////////////////////////////////swipe///////////
  ///////////////////////////////////////////////////////////

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => displayFwd(),
    ...config,
    onSwipedRight: (eventData) => displayBack(),
    ...config,
  });

  const displayFwd = () => {
    if (display === "Total") {
      setDisplay(() => relevantMonths[0]);
    } else if (display !== relevantMonths[relevantMonths.length - 1]) {
      relevantMonths.forEach((ele, ind) => {
        if (display === ele) {
          setDisplay(() => relevantMonths[ind + 1]);
        }
      });
    } else {
      setDisplay(() => "Total");
    }
  };

  const displayBack = () => {
    if (display === "Total") {
      setDisplay(() => relevantMonths[relevantMonths.length - 1]);
    } else if (display !== relevantMonths[0]) {
      relevantMonths.forEach((ele, ind) => {
        if (display === ele) {
          setDisplay(() => relevantMonths[ind - 1]);
        }
      });
    } else {
      setDisplay(() => "Total");
    }
  };

  /////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  const reset = () => {
    resetToMain();
  };

  console.log(mothObj);

  const percAllManch1 = parseFloat((totalManch / numAll).toFixed(2));
  const percAllManch = Math.round((percAllManch1 + Number.EPSILON) * 100) / 100;

  return transitions((style, item) => (
    <animated.div className={styles2.globalDiv} {...handlers} style={style}>
      <h2 className={styles2.globalTitle}>
        {display}
        {display === "Total" ? "" : " mj"}
      </h2>

      <h4 id={styles2.allManch}>
        {`Mancha : `}
        {`${totalManch}`}
      </h4>
      <h4 id={styles2.allDilivered}>{`broj dostava : ${numAll}`}</h4>
      <h4 id={styles2.allPerc}>{`prosijek  : ${percAllManch}`}</h4>
      <div className={styles2.globaUlWrapper}>
        <GlobalStatsList list={manchaMods} type="mods" />
        <GlobalStatsList list={manchaPerc} type="perc" />
        <GlobalStatsList list={manchaValues} type="values" />
      </div>
      <button
        className={styles2.backButt}
        id={styles2.backButton}
        onClick={reset}
      >
        back
      </button>
    </animated.div>
  ));
};

export default GlobalStats;
