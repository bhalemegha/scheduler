import React, { useState, useEffect} from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios";
import getAppointmentsForDay, {getInterview, getInterviewerForDay} from "../helpers/selectors"

export default function Application() {
  //Setting up the states
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments:{},
    interviewers:{}
  });
 
  //To maintain day state, It can be-Monday, Tuesday...what ever day has been selected on day list component
  const setDay = day => setState({ ...state, day });
  //It will call Api once as we are passing an empty array as dependency which is never going to change
  useEffect(()=>{
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
       setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });    
  },[]);

  function bookInterview(id, newInterview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...newInterview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});
    console.log(`http://localhost:8001/api/appointments/${id}`);
     axios.put(`http://localhost:8001/api/appointments/${id}`,appointment)
     .then(() => 
     setState(prev => ({...prev, appointments})));
     console.log(state);
    }


  //getting appointments for specific day
  const appointmentList = getAppointmentsForDay(state,state.day).map((appointment) => {
    const interview = getInterview(state,appointment.interview);
    const interviewerList = getInterviewerForDay(state,state.day);
    console.log("InterviewList---",state);
    //Getting all Apoointments for specific day

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewerList}
        bookInterview={bookInterview}
      />
    );
  });

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
