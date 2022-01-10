import React, { useState, useEffect } from "react";
import styles2 from "../css/info.module.scss";
import { useTransition, animated } from "react-spring";

const ListOfCommands = ({ redirect }) => {
  const list = [
    "mjesečni prikaz",
    "prosjek",
    "info",
    "broj dostava",
    "globalna statistika",
  ];
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

  return transitions((style, item) => (
    <animated.div id={styles2.ulDiv} style={style}>
      <ul className={styles2.commandsUl} id={styles2.trueUl}>
        {list.map((ele, ind) => {
          return (
            // it needs to acess component of that command
            <li
              className={styles2.trueLi}
              onClick={() => redirect(ele)}
              key={ind}
            >
              {ele}
            </li>
          );
        })}
      </ul>
    </animated.div>
  ));
  // <div id={styles2.ulDiv}>
  //   <ul id={styles2.trueUl}>
  //     {list.map((ele, ind) => {
  //       return (
  //         // it needs to acess component of that command
  //         <li onClick={() => redirect(ele)} key={ind}>
  //           {ele}
  //         </li>
  //       );
  //     })}
  //   </ul>
  // </div>
};

export default ListOfCommands;
