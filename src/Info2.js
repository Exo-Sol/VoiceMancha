import React, { useState, useEffect } from "react";
import PercentageToday from "./infoComponents/PercentageToday";
import MonthlyDisplay from "./infoComponents/MonthlyDisplay";
import DayEntriesNum from "./infoComponents/DayEntriesNum";
import ListOfCommands from "./infoComponents/ListOfCommands";
import About from "./infoComponents/About";
// import styles from "./css/info.module.scss";

// "mjesečni prikaz",
//     "prosjek danas",
//     "info",
//   " glasovne naredbe",
//     "prosjek petak",
//     "prosjek subota",
//     "broj dostava",
//     "prosjek nedilja",
//     "prosjek ponediljak",
//     "prosjek utorak",
//     "prosjek srijeda",
//     "prosjek četvrtak",

const Info2 = ({ command, resetToMain, redirect }) => {
  const [changeInfo, setChangeInfo] = useState(<></>);

  // const storage = { ...localStorage };
  // console.log(localStorage);

  // for (const data in storage) {
  //   console.log(`${data}: ${storage[data]}`);
  // }

  const renderSwitch = (com) => {
    switch (com) {
      case "prosjek danas":
        return setChangeInfo(<PercentageToday resetToMain={resetToMain} />);

      case "mjesečni prikaz":
        return setChangeInfo(<MonthlyDisplay resetToMain={resetToMain} />);
      case "broj dostava":
        return setChangeInfo(<DayEntriesNum resetToMain={resetToMain} />);
      case "glasovne naredbe":
        return setChangeInfo(
          <ListOfCommands resetToMain={resetToMain} redirect={redirect} />
        );
      case "info":
        return setChangeInfo(<About resetToMain={resetToMain} />);
      default:
        return setChangeInfo(<></>);
    }
  };

  useEffect(() => {
    renderSwitch(command);
  }, []);

  return <div>{changeInfo}</div>;
};

export default Info2;
