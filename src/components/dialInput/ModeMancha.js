import React from "react";
import manchaMods from "../../data/getModeManch";
import styles from "../../css/main.module.scss";

const ModeMancha = () => {
  console.log(manchaMods);
  return (
    <div className={styles.micAndTranscript}>
      {manchaMods.map((ele) => (
        <button>{ele}</button>
      ))}
    </div>
  );
};

export default ModeMancha;
