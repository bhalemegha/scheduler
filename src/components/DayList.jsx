import React from "react";
import DayListItem from "./DayListItem";
export default function DayList(props) {

  const days = props.days.map((day) => {
    if (props.day === day.name) {
      return <DayListItem key={day.id} setDay={props.setDay} {...day} selected />
    }
    return <DayListItem key={day.id} setDay={props.setDay} {...day} />
  });
  return (
    <ul>
      {days}
    </ul>
  );
}