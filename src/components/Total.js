import React from "react";
import styles from "../css/main.module.scss";

const Total = ({ mancha }) => {
  const calcTotal = () => {
    const manche = mancha.map((e) => {
      return parseInt(e.manch);
    });
    const reducer = (prev, cur) => prev + cur;
    return manche.reduce(reducer);
  };

  return <div id={styles.total}>{`${calcTotal()}`}</div>;
};

export default Total;
