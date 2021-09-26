import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";
import { TimeStamp } from "./TimeStamp";

import styles from "./css/main.module.scss";
import blackMic from "./icons/mic-black.png";
import whiteMic from "./icons/mic-white.png";
import clear from "./icons/clear.png";

import BarChart from "./components/Bar";
import Total from "./components/Total";
import List from "./components/List";

const Dictaphone = () => {
  const pullData = () => {
    if (localStorage.getItem(todayDate)) {
      return JSON.parse(localStorage.getItem(todayDate));
    } else {
      return [];
    }
  };

  const [todayDate, setTodayDate] = useState(
    () => `${TimeStamp().month}.${TimeStamp().day}`
  );
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [mancha, setMancha] = useState(() => pullData());
  const [edit, setEdit] = useState(false);
  const [idToDelete, seIdToDelete] = useState(null);
  const [initialRender, setInitialRender] = useState(() => true);
  const [mainDisplay, setMainDisplay] = useState(0);

  const record = () => {
    SpeechRecognition.startListening({ language: "hr_HR" });
    setTimeout(() => {
      // if (!isNaN(parseInt(transcript))) {
      //   setMancha((prev) => [...prev, transcript]);
      // }
      SpeechRecognition.stopListening();
      resetTranscript();
    }, 3000);
  };

  const editIt = () => {
    setEdit(() => !edit);
    setMainDisplay(2);
  };

  const deleteEntry = (id) => {
    const newManchList = mancha.filter((item) => item.id !== id);
    // to delete last entry of the day

    seIdToDelete(id);
    setMancha(newManchList);
  };

  const changeMainDisply = () => {
    if (mainDisplay === 2) {
      setMainDisplay(0);
    } else {
      setMainDisplay(mainDisplay + 1);
    }
    setEdit(false);
  };

  const renderSwitch = (mainDis) => {
    switch (mainDis) {
      case 0:
        return <Total mancha={mancha} />;
      case 1:
        return <BarChart mancha={mancha} />;
      case 2:
        return <List mancha={mancha} edit={edit} deleteEntry={deleteEntry} />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    const num = [
      "nula",
      "jedan",
      "dva",
      "tri",
      "četiri",
      "pet",
      "šest",
      "sedam",
      "osam",
      "devet",
    ];
    if (!isNaN(parseInt(transcript))) {
      setMancha((prev) => [
        ...prev,
        {
          manch: transcript,
          timeObj: TimeStamp(),
          id: new Date().getTime(),
        },
      ]);
    } else if (num.includes(transcript)) {
      let x = num.indexOf(transcript);
      setMancha((prev) => [
        ...prev,
        {
          manch: x,
          timeObj: TimeStamp(),
          id: new Date().getTime(),
        },
      ]);
    }
    return () => {};
  }, [listening]);

  // saving to local storage when ui changes

  // problem because it fires at inital render solved with useEffect that changes state called initial render
  useEffect(() => {
    if (mancha.at(-1) && !initialRender) {
      let month = mancha.at(-1).timeObj.month;
      let day = mancha.at(-1).timeObj.day;

      const monthDay = `${month}.${day}`;

      if (localStorage.getItem(monthDay)) {
        let pullStorage = JSON.parse(localStorage.getItem(monthDay));

        // if you edited entries

        if (idToDelete) {
          let newArr = pullStorage.filter((item) => item.id !== idToDelete);
          seIdToDelete(null);

          localStorage.setItem(monthDay, JSON.stringify(newArr));
        } else {
          let merge = [...pullStorage, mancha.at(-1)];
          localStorage.setItem(monthDay, JSON.stringify(merge));
        }
      } else {
        localStorage.setItem(monthDay, JSON.stringify(mancha));
      }
    } else {
      if (idToDelete) {
        console.log("amo vise");
        localStorage.removeItem(todayDate);
      }
    }
    seIdToDelete(null);
  }, [mancha]);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  return (
    <div className={listening ? styles.mainDivRec : styles.mainDiv}>
      <>
        <div className={styles.micAndTranscript}>
          <p className={styles.micIndi}>
            Microphone: {listening ? "on" : "off"}
          </p>
          <p id={styles.transcript}>{transcript ? transcript : "$$"}</p>
        </div>
      </>

      <div className={styles.manchaList} onClick={changeMainDisply}>
        {renderSwitch(mainDisplay)}
      </div>
      <div className={styles.buttonsCont}>
        <img
          src={listening ? whiteMic : blackMic}
          alt="Mic"
          onClick={record}
          className={styles.button}
        ></img>

        {listening ? (
          <div className={styles.button}></div>
        ) : (
          <img
            src={clear}
            alt="clear"
            onClick={editIt}
            className={styles.button}
            style={{ opacity: "0.8" }}
          ></img>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Dictaphone />
    </div>
  );
}

export default App;
