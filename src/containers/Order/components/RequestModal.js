import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import Modal from "../../../components/Modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Divider } from "antd";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

import OrderInvoice from "./OrderInvoice";

import { ORDER_STATUS } from "../../../constants";

const STATUSES = ORDER_STATUS.map((status) => status.status);

const EditOrderModal = (props) => {
  const { show, orderId, onClose, onSuccess } = props;

  const [order, setOrder] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:3001/refundRequest/${orderId}`).then((res) => {
      setOrder(res.data);
      console.log("data", res.data);
    });
  }, []);

  const handleUpdateRequest = (status) => {
    Axios.put(`http://localhost:3001/refundRequest/${order.id}`, {
      status: status,
    })
      .then(() => {
        onSuccess();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal show={show} maxWidth="700px">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Chi tiết yêu cầu hoàn hàng
          </h5>
          <button
            className="close"
            onClick={() => {
              onClose();
            }}
          >
            <span>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Mã đơn hàng: {order.id}</p>
          <Divider>Nội dung yêu cầu</Divider>
          <p>Lý do hoàn hàng:</p>
          <p>{order.detail}</p>
          <p>Hình ảnh sản phầm nhận được:</p>
          <ImageGallery
            items={(order.images ?? [])
              .filter((item) => !item.isVideo)
              .map((item) => ({
                original: item.link,
                thumbnail: item.link,
              }))}
            showPlayButton={false}
            showFullscreenButton={false}
          />
          <p>Video sản phầm nhận được:</p>
          {(order.images ?? []).find((item) => item.isVideo) && (
            <video width="400" controls="controls" preload="metadata">
              <source
                src={(order.images ?? []).find((item) => item.isVideo).link}
              />
            </video>
          )}
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-success"
            onClick={() => handleUpdateRequest("Xác nhận")}
          >
            Xác nhận yêu cầu
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleUpdateRequest("Từ chối")}
          >
            Từ chối yêu cầu
          </button>
          <button className="btn btn-secondary" onClick={() => onClose()}>
            Đóng
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EditOrderModal;
