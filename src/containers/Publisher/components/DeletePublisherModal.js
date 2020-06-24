import React, { useState } from "react";
import Modal from "../../../components/Modal";

const DeleteModal = (props) => {
  const { show, publisherIds, onClose, onDelete } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Xóa nhà xuất bản
        </h5>
        <button className="close" onClick={() => onClose()}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <p>
          Bạn có chắc chắn muốn xóa nhà xuất bản (Id: {publisherIds.join(", ")})
          này không?
        </p>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-success"
          onClick={() => {
            setIsSubmitting(true);
            onDelete(publisherIds);
          }}
        >
          Xóa
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onClose()}
          disabled={isSubmitting}
        >
          Hủy
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
