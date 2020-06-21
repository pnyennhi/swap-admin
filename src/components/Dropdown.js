import React, { useEffect, useRef } from "react";

const Dropdown = (props) => {
  const dropdown = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.addEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (event) => {
    const { target } = event;
    if (dropdown.current) {
      if (!dropdown.current.contains(target)) {
        props.onClick();
      }
    }
  };
  return <div ref={dropdown}>{props.children}</div>;
};

export default Dropdown;
