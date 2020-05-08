import React from "react";
import Modal from "../../../components/Modal";

const DeleteModal = (props) => {
  const { show, bookIds, onClose, onDelete } = props;
  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Xóa sách
        </h5>
        <button className="close" onClick={() => onClose()}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <p>
          Bạn có chắc chắn muốn xóa sách (Id: {bookIds.join(", ")}) này không?
        </p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={() => onDelete(bookIds)}>
          Xóa
        </button>
        <button className="btn btn-primary" onClick={() => onClose()}>
          Hủy
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
