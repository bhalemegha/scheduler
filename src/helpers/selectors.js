 
 export default function getAppointmentsForDay(state, dayName) {
  let appointmentIds;
  let appointmentList = [];
  for (let day of state.days) {
    if (day.name.toUpperCase() === dayName.toUpperCase()) {
      appointmentIds = (day.appointments);
    }
  }
  if (appointmentIds) {
    for (let appointment in state.appointments) {
      if (appointmentIds.includes(state.appointments[appointment].id)) {
        appointmentList.push(state.appointments[appointment]);
      }
    }
    return appointmentList;
  }
  return appointmentList;
}
 
export function getInterview(state,interview) {
  let interviewObj = {};
  for (const i in state["interviewers"]) {
    if (interview && state["interviewers"][i].id === interview.interviewer) {
      interviewObj["student"] = interview.student;
      interviewObj["interviewer"] = state["interviewers"][i];
      return interviewObj   
    }
  }
  return null;
}


export  function getInterviewerForDay(state, dayName) {
  let interviewIds;
  let interviewerList = [];
  for (let day of state.days) {
    if (day.name.toUpperCase() === dayName.toUpperCase()) {
      interviewIds = (day.interviewers);
    }
  }
  if (interviewIds) {
    for (let interviewer in state.interviewers) {
      if (interviewIds.includes(state.interviewers[interviewer].id)) {
        interviewerList.push(state.interviewers[interviewer]);
      }
    }
    return interviewerList;
  }
  return interviewerList;
}
