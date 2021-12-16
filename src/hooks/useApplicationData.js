import { useState, useEffect } from "react";
import axios from "axios";
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

  const updateSpots = function(appId, mode) {
    const days = state.days.map(day => {
      if (day.appointments.includes(appId)) {
        if(mode){
           if (mode !== "EDIT") {
             day.spots = day.spots - 1;
            }
        } else {
          day.spots = day.spots + 1;
        }
      }
      return day;
    })
    return days;
  }

  const bookInterview = function (id, newInterview, mode, isErr) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...newInterview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      const days = updateSpots(id, mode);
      setState(prev => ({
          ...prev, appointments, days
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
    // const days = updateSpots(id, false);

    axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(id, false);
        setState(prev => ({
          ...prev, appointments, days
        }));
        isErr(null);
      })
      .catch((error) => {
        isErr(error)
      });
  }

  return ({ state, setDay, bookInterview, cancelInterview });
}