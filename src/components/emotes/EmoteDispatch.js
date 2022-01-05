import React, { useState } from "react";
import styles3 from "../../css/emote.module.scss";

const EmoteDispatch = ({ mancha, emoCue }) => {
  const storage = { ...localStorage };

  let allmanch = [];

  const retrivedDates = Object.keys(storage);

  /// last three zero situation

  const manche = mancha.map((e) => {
    return parseInt(e.manch);
  });

  if (manche.length >= 3) {
    var lastThree = manche.slice(-3);
    console.log(lastThree);
  }

  const lastThree0 = () => {
    if (lastThree) {
      if (lastThree[0] === 0 && lastThree[1] === 0 && lastThree[2] === 0) {
        emoCue(true);
        return "bad";
      } else {
        emoCue(false);
        return false;
      }
    } else return false;
  };

  // problem for autounmount or by clicking, need to return false

  return lastThree0() ? (
    <div className={styles3.emote}>{lastThree0()}</div>
  ) : (
    false
  );
};

export default EmoteDispatch;
