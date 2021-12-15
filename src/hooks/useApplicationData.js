import { useState, useEffect } from "react";
import axios from "axios";
import getAppointmentsForDay from "helpers/selectors";
export default function useApplicationData() {
  //Setting up the state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //To maintain day state, It can be-Monday, Tuesday...what ever day has been selected on day list component
  const setDay = day => setState({ ...state, day });
  //It will call Api once as we are passing an empty array as dependency which is never going to change
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  const updateSpots = function (AppointmentId, isAdd) {
    let appointmentList = [];
    for (let curday of state.days) {
      if (curday.name === state.day) {
        console.log("state.days-----", curday.appointments);
        appointmentList = curday.appointments;
        console.log(appointmentList);
        break;
      }
    }
    let emptyAppList = appointmentList.filter(appId => !state.appointments[appId].interview);
    console.log(emptyAppList.length);
    if (isAdd) {
      return emptyAppList.length - 1;
    }
    return emptyAppList.length + 1;
  }

  const bookInterview = function (id, newInterview, isErr) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...newInterview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const availbleSpots = updateSpots(id, true);
    axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({
          ...prev, appointments
        }));
        isErr(null);
      })
      .catch((error) => {
        isErr(error);
      });
  }

  const cancelInterview = function (id, isErr) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const availbleSpots = updateSpots(id, false);

    axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({
          ...prev, appointments 
        }));
        isErr(null);
      })
      .catch((error) => {
        isErr(error)
      });
  }

  return ({ state, setDay, bookInterview, cancelInterview });
}