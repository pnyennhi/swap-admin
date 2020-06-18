import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modal";

import loading from "../../../assets/images/loading.gif";

import axios from "axios";

const BookDetailModal = (props) => {
  const { show, reviewId, onClose } = props;

  const [review, setReview] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://bookstoreprojectdut.azurewebsites.net/api/reviews/${reviewId}`
      )
      .then((res) => {
        setReview(res.data);
      });
  }, []);

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title">Chi tiết đánh giá</h5>
        <button
          className="close"
          onClick={() => {
            onClose();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {review ? (
        <>
          <div className="modal-body">
            <div className="form-detail">
              <div className="form-group">
                <label>
                  <b>Review Id</b>
                </label>
                <p>{review.reviewId}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>User</b>
                </label>
                <p>{review.review}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Sách</b>
                </label>
                <p>{review.nameBook}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Rating</b>
                </label>
                <p>{review.rating}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Nội dung đánh giá</b>
                </label>
                <p>{review.comment}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Ngày đánh giá</b>
                </label>
                <p>{new Date(review.date).toLocaleDateString("en-GB")}</p>
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
