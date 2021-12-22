
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
//Mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const DELETE_MSG = "Are you sure you would like to delete?"
//It will render Appointment components, SHOW mode displays appointments and EMPTY will display a '+' sign
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //this message is used to display transition message--deleting/saving
  //saves an interview, creates interview onject
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    console.log("after saving...mode is ", mode);
    props.bookInterview(props.id, interview, mode, (err) => {
      if (!err) {
        transition(SHOW);
        return;
      }
      transition(ERROR_SAVE, true); //will display error if occured, changes mode to error_save true is to set relace mode in state
    });
  }

  //deletes appointment, and set mode empty if successfully deleted the appoinrment
  function deleteAppointment() {
    transition(DELETING);
    props.cancelInterview(props.id, (err) => {
      if (!err) {
        transition(EMPTY);
        return;
      }
      transition(ERROR_DELETE, true);
    });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* If state is empty, '+' button is displayed to create new appointments, clicking on button will display a form and change the mode to CREATE */}
      {
        mode === EMPTY && <Empty
          onAdd={() => transition(CREATE)} />
      }

      {/* It will display appointments for specific day */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {/* for transition mode (saving or delete) */}

      {
        mode === SAVING && <Status
          message={"Saving"} />
      }

      {
        mode === DELETING && <Status
          message={"Deleting"}
        />
      }

      {/* Mode create will desplay form to create appointments */}

      {
        (mode === CREATE) && (<Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />)
      }
      {
        (mode === EDIT) && (<Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save} />)
      }
      {
        mode === CONFIRM && <Confirm
          onCancel={back}
          message={DELETE_MSG}
          onConfirm={deleteAppointment} />
      }
      {
        mode === ERROR_SAVE && <Error
          message="Error occurred while creating record"
          onClose={back} />
      }
      {
        mode === ERROR_DELETE && <Error
          message="Could not cancel the Appointment."
          onClose={back} />
      }
    </article>
  );
}