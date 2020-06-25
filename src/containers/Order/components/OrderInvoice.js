import React from "react";

const OrderInvoice = ({ order }) => {
  return (
    <>
      <table className="table">
        <colgroup>
          <col span="1" style={{ width: "40%" }} />
          <col span="1" style={{ width: "20%" }} />
          <col span="1" style={{ width: "20%" }} />
          <col span="1" style={{ width: "20%" }} />
        </colgroup>
        <tr>
          <th>Tên sách</th>
          <th className="text-center">Số lượng</th>
          <th>Đơn giá</th>
          <th>Thành tiền</th>
        </tr>
        <tbody>
          {order.orderItems.map((item) => (
            <tr key={item.nameBook}>
              <td>{item.nameBook}</td>
              <td className="text-center">{item.quantity}</td>
              <td>{new Number(item.price).toLocaleString("vi-VI")}</td>
              <td>{new Number(item.subTotal).toLocaleString("vi-VI")}</td>
            </tr>
          ))}
          <tr style={{ borderTop: "2px solid #00000080" }}>
            <td colSpan="3">
              <i>Tổng cộng</i>
            </td>
            <td>
              <b>{new Number(order.total1).toLocaleString("vi-VN")}</b>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <i>Mã giảm giá</i>
            </td>
            <td>{order.couponID}</td>
            <td>-{order.discount}%</td>
          </tr>
        </tbody>
      </table>

      <div>
        <table className="table no-border">
          <colgroup>
            <col span="3" style={{ width: "80%" }} />
            <col span="1" style={{ width: "20%" }} />
          </colgroup>
          <tr>
            <td className="text-right">
              <strong>Thanh toán:</strong>
            </td>
            <td>
              <strong> {new Number(order.pay).toLocaleString("vi-VN")}</strong>
            </td>
          </tr>
          <tr>
            <td className="text-right">
              <strong>Tiền ship:</strong>
            </td>
            <td>
              <strong>
                {" "}
                {new Number(order.shippingFee).toLocaleString("vi-VN")}
              </strong>
            </td>
          </tr>
          <tr>
            <td>
              <strong className="text-right">Tổng cộng:</strong>
            </td>
            <td>
              <strong>
                {" "}
                {new Number(order.total2).toLocaleString("vi-VN")}
              </strong>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default OrderInvoice;
