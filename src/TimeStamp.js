import React from "react";

export const TimeStamp = () => {
  const now = new Date();

  const calcWeekDay = (dayNum) => {
    const days = ["Ned", "Pon", "Uto", "Sri", "Cet", "Pet", "Sub"];

    return days[dayNum];
  };

  return {
    day: now.getDate(),
    month: now.getMonth() + 1,
    weekDay: calcWeekDay(now.getDay()),
    hour: now.getHours(),
    minutes: now.getMinutes(),
  };
};
