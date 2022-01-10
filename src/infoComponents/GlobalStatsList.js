import React from "react";
import styles2 from "../css/info.module.scss";

const GlobalStatsList = ({ list, type }) => {
  const nameClass = `${type}`;
  console.log(nameClass);

  return (
    <div className={styles2.listDiv}>
      {list.map((ele, ind) => (
        <ul className={styles2.globalUl} key={ind}>
          <li className={styles2[type]}>
            {type === "values" ? `( ${ele} )` : `${ele}`}
            {type === "perc" ? "%" : ""}
            {type === "mods" ? " kn" : ""}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default GlobalStatsList;
