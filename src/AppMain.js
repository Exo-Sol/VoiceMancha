import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useTransition, animated } from "react-spring";

import { useState, useEffect } from "react";
import { TimeStamp } from "./TimeStamp";

import styles from "./css/main.module.scss";

import blackMic from "./icons/mic-black.png";
import whiteMic from "./icons/mic-white.png";
import clear from "./icons/clear.png";
import menu from "./icons/menu.png";
import dial from "./icons/dial.png";

import BarChart from "./components/Bar";
import Total from "./components/Total";
import List from "./components/List";

import DialInput from "./components/dialInput/DialInput";
import ModeMancha from "./components/dialInput/ModeMancha";

const AppMain = ({ voiceCommands }) => {
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
  const [mainDisplay, setMainDisplay] = useState(() => 0);
  const [dialInput, setDialInput] = useState(false);

  const transitions = useTransition(mainDisplay, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
  });

  const transition2 = useTransition(listening, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
  });

  const record = () => {
    setDialInput(false);
    SpeechRecognition.startListening({ language: "hr_HR" });
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

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const dialFunc = () => {
    setDialInput(!dialInput);
  };

  const saveDialInput = (num) => {
    if (!isNaN(parseInt(num))) {
      setMancha((prev) => [
        ...prev,
        {
          manch: parseInt(num),
          timeObj: TimeStamp(),
          id: new Date().getTime(),
        },
      ]);
    }
  };

  //////////////////////////////////////////////////////////////////
  /////////////Listening for input or command //////////////////////

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

    voiceCommands(transcript);
    console.log(
      "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    );

    if (!isNaN(parseInt(transcript))) {
      setMancha((prev) => [
        ...prev,
        {
          manch: parseInt(transcript),
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

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={listening ? styles.mainDivRec : styles.mainDiv}>
      <>
        <div className={styles.micAndTranscript}>
          {dialInput ? (
            <ModeMancha />
          ) : (
            <p className={styles.micIndi}>
              Microphone: {listening ? "on" : "off"}
            </p>
          )}

          {dialInput ? (
            <DialInput saveDialInput={saveDialInput} />
          ) : (
            <p id={styles.transcript}>{transcript ? transcript : "$  $"}</p>
          )}
        </div>
      </>

      {transitions((style, item) => (
        <animated.div
          className={styles.manchaList}
          onClick={changeMainDisply}
          style={style}
        >
          {renderSwitch(mainDisplay)}
        </animated.div>
      ))}

      {transition2((style, item) => (
        <animated.div className={styles.buttonsCont} style={style}>
          <div className="inputButtons">
            <img
              src={listening ? whiteMic : blackMic}
              alt="Mic"
              onClick={record}
              className={styles.button}
            ></img>{" "}
            {!listening && (
              <img
                src={dial}
                alt="enterNum"
                onClick={dialFunc}
                className={styles.button}
                id={styles.dial}
              />
            )}
          </div>

          <div className="deleteAndMenu">
            <img
              src={clear}
              alt="clear"
              onClick={listening ? stopListening : editIt}
              className={styles.button}
              style={{ opacity: "0.8" }}
            ></img>{" "}
            {!listening && (
              <img
                src={menu}
                onClick={() => voiceCommands("glasovne naredbe")}
                alt="menu"
                className={styles.button}
                style={{ opacity: "0.8" }}
              />
            )}
          </div>
        </animated.div>
      ))}
    </div>
  );
};

export default AppMain;
