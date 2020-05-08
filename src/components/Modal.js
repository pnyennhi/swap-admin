import React from "react";

const Modal = (props) => {
  return (
    <div
      className={props.show ? "modal fade show" : "modal fade"}
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      style={{ display: props.show ? "block" : "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
