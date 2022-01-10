import React, { useState, useEffect } from "react";
import AppMain from "./AppMain";
import Info from "./Info";
import Info2 from "./Info2";

function App() {
  const [command, setCommand] = useState("");
  const [commandFromList, setCommandFromList] = useState("");
  const commands = [
    "mjesečni prikaz",
    "prosjek",
    "info",
    "broj dostava",
    "glasovne naredbe",
    "prosjek po danima",
    "globalna statistika",
    // "prosjek petak",
    // "prosjek subota",
    // "prosjek nedilja",
    // "prosjek ponediljak",
    // "prosjek utorak",
    // "prosjek srijeda",
    // "prosjek četvrtak",
  ];

  const voiceCommands = (transcript) => {
    commands.forEach((e) => {
      if (e === transcript) {
        setCommand(e);
      }
    });
  };

  const redirect = (ele) => {
    setCommand("");
    setCommandFromList(ele);
  };

  const resetToMain = () => {
    setCommand("");
    setCommandFromList("");
  };

  return (
    <div className="App">
      {command ? (
        <Info command={command} redirect={redirect} resetToMain={resetToMain} />
      ) : commandFromList ? (
        <Info2
          command={commandFromList}
          redirect={redirect}
          resetToMain={resetToMain}
        />
      ) : (
        <AppMain voiceCommands={voiceCommands} />
      )}
    </div>
  );
}

export default App;
