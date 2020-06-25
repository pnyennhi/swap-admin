import NumberFormat from "react-number-format";
import React from "react";

const NumberInput = ({ field, form, ...props }) => {
  return (
    <div className="form-group">
      <label>
        <b>{props.label}</b>
      </label>
      <NumberFormat
        value={field.value}
        name={field.name}
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        onValueChange={(val) =>
          form.setFieldValue(field.name, val.floatValue || "")
        }
        {...props}
      />
      {form.errors[field.name] && form.touched[field.name] ? (
        <div className="input-feedback">{form.errors[field.name]}</div>
      ) : null}
    </div>
  );
};

export default NumberInput;
