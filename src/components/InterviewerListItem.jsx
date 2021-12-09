import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  const {id, name, avatar, onChange} = props;
  const interviewListItemClass = classNames("interviewers__item",{
    "interviewers__item--selected" : props.selected
  });

  return (
    <li className={interviewListItemClass} interviewId={id} onClick={onChange}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt="Sylvia Palmer" interviewId={id}
      />
      {props.selected && name}
    </li>
  );
}