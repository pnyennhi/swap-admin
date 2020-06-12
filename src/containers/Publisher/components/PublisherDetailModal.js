import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modal";

import loading from "../../../assets/images/loading.gif";

import axios from "axios";

const BookDetailModal = (props) => {
  const { show, publisherId, onClose } = props;

  const [publisher, setPublisher] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://bookstoreprojectdut.azurewebsites.net/api/publishers/${publisherId}`
      )
      .then((res) => {
        setPublisher(res.data);
      });
  }, []);

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title">Chi tiết nhà xuất bản</h5>
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
                <p>{publisher.publisherID}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Thể loại</b>
                </label>
                <p>{publisher.publisher}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Số đầu sách</b>
                </label>
                <p>{publisher.bookTitleCount}</p>
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
