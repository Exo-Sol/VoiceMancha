import React from "react";
import PercentageToday from "./infoComponents/PercentageToday";
import MonthlyDisplay from "./infoComponents/MonthlyDisplay";
import DayEntriesNum from "./infoComponents/DayEntriesNum";
import ListOfCommands from "./infoComponents/ListOfCommands";
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

const Info = ({ command, resetToMain }) => {
  // const storage = { ...localStorage };
  // console.log(localStorage);

  // for (const data in storage) {
  //   console.log(`${data}: ${storage[data]}`);
  // }
  const redirect = (ele) => {
    console.log("redirect");
    renderSwitch(ele);
  };

  const renderSwitch = (com) => {
    switch (com) {
      case "prosjek danas":
        return <PercentageToday resetToMain={resetToMain} />;

      case "mjesečni prikaz":
        return <MonthlyDisplay resetToMain={resetToMain} />;
      case "broj dostava":
        return <DayEntriesNum resetToMain={resetToMain} />;
      case "glasovne naredbe":
        return <ListOfCommands resetToMain={resetToMain} redirect={redirect} />;
      default:
        return <></>;
    }
  };

  return <div>{renderSwitch(command)}</div>;
};

export default Info;
