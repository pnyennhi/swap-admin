import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modal";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

const BookDetailModal = (props) => {
  const { show, publisherId, onClose } = props;

  const [publisher, setPublisher] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:3001/conditions/${publisherId}`).then((res) => {
      setPublisher(res.data);
    });
  }, []);

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title">Chi tiết tình trạng</h5>
        <button
          className="close"
          onClick={() => {
            onClose();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {publisher ? (
        <>
          <div className="modal-body">
            <div className="form-detail">
              <div className="form-group">
                <label>
                  <b>Id</b>
                </label>
                <p>{publisher.id}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Thể loại</b>
                </label>
                <p>{publisher.condition}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Mô tả</b>
                </label>
                <p>{publisher.description}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Số sản phẩm</b>
                </label>
                <p>{publisher.totalProducts}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => onClose()}>
              Đóng
            </button>
          </div>
        </>
      ) : (
        <img style={{ margin: "20px auto" }} src={loading} width="10%" />
      )}
    </Modal>
  );
};

export default BookDetailModal;
