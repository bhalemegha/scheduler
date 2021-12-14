import React from "react";
import useVisualMode from "../../hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";
import Status from "components/Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const WAIT = "WAIT";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const DELETE_MSG = "Are you sure you would like to delete?"
//It will render Appointment components, SHOW mode displays appointments and EMPTY will display a '+' sign
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  if (props.interview) console.log("#####  ", props.interview.interviewer);
  let message = "";
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    message = "Waiting..."
    transition(WAIT);
    props.bookInterview(props.id, interview, (err) => {
      if (!err) {
        transition(SHOW);
        return;
      }
      transition(ERROR_SAVE, true);
    });
  }

  function deleteAppointment() {
    message = "Deleting...";
    transition(WAIT);
    props.cancelInterview(props.id, (err) => {
      if (!err) {
        transition(EMPTY);
        return;      
      }
      transition(ERROR_DELETE, true);
    });
  }

  // function deleteAppointment() {
  //   message = "Deleting...";
  //   transition(WAIT);
  //   props.cancelInterview(props.id)
  //   .then(()=>(transition(EMPTY)))
  //   .catch((err)=>(transition(ERROR_DELETE, true)));
  // }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* If state is empty, '+' button is displayed to create new appointments, clicking on button will display a form and change the mode to CREATE */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {/* It will display appointments for specific day */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {/* Mode create will desplay form to create appointments */}
      {mode === WAIT && <Status message={message} />}
      {(mode === CREATE) && (<Form interviewers={props.interviewers} onCancel={back} onSave={save} />)}
      {(mode === EDIT) && (<Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id} onCancel={back} onSave={save} />)}
      {mode === CONFIRM && <Confirm onCancel={back} message={DELETE_MSG} onConfirm={deleteAppointment} />}
      {mode === ERROR_SAVE && <Error message="Error occurred while creating record" onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not cancel the Appointment." onClose={back} />}
    </article>
  );
}