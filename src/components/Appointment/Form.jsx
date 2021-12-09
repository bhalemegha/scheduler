import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React, { useState } from "react";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const handleInput = (event) => {
    setStudent(event.target.value);
  }

  const reset = function () {
    setStudent("");
    setInterviewer("");
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }
  return (<main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={e => { e.preventDefault(); }}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={handleInput}
        />
      </form>
      <InterviewerList
        interviewers={props.interviewers}
        value={interviewer}
        onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={props.onSave}>Save</Button>
      </section>
    </section>
  </main>);
}