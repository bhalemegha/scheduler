 //getting appointmnets for selected day
 export default function getAppointmentsForDay(state, dayName) {
  let appointmentIds;
  let appointmentList = [];
  //iterating through state to get appointment Ids for selected day
  for (let day of state.days) { 
    if (day.name.toUpperCase() === dayName.toUpperCase()) {
      appointmentIds = (day.appointments);
    }
  }
  //if appointment will be filled in array from App ids
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

//Getting interview obj from id
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

//get available interviewers for selected day
export  function getInterviewerForDay(state, dayName) {
  let interviewIds;
  let interviewerList = [];
  // iterating through the days to get iterview ids for selected day
  for (let day of state.days) {
    if (day.name.toUpperCase() === dayName.toUpperCase()) {
      interviewIds = (day.interviewers);
    }
  }
  //Filling up the list with interview objects
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
