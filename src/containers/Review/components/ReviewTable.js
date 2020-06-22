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
    <div class="table-responsive">
      <table class="table dataTable">
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
        <tr>
          <th>
            <input
              type="checkbox"
              checked={
                selectedReviews.length === reviews.length && reviews.length > 0
              }
              onChange={(e) => onSelectAll(e)}
            />
          </th>
          <th
            onClick={() => {
              onSort("reviewId");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("nameBook");
            }}
          >
            Sách
          </th>
          <th
            onClick={() => {
              onSort("email");
            }}
          >
            Email
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
            <tr>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    onSelect(e, review.reviewId);
                  }}
                  checked={selectedReviews.indexOf(review.reviewId) > -1}
                />
              </td>
              <td>{review.reviewId}</td>
              <td>{review.nameBook}</td>
              <td>{review.email}</td>
              <td style={{ textAlign: "center" }}>{review.rating}</td>
              <td>
                <div className="overflow">{review.comment}</div>
                <a
                  style={{ color: "blue", fontSize: "0.875em" }}
                  onClick={() => setDetailedReviewId(review.reviewId)}
                >
                  Xem chi tiết
                </a>
              </td>
              <td>{new Date(review.date).toLocaleDateString("en-GB")}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="icon-button"
                  onClick={() => {
                    onDelete(review.reviewId);
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
