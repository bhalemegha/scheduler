import React from "react";
import DayListItem from "./DayListItem";
export default function DayList(props) {
  const days = props.days.map((day) => {
      return <DayListItem key={day.id} onChange={() => props.onChange(day.name)} {...day} selected = {props.value === day.name} />
  });
  return (
    <ul>
      {days}
    </ul>
  );
}
