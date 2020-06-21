import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modal";

import loading from "../../../assets/images/loading.gif";

import axios from "axios";

const ShippingDetailModal = (props) => {
  const { show, districtID, onClose } = props;

  const [shipping, setCategory] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://bookstoreprojectdut.azurewebsites.net/api/shipping/${districtID}`
      )
      .then((res) => {
        setCategory(res.data);
      });
  }, []);

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title">Chi tiết phí vận chuyển</h5>
        <button
          className="close"
          onClick={() => {
            onClose();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {shipping ? (
        <>
          <div className="modal-body">
            <div className="form-detail">
              <div className="form-group">
                <label>
                  <b>Id</b>
                </label>
                <p>{shipping.districtID}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Quận, Huyện</b>
                </label>
                <p>{shipping.district}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Tỉnh, Thành phố</b>
                </label>
                <p>{shipping.city}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Phí ship</b>
                </label>
                <p>{new Number(shipping.fee).toLocaleString("vi-VI")}</p>
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

export default ShippingDetailModal;
