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
      <table BookID="dataTableExample" class="table dataTable">
        <tr>
          <th>
            <input
              type="checkbox"
              checked={
                selectedBooks.length === books.length && books.length > 0
              }
              onChange={(e) => onSelectAll(e)}
            />
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
              onSort("category");
            }}
          >
            Thể loại
          </th>
          <th
            onClick={() => {
              onSort("publisher");
            }}
          >
            NXB
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
          <th>Action</th>
        </tr>

        <tbody>
          {books.map((book) => (
            <tr>
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
              <td>{book.category}</td>
              <td>{book.publisher}</td>
              <td>{book.quantityIn}</td>
              <td>{book.quantityOut ? book.quantityOut : 0}</td>
              <td>{book.price}</td>
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
