import React from "react";
import PercentageToday from "./infoComponents/PercentageToday";
// import styles from "./css/info.module.scss";

// "mjesečni prikaz",
//     "prosjek danas",
//     "info",
//     "prosjek petak",
//     "prosjek subota",
//     "prosjek nedilja",
//     "prosjek ponediljak",
//     "prosjek utorak",
//     "prosjek srijeda",
//     "prosjek četvrtak",

const Info = ({ command }) => {
  // const storage = { ...localStorage };
  // console.log(localStorage);

  // for (const data in storage) {
  //   console.log(`${data}: ${storage[data]}`);
  // }

  const renderSwitch = (com) => {
    switch (com) {
      case "prosjek danas":
        return <PercentageToday />;

      case 1:
        return <></>;
      case 2:
        return <></>;
      default:
        return <></>;
    }
  };

  return <div>{renderSwitch(command)}</div>;
};

export default Info;
