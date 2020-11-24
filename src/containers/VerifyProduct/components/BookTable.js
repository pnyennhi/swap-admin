import React, { useState } from "react";
import { check, reject } from "../../../components/svg/icon";
import EditBookModal from "./EditBookModal";
import BookDetailModal from "./BookDetailModal";

const BookTable = (props) => {
  const {
    books,
    selectedBooks,
    onVerify,
    onReject,
    onSelect,
    onSelectAll,
    onSort,
    onEdit,
  } = props;

  const [editedBookId, setEditedBookId] = useState(null);
  const [detailedBookId, setDetailedBookId] = useState(null);

  const handlesetEditedBookId = (id) => {
    setEditedBookId(id);
  };

  const handleCloseEditModal = () => {
    setEditedBookId(null);
  };

  const handleCloseDetailModal = () => {
    setDetailedBookId(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover dataTable">
        <colgroup>
          {/* <col span="1" style={{ width: "2%" }} /> */}
          <col span="1" style={{ width: "6%" }} />
          <col span="1" style={{ width: "27%" }} />
          <col span="1" style={{ width: "13%" }} />
          <col span="1" style={{ width: "10%" }} />
          <col span="1" style={{ width: "8%" }} />
          <col span="1" style={{ width: "8%" }} />
          <col span="1" style={{ width: "10%" }} />
          <col span="1" style={{ width: "5%" }} />
        </colgroup>
        <tr className="tr-header">
          {/* <th> */}
          {/* <input
              type="checkbox"
              checked={
                selectedBooks.length === books.length && books.length > 0
              }
              onChange={(e) => onSelectAll(e)}
            /> */}
          {/* </th> */}
          <th
            onClick={() => {
              onSort("id");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("name");
            }}
          >
            Tên sản phẩm
          </th>
          <th
            onClick={() => {
              onSort("owner");
            }}
          >
            Người bán
          </th>
          <th
            onClick={() => {
              onSort("quantity");
            }}
          >
            Số lượng
          </th>
          <th
            onClick={() => {
              onSort("soldQuantity");
            }}
          >
            Đã bán
          </th>
          <th
            onClick={() => {
              onSort("price");
            }}
          >
            Giá bán
          </th>
          <th
            onClick={() => {
              onSort("isActive");
            }}
            className="text-center"
          >
            Tình trạng
          </th>
          <th>Action</th>
        </tr>

        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              className={
                selectedBooks.indexOf(book.id) > -1
                  ? "selected tr-body"
                  : "tr-body"
              }
            >
              {/* <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    onSelect(e, book.id);
                  }}
                  checked={selectedBooks.indexOf(book.id) > -1}
                />
              </td> */}
              <td>{book.id}</td>
              <td>
                <a
                  onClick={() => {
                    setDetailedBookId(book.id);
                  }}
                >
                  {book.name}
                </a>
              </td>
              <td>{book.owner?.email}</td>
              <td>{book.quantity}</td>
              <td>{book.soldQuantity ? book.soldQuantity : 0}</td>
              <td>{new Number(book.price).toLocaleString("vi-VI")}</td>
              <td className="text-center">
                <span
                  className={`badge ${
                    book.isActive ? "badge-success" : "badge-secondary"
                  }`}
                >
                  {book.status?.status}
                </span>
              </td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => {
                    onVerify(book.id);
                  }}
                >
                  {check}
                </button>

                <button
                  className="icon-button"
                  onClick={() => {
                    onReject(book.id);
                  }}
                >
                  {reject}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(editedBookId) && (
        <EditBookModal
          show={Boolean(editedBookId)}
          bookId={editedBookId}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
        />
      )}

      {Boolean(detailedBookId) && (
        <BookDetailModal
          show={Boolean(detailedBookId)}
          bookId={detailedBookId}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default BookTable;
