import React from "react";
import styles from "../css/main.module.scss";

const List = ({ mancha, edit, deleteEntry }) => {
  const styleP = { display: "inline" };

  const calcTotal = () => {
    const manche = mancha.map((e) => {
      return parseInt(e.manch);
    });
    if (manche[0]) {
      const reducer = (prev, cur) => prev + cur;
      const tot = manche.reduce(reducer);
      return tot;
    } else return 0;
  };

  const zeroNum = (num) => {
    if (num < 10) {
      return `0${num}`;
    } else return num;
  };

  return (
    <ul>
      {mancha.map((e, i) => (
        <li key={e.id}>
          <div>
            <p className={styles.listP} style={styleP} id={styles.num}>{`${
              i + 1
            }.`}</p>
            {` ${e.manch}`}
            <p className={styles.listP} style={styleP} id={styles.timeInfo}>{`${
              e.timeObj.hour
            }:${zeroNum(e.timeObj.minutes)}`}</p>
          </div>

          {edit && (
            <button
              className={styles.delButton}
              onClick={(eve) => {
                deleteEntry(e.id);
                eve.stopPropagation();
              }}
            >
              x
            </button>
          )}
        </li>
      ))}
      <p
        style={{
          color: "brown",
          opacity: "0.6",
          fontSize: "0.9em",
          paddingLeft: "10px",
        }}
      >{`Total : ${calcTotal()}`}</p>
    </ul>
  );
};

export default List;
