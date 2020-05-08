import React from "react";

const CheckBox = (props) => {
  return <input type="checkbox" onChange={() => props.onChange()} />;
};

export default CheckBox;
