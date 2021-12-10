function getAppointmentsForDay(state, dayName) {
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
export default getAppointmentsForDay;