import React from "react";
import  useVisualMode  from "../../hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";
import Status from "components/Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const WAIT = "WAIT";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const DELETE_MSG = "Are you sure you would like to delete?"
//It will render Appointment components, SHOW mode displays appointments and EMPTY will display a '+' sign
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 
   if(props.interview) console.log("#####  ",props.interview.interviewer);
  let message = "";
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer 
    };
    message = "Waiting..."
    transition(WAIT);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }
 
  function deleteAppointment() {
    message = "Deleting...";
    transition(WAIT);
    props.cancelInterview(props.id);
    transition(EMPTY);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* If state is empty, '+' button is displayed to create new appointments, clicking on button will display a form and change the mode to CREATE */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}

      {/* It will display appointments for specific day */}
      {mode === CONFIRM && <Confirm onCancel = {back} message={DELETE_MSG} onConfirm = {deleteAppointment}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {()=>transition(CONFIRM)}
          onEdit={()=>transition(EDIT)}
        />
      )}
      {/* Mode create will desplay form to create appointments */}
      {mode === WAIT  && <Status message={message}/>}
      {(mode === CREATE) && (<Form interviewers={props.interviewers} onCancel={back} onSave={save}/>)}
      {(mode === EDIT) && (<Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id}  onCancel={back} onSave={save}/>)}
    </article>
  );
}