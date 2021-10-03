import React from "react";
import logo from "../icons/logo.png";
import styles2 from "../css/info.module.scss";

const About = ({ resetToMain }) => {
  //   setTimeout(() => {
  //     resetToMain();
  //   }, [4000]);
  return (
    <div onClick={() => resetToMain()} className={styles2.logoDiv}>
      <div>
        <img className={styles2.logo} src={logo} alt="" />
      </div>

      <div className={styles2.info}>
        <h4>"Mancha" </h4>
        <h4> app Version Beta 1.0.0</h4>
        <h4>by Exo</h4>
      </div>
    </div>
  );
};

export default About;
