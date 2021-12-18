import React from "react";
import manchaMods from "../../data/getModeManch";
import styles from "../../css/main.module.scss";

const ModeMancha = ({ saveDialInput }) => {
  console.log(manchaMods);

  const clickedMod = (e) => {
    console.log(e);
    saveDialInput(e);
  };

  return (
    <div>
      {manchaMods.map((ele) => (
        <button
          className={styles.manchaModButtons}
          onClick={() => clickedMod(ele)}
        >
          {ele}
        </button>
      ))}
    </div>
  );
};

export default ModeMancha;
