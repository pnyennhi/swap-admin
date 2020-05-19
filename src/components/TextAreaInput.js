import React from "react";

const TextInput = ({ field, form, ...props }) => {
  return (
    <div class="form-group">
      <label>{props.label}</label>
      <textarea
        {...field}
        {...props}
        style={{ height: "150px", lineHeight: "1.5" }}
      />

      {form.errors[field.name] && form.touched[field.name] ? (
        <div className="input-feedback">{form.errors[field.name]}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
