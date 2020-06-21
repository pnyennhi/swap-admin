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
    <div class="table-responsive">
      <table BookID="dataTableExample" class="table dataTable">
        <tr>
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
          >
            Tình trạng
          </th>
          <th style={{ textAlign: "center" }}>Action</th>
        </tr>

        <tbody>
          {coupons.map((coupon) => (
            <tr>
              <td>
                {" "}
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
              <td>{coupon.quantityUsed}</td>
              <td>{coupon.status}</td>
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
