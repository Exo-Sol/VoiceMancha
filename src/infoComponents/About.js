import React, { useState, useEffect } from "react";
import logo from "../icons/manchaLogo.png";
import styles2 from "../css/info.module.scss";
import { useTransition, animated } from "react-spring";

const About = ({ resetToMain }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

  const transitions = useTransition(isLoaded, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 300,
  });
  //   setTimeout(() => {
  //     resetToMain();
  //   }, [4000]);
  return transitions((style, item) => (
    <animated.div
      onClick={() => resetToMain()}
      className={styles2.logoDiv}
      style={style}
    >
      <div>
        <img className={styles2.logo} src={logo} alt="" />
      </div>

      <div className={styles2.info}>
        <h4>"Mancha" </h4>
        <h4> app Version Beta 1.0.0</h4>
        <h4>by Exo</h4>
      </div>
    </animated.div>
  ));
  // <div onClick={() => resetToMain()} className={styles2.logoDiv}>
  //   <div>
  //     <img className={styles2.logo} src={logo} alt="" />
  //   </div>

  //   <div className={styles2.info}>
  //     <h4>"Mancha" </h4>
  //     <h4> app Version Beta 1.0.0</h4>
  //     <h4>by Exo</h4>
  //   </div>
  // </div>
};

export default About;
