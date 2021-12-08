import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
// import classNames from "classnames";


export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;
  const interviewerList = interviewers.map((i) => {
    if (Number(interviewer) === i.id) {
      return <InterviewerListItem key={i.id} setInterviewer = {setInterviewer}  {...i} selected />
    }
    return <InterviewerListItem key={i.id} setInterviewer = {setInterviewer} {...i} />
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{interviewerList}</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}
