import React from "react";
import "components/Appointment/styles.scss";
export default function Appointment(props) {
  const { time } = props;
  let availableAppointments = "";
  function test() {
    if (time) {
      availableAppointments = "Appointment at " + time ;
    } else {
      availableAppointments = "No Appointments";
    }
    return availableAppointments;
  }
  return (
    <article className="appointment">{test()}</article>
  );
}