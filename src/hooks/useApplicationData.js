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

  function bookInterview(id, newInterview, isDone) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...newInterview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // setState(prev => ({ ...prev, appointments }));
    axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({ ...prev, appointments }))
        isDone(null);
      })
      .catch((error) => {
        isDone(error);
      });
  }

  function cancelInterview(id, isDone) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({ ...prev, appointments }));
        isDone(null);
      })
      .catch((error) => {
        isDone(error)
      });
  }

  return ({ state, setDay, bookInterview, cancelInterview });
}