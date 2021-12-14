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
//It will render Appointment components, SHOW mode displays appointments and EMPTY will display a '+' sign
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 

  function save(name, interviewer) {
    const interview = {
      'student': name,
      interviewer 
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* If state is empty, '+' button is displayed to create new appointments, clicking on button will display a form and change the mode to CREATE */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}

      {/* It will display appointments for specific day */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {/* Mode create will desplay form to create appointments */}
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={back} onSave={save}/>)}
    </article>
  );
}