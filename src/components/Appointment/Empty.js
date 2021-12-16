import React from "react";
//It will render '+' when there is no appointment booked for given slot
export default function Empty(props) {
  return (<main className="appointment__add">
  <img
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick={props.onAdd}
  />
</main>);
}