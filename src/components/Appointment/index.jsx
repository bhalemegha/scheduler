import React from "react";
import "components/Appointment/styles.scss";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
export default function Appointment(props) {
  const { time } = props;

  let availableAppointments = "";
  // function test() {
  //   if (time) {
  //     availableAppointments = "Appointment at " + time ;
  //   } else {
  //     availableAppointments = "No Appointments";
  //   }
  //   return availableAppointments;
  // }
  return (
    <article className="appointment">
    <Header time={props.time}/>
    {props.interview? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty></Empty> } 
    </article>
  );
}