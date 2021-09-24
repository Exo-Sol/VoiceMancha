import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";
import { TimeStamp } from "./TimeStamp";

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

  const record = () => {
    SpeechRecognition.startListening({ language: "hr_HR" });
    setTimeout(() => {
      // if (!isNaN(parseInt(transcript))) {
      //   setMancha((prev) => [...prev, transcript]);
      // }
      SpeechRecognition.stopListening();
    }, 3000);
  };

  const clear = () => {
    setMancha(() => []);
  };

  const editIt = () => {
    setEdit(() => !edit);
  };

  const deleteEntry = (id) => {
    const newManchList = mancha.filter((item) => item.id !== id);
    // to delete last entry of the day

    seIdToDelete(id);
    setMancha(newManchList);
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

  // problem because it fires at inital render splved with useEffect that changes state called initial render
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
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={record}>Start</button>
      <button onClick={clear}>Clear</button>
      <button onClick={editIt}>Edit</button>

      <p>{transcript}</p>

      <div>
        <ul>
          {mancha.map((e) => (
            <li key={e.id}>
              {e.manch}{" "}
              {edit && <button onClick={() => deleteEntry(e.id)}>x</button>}
            </li>
          ))}
        </ul>
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
