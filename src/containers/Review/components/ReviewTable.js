import React, { useState } from "react";
import { edit, del, review } from "../../../components/svg/icon";
import ReviewDetailModal from "./ReviewDetailModal";

const ReviewTable = (props) => {
  const {
    reviews,
    selectedReviews,
    onDelete,
    onSelect,
    onSelectAll,
    onSort,
    onEdit,
  } = props;

  const [detailedReviewId, setDetailedReviewId] = useState(null);

  const handleCloseDetailModal = () => {
    setDetailedReviewId(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover dataTable">
        <colgroup>
          <col span="1" style={{ width: "3%" }} />
          <col span="1" style={{ width: "5%" }} />
          <col span="1" style={{ width: "20%" }} />
          <col span="1" style={{ width: "15%" }} />
          <col span="1" style={{ width: "5%" }} />
          <col span="1" style={{ width: "auto" }} />
          <col span="1" style={{ width: "10%" }} />
          <col span="1" style={{ width: "5%" }} />
        </colgroup>
        <tr className="tr-header">
          <th>
            {/* <input
              type="checkbox"
              checked={
                selectedReviews.length === reviews.length && reviews.length > 0
              }
              onChange={(e) => onSelectAll(e)}
            /> */}
          </th>
          <th
            onClick={() => {
              onSort("id");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("user");
            }}
          >
            Người đánh giá
          </th>
          <th
            onClick={() => {
              onSort("seller");
            }}
          >
            Người bán
          </th>
          <th
            onClick={() => {
              onSort("rating");
            }}
          >
            Rating
          </th>
          <th
            onClick={() => {
              onSort("comment");
            }}
          >
            Nội dung đánh giá
          </th>
          <th
            onClick={() => {
              onSort("date");
            }}
          >
            Ngày
          </th>

          <th>Action</th>
        </tr>

        <tbody>
          {reviews.map((review) => (
            <tr
              key={review.id}
              className={
                selectedReviews.indexOf(review.id) > -1
                  ? "selected tr-body"
                  : "tr-body"
              }
            >
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    onSelect(e, review.id);
                  }}
                  checked={selectedReviews.indexOf(review.id) > -1}
                />
              </td>
              <td>{review.id}</td>
              <td>{review.user.email}</td>
              <td>{review.seller.email}</td>
              <td style={{ textAlign: "center" }}>{review.rate}</td>
              <td>
                <div className="overflow">{review.review}</div>
                <a
                  style={{ color: "blue", fontSize: "0.875em" }}
                  onClick={() => setDetailedReviewId(review.id)}
                >
                  Xem chi tiết
                </a>
              </td>
              <td>{new Date(review.createdAt).toLocaleDateString("en-GB")}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="icon-button"
                  onClick={() => {
                    onDelete(review.id);
                  }}
                >
                  {del}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(detailedReviewId) && (
        <ReviewDetailModal
          show={Boolean(detailedReviewId)}
          reviewId={detailedReviewId}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default ReviewTable;
