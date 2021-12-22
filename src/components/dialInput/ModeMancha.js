import React, { useState } from "react";
import getModeManch from "../../data/getModeManch";
import styles from "../../css/main.module.scss";

const ModeMancha = ({ saveDialInput }) => {
  const { manchaMods } = getModeManch();

  const [show, setShow] = useState(false);

  const clickedMod = (e) => {
    console.log(e);
    saveDialInput(e);
  };

  const showPerc = () => {
    setShow(!show);
  };

  return (
    <div>
      {manchaMods.map((ele, ind) => (
        <div className={styles.modPercDiv} key={ind}>
          <button
            className={styles.manchaModButtons}
            onClick={() => clickedMod(ele)}
          >
            {ele}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ModeMancha;
