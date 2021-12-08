import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
// import classNames from "classnames";


export default function InterviewerList(props) {
  const { interviewers, interviewer } = props;
  const interviewerList = interviewers.map((i) => {
       return <InterviewerListItem key={i.id} setInterviewer = {(event) => props.setInterviewer(i.id)}  {...i} selected={(interviewer) === i.id}/>
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{interviewerList}</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}
