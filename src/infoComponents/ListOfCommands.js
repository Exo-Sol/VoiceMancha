import React from "react";
import styles2 from "../css/info.module.scss";

const ListOfCommands = ({ redirect }) => {
  const list = ["mjesečni prikaz", "prosjek danas", "info", "broj dostava"];

  return (
    <div id={styles2.ulDiv}>
      <ul id={styles2.trueUl}>
        {list.map((ele, ind) => {
          return (
            // it needs to acess component of that command
            <li onClick={(ele) => redirect(ele)} key={ind}>
              {ele}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListOfCommands;
