import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

const formatSpots = (spots) => {
  let displayText = "";
  console.log(spots);
  switch(Number(spots)) {
    case 0 :
      displayText = `no spots remaining`;
      break;
    case 1:
      displayText = spots + ` spot remaining`;
      break;
    default:
      displayText = spots + ` spots remaining`;
  }
  return displayText;
}
export default function DayListItem(props) {
  const {name, spots} = props;
  const setStyle = classNames("day-list__item",{
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.full
  });
  return (
    <li className={setStyle}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}