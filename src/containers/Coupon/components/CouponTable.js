import React, { useState } from "react";
import { edit, del, coupon } from "../../../components/svg/icon";
import EditCouponModal from "./EditCouponModal";
import CouponDetailModal from "./CouponDetailModal";

const CouponTable = (props) => {
  const { coupons, onSort, onEdit } = props;

  const [editedCouponId, setEditedCouponId] = useState(null);
  const [detailedCouponId, setDetailedCouponId] = useState(null);

  const handlesetEditedBookId = (id) => {
    setEditedCouponId(id);
  };

  const handleCloseEditModal = () => {
    setEditedCouponId(null);
  };

  const handleCloseDetailModal = () => {
    setDetailedCouponId(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover dataTable">
        <tr className="tr-header">
          <th
            onClick={() => {
              onSort("couponID");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("discount");
            }}
          >
            Tỉ lệ giảm (%)
          </th>
          <th
            onClick={() => {
              onSort("quantity");
            }}
          >
            Tổng số mã
          </th>
          <th
            onClick={() => {
              onSort("quantityUsed");
            }}
          >
            Số mã đã dùng
          </th>
          <th
            onClick={() => {
              onSort("status");
            }}
            className="text-center"
          >
            Tình trạng
          </th>
          <th style={{ textAlign: "center" }}>Action</th>
        </tr>

        <tbody>
          {coupons.map((coupon) => (
            <tr className="tr-body" key={coupon.couponID}>
              <td>
                <a
                  onClick={() => {
                    setDetailedCouponId(coupon.couponID);
                  }}
                >
                  {coupon.couponID}
                </a>
              </td>
              <td>{coupon.discount}</td>
              <td>{coupon.quantity}</td>
              <td>{coupon.quantityUsed ? coupon.quantityUsed : 0}</td>
              <td className="text-center">
                <span
                  className={`badge badge-pill ${
                    coupon.status === "Available"
                      ? "badge-success"
                      : "badge-secondary"
                  }`}
                  style={{ padding: "6px", borderRadius: "5px" }}
                >
                  {coupon.status}
                </span>
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="icon-button"
                  onClick={() => handlesetEditedBookId(coupon.couponID)}
                >
                  {edit}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(editedCouponId) && (
        <EditCouponModal
          show={Boolean(editedCouponId)}
          couponId={editedCouponId}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
        />
      )}

      {Boolean(detailedCouponId) && (
        <CouponDetailModal
          show={Boolean(detailedCouponId)}
          couponId={detailedCouponId}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default CouponTable;
