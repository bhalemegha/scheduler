import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || ""); //state for student input
  const [interviewer, setInterviewer] = useState(props.interviewer || null); //state for interviewer from list
  const [error, setError] = useState("");//to capture state of error(Validation error)

  //Student input onChange eent handler..Controlled input element
  const handleInput = (event) => {
    setStudent(event.target.value);
    setError(null);
  }

  //reset form inputs and list if user cancels the operation
  const reset = function () {
    setStudent("");
    setInterviewer("");
  }

  const cancel = function () {
    reset();
    props.onCancel();
  }

  //it will update error state if enter student input is empty
   const validate = (event) => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } 
    if (!interviewer) {
      setError("Please select Interviewer");
      return;
    } 
    props.onSave(student, interviewer);
  }

  //Renders Edit and create forms
  return (<main className="appointment__card appointment__card--create">
    <form autoComplete="off" onSubmit={e => { e.preventDefault(); }}>
      <section className="appointment__card-left">
        <input
          data-testid="student-name-input"
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"          
          value={student}
          onChange={handleInput}
        />
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button data-testid="Save" type='submit' confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </form>
  </main>);
}
