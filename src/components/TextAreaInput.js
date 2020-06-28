import React from "react";

const TextInput = ({ field, form, ...props }) => {
  return (
    <div className="form-group">
      <label>
        <b>{props.label}</b>
      </label>
      <textarea
        {...field}
        {...props}
        style={{ height: "152px", lineHeight: "1.5" }}
      />

      {form.errors[field.name] && form.touched[field.name] ? (
        <div className="input-feedback">{form.errors[field.name]}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
