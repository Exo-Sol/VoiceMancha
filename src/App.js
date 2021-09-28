import React, { useState } from "react";
import AppMain from "./AppMain";
import Info from "./Info";

function App() {
  const [command, setCommand] = useState("");
  const commands = [
    "mjesečni prikaz",
    "prosjek danas",
    "info",
    "prosjek petak",
    "prosjek subota",
    "prosjek nedilja",
    "prosjek ponediljak",
    "prosjek utorak",
    "prosjek srijeda",
    "prosjek četvrtak",
  ];

  const voiceCommands = (transcript) => {
    commands.forEach((e) => {
      if (e === transcript) {
        setCommand(e);
      }
    });
  };

  const resetToMain = () => {
    setCommand("");
  };

  return (
    <div className="App">
      {command ? (
        <Info command={command} resetToMain={resetToMain} />
      ) : (
        <AppMain voiceCommands={voiceCommands} />
      )}
    </div>
  );
}

export default App;
