import React, { useState } from "react";
import { manchaMods, manchaPerc } from "../../data/getModeManch";
import styles from "../../css/main.module.scss";

const ModeMancha = ({ saveDialInput }) => {
  console.log(manchaMods);

  const [show, setShow] = useState(false);

  const clickedMod = (e) => {
    console.log(e);
    saveDialInput(e);
  };

  const showPerc = () => {
    setShow(!show);
  };
  const hidePerc = () => {
    setShow(!show);
  };

  return (
    <div>
      {manchaMods.map((ele, ind) => (
        <div className={styles.modPercDiv}>
          <button
            className={styles.manchaModButtons}
            onClick={() => clickedMod(ele)}
          >
            {ele}
            {show && (
              <div className={styles.percMod}>{`${manchaPerc[ind]}%`}</div>
            )}
          </button>
        </div>
      ))}
      <button
        className={styles.manchaModButtons}
        id={show ? styles.percentageButton1 : styles.percentageButton}
        onClick={showPerc}
      ></button>
    </div>
  );
};

export default ModeMancha;
