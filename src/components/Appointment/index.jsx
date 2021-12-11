import React from "react";
import  useVisualMode  from "../../hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); let availableAppointments = "";
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
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={back}/>)}
    </article>
  );
}