import React from "react";
import DayListItem from "./DayListItem";
export default function DayList(props) {
  const days = props.days.map((day) => {
      return <DayListItem key={day.id} setDay={() => props.setDay(day.name)} {...day} selected = {props.day === day.name} />
  });
  return (
    <ul>
      {days}
    </ul>
  );
}
