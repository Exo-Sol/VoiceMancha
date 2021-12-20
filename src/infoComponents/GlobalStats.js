import React from "react";
import styles2 from "../css/info.module.scss";

import {
  manchaMods,
  manchaPerc,
  numAll,
  totalManch,
  manchaValues,
  mothObj,
} from "../data/getModeManch";

const GlobalStats = ({ resetToMain }) => {
  const reset = () => {
    resetToMain();
  };
  console.log(mothObj);

  const percAllManch1 = parseFloat((totalManch / numAll).toFixed(2));
  const percAllManch = Math.round((percAllManch1 + Number.EPSILON) * 100) / 100;

  return (
    <div onClick={reset}>
      <h3>{`Ukupan broj dostava : ${numAll}`}</h3>
      <h3>{`Ukupno manche : ${totalManch}`}</h3>
      <h3>{`Ukupni prosijek  : ${percAllManch}`}</h3>
      <div>
        {manchaMods.map((ele, ind) => (
          <ul>
            <li>
              <p>{`${ele} - ${manchaPerc[ind]}% `}</p>
              <p>{`Ukupno dobivenih - ${manchaValues[ind]}`}</p>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default GlobalStats;
