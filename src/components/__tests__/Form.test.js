import React from "react";

import { render, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
// import {getByTestId} from '@testing-library/dom'
// import '@testing-library/jest-dom'
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
 
  it("renders without student name if not provided", () => {
    // eslint-disable-next-line no-undef
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers}  />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    const studentInput = getByTestId("student-name-input");
    // eslint-disable-next-line no-undef
    expect(studentInput).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave}  />
    );    
    const btnSave = getByText("Save");
    fireEvent.click(btnSave);
    /* 1. validation is shown */
    // eslint-disable-next-line no-undef
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        student="Lydia Miller-Jones"
      />
    );
  
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});