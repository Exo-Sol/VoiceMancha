import React from "react";
import styles from "../css/main.module.scss";

const List = ({ mancha, edit, deleteEntry }) => {
  const styleP = { display: "inline" };

  return (
    <ul>
      {mancha.map((e, i) => (
        <li key={e.id}>
          <div>
            <p style={styleP} id={styles.num}>{`${i + 1}.`}</p>
            {` ${e.manch}`}
            <p
              style={styleP}
              id={styles.timeInfo}
            >{`${e.timeObj.hour}:${e.timeObj.minutes}`}</p>
          </div>

          {edit && <button onClick={() => deleteEntry(e.id)}>x</button>}
        </li>
      ))}
    </ul>
  );
};

export default List;
