import React, { useState } from "react";
import { Button } from "antd";
import { edit, check, reject, view } from "../../../components/svg/icon";
import EditOrderModal from "./EditOrderModal";
import OrderDetailModal from "./OrderDetailModal";
import RequestModal from "./RequestModal";

import Axios from "../../../Instance";

import { ORDER_STATUS } from "../../../constants";

const STATUSES = ORDER_STATUS.map((status) => status.status);

const OrderTable = (props) => {
  const { orders, onSort, onEdit, onSetOrders } = props;

  const [editedOrderId, setEditedOrderId] = useState(null);
  const [detailedOrderId, setDetailedOrderId] = useState(null);
  const [requestOrderId, setRequestOrderId] = useState(null);

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

  const handleUpdateOrder = (detail, orderId, index) => {
    Axios.post(`http://localhost:3001/orderHistory`, {
      detail,
      orderId,
    }).then((res) => {
      let newOrders = [...orders];
      newOrders[index].hasLeft = res.data.hasLeft;
      newOrders[index].hasArrived = res.data.hasArrived;
      newOrders[index].statusId = res.data.statusId;
      newOrders[index].status = ORDER_STATUS.find(
        (item) => item.id === res.data.statusId
      )?.status;
      onSetOrders(newOrders);
    });
  };

  const handleSeeRequestDetail = (orderId) => {
    setRequestOrderId(orderId);
  };

  const handleCloseRequestDetail = () => {
    setRequestOrderId(null);
    onEdit();
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover dataTable">
        <colgroup>
          <col span="1" style={{ width: "5%" }} />
          <col span="1" style={{ width: "15%" }} />
          <col span="1" style={{ width: "15%" }} />
          <col span="1" style={{ width: "15%" }} />
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
          {/* <th
            onClick={() => {
              onSort("phone");
            }}
          >
            Phương thức thanh toán
          </th> */}
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
          {orders.map((order, index) => {
            let action;

            switch (order.statusId) {
              case 1:
              case 2:
                action = <div></div>;
                break;
              case 3:
                action = (
                  <>
                    <Button
                      onClick={() =>
                        handleUpdateOrder("Đã lấy hàng", order.id, index)
                      }
                    >
                      Đã lấy hàng
                    </Button>
                    <Button
                      onClick={() =>
                        handleUpdateOrder("Lấy hàng thất bại", order.id, index)
                      }
                    >
                      Lấy hàng thất bại
                    </Button>
                  </>
                );
                break;
              case 4:
                if (!order.hasLeft) {
                  action = (
                    <Button
                      onClick={() =>
                        handleUpdateOrder(
                          `Rời kho ${order.shipCity.city}`,
                          order.id,
                          index
                        )
                      }
                    >
                      Rời kho {order.shipCity.city}
                    </Button>
                  );
                }
                if (order.hasLeft) {
                  action = (
                    <Button
                      onClick={() =>
                        handleUpdateOrder(
                          `Đến kho ${order.sellerCity.city}`,
                          order.id,
                          index
                        )
                      }
                    >
                      Đến kho {order.sellerCity.city}
                    </Button>
                  );
                }
                if (order.hasArrived) {
                  action = (
                    <>
                      <Button
                        onClick={() =>
                          handleUpdateOrder(
                            "Giao hàng thành công",
                            order.id,
                            index
                          )
                        }
                      >
                        Giao hàng thành công
                      </Button>
                      <Button
                        onClick={() =>
                          handleUpdateOrder(
                            "Giao hàng thất bại. Lý do: Người nhận không nhận hàng",
                            order.id,
                            index
                          )
                        }
                      >
                        Giao hàng thất bại
                      </Button>
                    </>
                  );
                }
                break;

              case 8:
                action = (
                  <Button onClick={() => handleSeeRequestDetail(order.id)}>
                    Xem chi tiết
                  </Button>
                );
                break;
              case 9:
                action = (
                  <Button
                    onClick={() =>
                      handleUpdateOrder(
                        "Đã hoàn hàng thành công",
                        order.id,
                        index
                      )
                    }
                  >
                    Hoàn hàng thành công
                  </Button>
                );
                break;

              default:
                break;
            }

            return (
              <tr className="tr-body" key={order.id}>
                <td>{order.id}</td>
                <td>{order.user.email}</td>
                <td>{order.seller.email}</td>
                {/* <td>
                {order.paymentMethod === "cod"
                  ? "Thanh toán khi nhận hàng"
                  : "Thanh toán qua Paypal"}
              </td> */}
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
                  {action}
                  {/* <button
                    className="icon-button"
                    onClick={() => handlesetDetailedOrderId(order.id)}
                  >
                    {view}
                  </button>
                  {"  "}
                  {![1, 2, 5, 6].includes(order.statusId) && (
                    <>
                      <button
                        className="icon-button"
                        onClick={() => handleProcessOrder(order.id, index)}
                      >
                        {check}
                      </button> */}
                  {/* <button
                      className="icon-button"
                      onClick={() => handleRejectOrder(order.id, index)}
                    >
                      {reject}
                    </button> */}
                  {/* </> */}
                  {/* )} */}
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
            );
          })}
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
      `
      {Boolean(requestOrderId) && (
        <RequestModal
          show={Boolean(requestOrderId)}
          orderId={requestOrderId}
          onClose={() => setRequestOrderId(null)}
          onSuccess={() => handleCloseRequestDetail()}
        />
      )}
    </div>
  );
};

export default OrderTable;
