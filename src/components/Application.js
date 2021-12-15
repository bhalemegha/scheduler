import React from "react";
import useApplicationData from "hooks/useApplicationData";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import getAppointmentsForDay, { getInterview, getInterviewerForDay } from "../helpers/selectors"

export default function Application() {
  //App state
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  //getting appointments for specific day
  const appointmentList = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewerList = getInterviewerForDay(state, state.day);
    //Getting all Apoointments for specific day

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewerList}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  //Side bar and Appointment list
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
