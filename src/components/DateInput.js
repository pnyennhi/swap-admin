import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ field, form, ...props }) => {
  const [startDate, setStartDate] = useState(
    props.value ? props.value : new Date()
  );

  return (
    <div className="form-group">
      <label>{props.label}</label>
      <DatePicker
        name={field.name}
        className="form-control"
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          form.setFieldValue(field.name, date);
        }}
      />
    </div>
  );
};

export default DateInput;
