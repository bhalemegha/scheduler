import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import propTypes from 'prop-types';
// import classNames from "classnames";


export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  InterviewerList.propTypes = {
    interviewers: propTypes.array.isRequired
  }
  const interviewerList = interviewers.map((interviewer) => {
       return <InterviewerListItem key={interviewer.id} {...interviewer} onChange = {() => onChange(interviewer.id)} selected = {(value) === interviewer.id}/>
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{value}</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}
