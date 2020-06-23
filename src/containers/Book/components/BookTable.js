import React, { useState } from "react";
import { edit, del, book } from "../../../components/svg/icon";
import EditBookModal from "./EditBookModal";
import BookDetailModal from "./BookDetailModal";

const BookTable = (props) => {
  const {
    books,
    selectedBooks,
    onDelete,
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
    <div class="table-responsive">
      <table class="table table-striped table-hover dataTable">
        <colgroup>
          <col span="1" style={{ width: "2%" }} />
          <col span="1" style={{ width: "6%" }} />
          <col span="1" style={{ width: "25%" }} />
          <col span="1" style={{ width: "20%" }} />
          <col span="1" style={{ width: "7%" }} />
          <col span="1" style={{ width: "7%" }} />
          <col span="1" style={{ width: "10%" }} />
          <col span="1" style={{ width: "10%" }} />
          <col span="1" style={{ width: "5%" }} />
        </colgroup>
        <tr className="tr-header">
          <th>
            {/* <input
              type="checkbox"
              checked={
                selectedBooks.length === books.length && books.length > 0
              }
              onChange={(e) => onSelectAll(e)}
            /> */}
          </th>
          <th
            onClick={() => {
              onSort("bookID");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("nameBook");
            }}
          >
            Tên
          </th>
          <th
            onClick={() => {
              onSort("author");
            }}
          >
            Tác giả
          </th>
          <th
            onClick={() => {
              onSort("quantityIn");
            }}
          >
            Nhập
          </th>
          <th
            onClick={() => {
              onSort("quantityOut");
            }}
          >
            Bán
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
              onSort("status");
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
              className={
                selectedBooks.indexOf(book.bookID) > -1
                  ? "selected tr-body"
                  : "tr-body"
              }
            >
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    onSelect(e, book.bookID);
                  }}
                  checked={selectedBooks.indexOf(book.bookID) > -1}
                />
              </td>
              <td>{book.bookID}</td>
              <td>
                <a
                  onClick={() => {
                    setDetailedBookId(book.bookID);
                  }}
                >
                  {book.nameBook}
                </a>
              </td>
              <td>{book.author}</td>
              <td>{book.quantityIn}</td>
              <td>{book.quantityOut ? book.quantityOut : 0}</td>
              <td>{new Number(book.price).toLocaleString("vi-VI")}</td>
              <td className="text-center">
                <span
                  className={`badge ${
                    book.status ? "badge-success" : "badge-secondary"
                  }`}
                >
                  {book.status ? "Available" : "Unavailable"}
                </span>
              </td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => handlesetEditedBookId(book.bookID)}
                >
                  {edit}
                </button>
                {"  "}
                <button
                  className="icon-button"
                  onClick={() => {
                    onDelete(book.bookID);
                  }}
                >
                  {del}
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
