import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modal";

import loading from "../../../assets/images/loading.gif";

import axios from "axios";

const BookDetailModal = (props) => {
  const { show, categoryId, onClose } = props;

  const [category, setCategory] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://bookstoreprojectdut.azurewebsites.net/api/categories/${categoryId}`
      )
      .then((res) => {
        setCategory(res.data);
      });
  }, []);

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title">Chi tiết thể loại</h5>
        <button
          className="close"
          onClick={() => {
            onClose();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {category ? (
        <>
          <div className="modal-body">
            <div className="form-detail">
              <div className="form-group">
                <label>
                  <b>Id</b>
                </label>
                <p>{category.categoryID}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Thể loại</b>
                </label>
                <p>{category.category}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Số đầu sách</b>
                </label>
                <p>{category.bookTitleCount}</p>
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
