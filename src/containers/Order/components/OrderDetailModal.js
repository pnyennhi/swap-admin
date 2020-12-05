import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import Modal from "../../../components/Modal";
import { Divider } from "antd";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

import OrderInvoice from "./OrderInvoice";

import { ORDER_STATUS } from "../../../constants";

const STATUSES = ORDER_STATUS.map((status) => status.status);

const EditOrderModal = (props) => {
  const { show, orderId, onClose, onEdit } = props;

  const [order, setOrder] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:3001/orders/${orderId}`).then((res) => {
      setOrder(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <Modal show={show} maxWidth="700px">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Chi tiết đơn hàng
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
          {order && (
            <>
              <div className="flex justify-content-between">
                <p>Mã đơn hàng: {order.id}</p>
                <p>{order.status.status}</p>
              </div>
              <p>Ngày đặt: {order.createdAt}</p>
              <p>Người đặt: {order.user.email}</p>
              <p>Người bán: {order.seller.email}</p>
              <Divider orientation="left">Địa chỉ nhận hàng</Divider>
              <h6>{order.shipName}</h6>
              <p>
                Địa chỉ: {order.shipAddress}, {order.shipWard.ward},{" "}
                {order.shipDistrict.district}, {order.shipCity.city}
              </p>
              <p>Điện thoại: {order.shipPhone}</p>

              <Divider orientation="left">Địa chỉ lấy hàng</Divider>
              {order.sellerName ? (
                <>
                  <h6>{order.sellerName}</h6>
                  <p>
                    Địa chỉ: {order.sellerAddress}, {order.sellerWard.ward},{" "}
                    {order.sellerDistrict.district}, {order.sellerCity.city}
                  </p>
                  <p>Điện thoại: {order.sellerPhone}</p>
                </>
              ) : (
                <p>Đang chờ xác nhận</p>
              )}

              <Divider orientation="left">Sản phẩm đã mua</Divider>
              <OrderItem
                products={order.items}
                // departure={order.departure}
                status={order.status.status}
                hideStatus={true}
              />
              <Divider />
              <div className="flex justify-content-end align-items-center mb-2">
                <p className="mr-4">Tiền ship:</p>
                <h5 className="text-orange font-weight-600">
                  {order.shippingFee}
                </h5>
              </div>
              <div className="flex justify-content-end align-items-center mb-3">
                <p className="mr-4">Tổng tiền:</p>
                <h4 className="text-orange font-weight-600">
                  {/* {order.items.reduce((sum, item) => {
                    return (sum += item.price * item.quantity);
                  }, 0) + order.shippingFee} */}
                  {order.total}
                </h4>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default EditOrderModal;
