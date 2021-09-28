import React, { useState, useEffect } from "react";

const MonthlyDisplay = ({ resetToMain }) => {
  const [dateManchObj, setDateManchObj] = useState([]);

  const storage = { ...localStorage };
  const retrivedDates = Object.keys(storage);

  useEffect(() => {
    retrivedDates.forEach((e) => {
      let parsedStorage = JSON.parse(storage[e]);
      const todayManch = parsedStorage.map((ele) => {
        console.log(ele.manch);
        return ele.manch;
      });
      const tot = todayManch.reduce((a, b) => a + b, 0);
      setDateManchObj((prev) => [...prev, { e, tot }]);
    });
  }, []);

  return (
    <div>
      <h1>hello</h1>
      <button onClick={resetToMain}>back</button>
    </div>
  );
};

export default MonthlyDisplay;
