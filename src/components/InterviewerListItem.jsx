import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  const {id, name, avatar, setInterviewer} = props;
  const setStyle = classNames("interviewers__item",{
    "interviewers__item--selected" : props.selected
  });

  return (
    <li className={setStyle} interviewId={id} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt="Sylvia Palmer" interviewId={id}
      />
      {props.selected && name}
    </li>
  );
}