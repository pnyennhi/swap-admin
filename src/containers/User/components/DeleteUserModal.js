import React from "react";
import Modal from "../../../components/Modal";

const DeleteModal = (props) => {
  const { show, userIds, onClose, onDelete } = props;
  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Xóa người dùng
        </h5>
        <button className="close" onClick={() => onClose()}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <p>
          Bạn có chắc chắn muốn người dùng (Id: {userIds.join(", ")}) này không?
        </p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={() => onDelete(userIds)}>
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