import React from "react";
import DayListItem from "./DayListItem";
export default function DayList(props) {
  const days = [];
  // const {setDay} = props;
  // alert(props.setDay);
  for (const day in props.days) {
    days.push(<DayListItem key={props.days[day].id} setDay = {props.setDay} {...props.days[day]}/>);
  }
    return (
    <ul>
      {days}
    </ul>
  );
}