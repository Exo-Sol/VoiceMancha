import React, { useState } from "react";
import styles2 from "../css/info.module.scss";
import GlobalStatsList from "./GlobalStatsList";
// add animation later
import { useTransition, animated } from "react-spring";

import {
  manchaMods,
  manchaPerc,
  numAll,
  totalManch,
  manchaValues,
  mothObj,
} from "../data/getModeManch";

const GlobalStats = ({ resetToMain }) => {
  const [display, setDisplay] = useState("Total");

  const reset = () => {
    resetToMain();
  };

  console.log(mothObj);

  const percAllManch1 = parseFloat((totalManch / numAll).toFixed(2));
  const percAllManch = Math.round((percAllManch1 + Number.EPSILON) * 100) / 100;

  return (
    <div className={styles2.globalDiv}>
      <h2 className={styles2.globalTitle}>Total</h2>

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
    </div>
  );
};

export default GlobalStats;
