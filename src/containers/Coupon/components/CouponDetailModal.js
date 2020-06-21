import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modal";

import loading from "../../../assets/images/loading.gif";

import axios from "axios";

const CouponDetailModal = (props) => {
  const { show, couponId, onClose } = props;

  const [coupon, setCoupon] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://bookstoreprojectdut.azurewebsites.net/api/coupons/${couponId}`
      )
      .then((res) => {
        setCoupon(res.data);
      });
  }, []);

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title">Chi tiết mã giảm giá</h5>
        <button
          className="close"
          onClick={() => {
            onClose();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {coupon ? (
        <>
          <div className="modal-body">
            <div className="form-detail">
              <div className="form-group">
                <label>
                  <b>Id</b>
                </label>
                <p>{coupon.couponID}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Tỉ lệ giảm (%)</b>
                </label>
                <p>{coupon.discount}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Tổng số mã</b>
                </label>
                <p>{coupon.quantity}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Số mã đã dùng</b>
                </label>
                <p>{coupon.quantityUsed}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Tình trạng</b>
                </label>
                <p>{coupon.status}</p>
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

export default CouponDetailModal;
