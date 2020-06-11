import React from "react";

const Modal = (props) => {
  return (
    <div
      className={props.show ? "modal fade show" : "modal fade"}
      style={{ display: props.show ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
