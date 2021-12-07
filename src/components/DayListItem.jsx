import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const {name, spots} = props;
  console.log("Happy---");
  const setStyle = classNames("day-list__item",{
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.full
  });
  return (
    <li className={setStyle}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots} spots remaining</h3>
    </li>
  );
}