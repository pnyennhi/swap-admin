import React, { useState } from "react";
import { edit, check, reject, view } from "../../../components/svg/icon";
import EditOrderModal from "./EditOrderModal";
import OrderDetailModal from "./OrderDetailModal";

import Axios from "../../../Instance";

import { ORDER_STATUS } from "../../../constants";

const STATUSES = ORDER_STATUS.map((status) => status.status);

const OrderTable = (props) => {
  const { orders, onSort, onEdit, onSetOrders } = props;

  const [editedOrderId, setEditedOrderId] = useState(null);
  const [detailedOrderId, setDetailedOrderId] = useState(null);

  const handlesetEditedOrderId = (id) => {
    setEditedOrderId(id);
  };

  const handleCloseEditModal = () => {
    setEditedOrderId(null);
  };

  const handlesetDetailedOrderId = (id) => {
    setDetailedOrderId(id);
  };

  const handleCloseDetailModal = (id) => {
    setDetailedOrderId(null);
  };

  const handleRejectOrder = (id, index) => {
    Axios.put(
      `https://bookstoreprojectdut.azurewebsites.net/api/orders/${id}`,
      { status: "Đã hủy" }
    ).then((res) => {
      let newOrders = [...orders];
      newOrders[index].status = "Đã hủy";
      onSetOrders(newOrders);
    });
  };

  const handleProcessOrder = (id, index) => {
    let status = STATUSES.indexOf(orders[index].status) + 1;

    Axios.put(`http://localhost:3001/orders/${id}`, {
      statusId: status + 1,
    }).then((res) => {
      let newOrders = [...orders];
      newOrders[index].status = STATUSES[status];
      onSetOrders(newOrders);
    });
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover dataTable">
        <colgroup>
          <col span="1" style={{ width: "5%" }} />
          <col span="1" style={{ width: "15%" }} />
          <col span="1" style={{ width: "25%" }} />
          <col span="1" style={{ width: "12%" }} />
          <col span="1" style={{ width: "10%" }} />
          <col span="1" style={{ width: "12%" }} />
          <col span="1" style={{ width: "12%" }} />
          <col span="1" style={{ width: "10%" }} />
        </colgroup>
        <tr className="tr-header">
          <th
            onClick={() => {
              onSort("id");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("email");
            }}
          >
            Người đặt
          </th>

          <th
            onClick={() => {
              onSort("address");
            }}
          >
            Người bán
          </th>
          <th
            onClick={() => {
              onSort("phone");
            }}
          >
            Phương thức thanh toán
          </th>
          <th
            onClick={() => {
              onSort("date");
            }}
          >
            Ngày đặt
          </th>
          <th
            onClick={() => {
              onSort("coupon");
            }}
          >
            Tổng tiền
          </th>
          <th
            onClick={() => {
              onSort("status");
            }}
          >
            Trạng thái
          </th>

          <th>Action</th>
        </tr>

        <tbody>
          {orders.map((order, index) => (
            <tr className="tr-body" key={order.id}>
              <td>{order.id}</td>
              <td>{order.user.email}</td>
              <td>{order.seller.email}</td>
              <td>
                {order.paymentMethod === "cod"
                  ? "Thanh toán khi nhận hàng"
                  : "Thanh toán qua Paypal"}
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString("en-GB")}</td>
              <td>{order.total}</td>

              <td>
                <span
                  className={`badge ${
                    ORDER_STATUS.find(
                      (status) => status.status === order.status
                    )?.color
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => handlesetDetailedOrderId(order.id)}
                >
                  {view}
                </button>
                {"  "}
                {order.statusId !== 5 &&
                  order.statusId !== 4 &&
                  order.statusId !== 1 && (
                    <>
                      <button
                        className="icon-button"
                        onClick={() => handleProcessOrder(order.id, index)}
                      >
                        {check}
                      </button>

                      {/* <button
                      className="icon-button"
                      onClick={() => handleRejectOrder(order.id, index)}
                    >
                      {reject}
                    </button> */}
                    </>
                  )}

                {/* {order.status !== "Đã hủy" &&
                order.status !== "Đã hoàn thành" ? (
                  <button
                    className="icon-button"
                    onClick={() => handlesetEditedOrderId(order.id)}
                  >
                    {edit}
                  </button>
                ) : (
                  <button
                    className="icon-button"
                    onClick={() => handlesetDetailedOrderId(order.id)}
                  >
                    {view}
                  </button>
                )}  */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(editedOrderId) && (
        <EditOrderModal
          show={Boolean(editedOrderId)}
          orderId={editedOrderId}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
        />
      )}

      {Boolean(detailedOrderId) && (
        <OrderDetailModal
          show={Boolean(detailedOrderId)}
          orderId={detailedOrderId}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default OrderTable;
