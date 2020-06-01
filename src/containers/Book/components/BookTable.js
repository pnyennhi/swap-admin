import React, { useState } from "react";
import { edit, del, book } from "../../../components/svg/icon";
import EditBookModal from "./EditBookModal";

const BookTable = (props) => {
  const {
    books,
    selectedBooks,
    onDelete,
    onSelect,
    onSelectAll,
    onSort,
  } = props;

  const [editedBook, setEditedBook] = useState(null);

  const handleSetEditedBook = (id) => {
    setEditedBook(id);
  };

  const handleCloseEditModal = () => {
    setEditedBook(null);
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
              onSort("BookID");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("Name");
            }}
          >
            Tên
          </th>
          <th
            onClick={() => {
              onSort("Author");
            }}
          >
            Tác giả
          </th>
          <th
            onClick={() => {
              onSort("CategoryID");
            }}
          >
            Thể loại
          </th>
          <th
            onClick={() => {
              onSort("PublisherID");
            }}
          >
            Nhà xuất bản
          </th>
          <th>Nhập</th>
          <th>Bán</th>
          <th>Giá bán</th>
          <th>Action</th>
        </tr>

        <tbody>
          {books.map((book) => (
            <tr>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    onSelect(e, book.BookID);
                  }}
                  checked={selectedBooks.indexOf(book.BookID) > -1}
                />
              </td>
              <td>{book.BookID}</td>
              <td>{book.Name}</td>
              <td>{book.Author}</td>
              <td>{book.CategoryID}</td>
              <td>{book.PublisherID}</td>
              <td>{book.QuantityIn}</td>
              <td>{book.QuantityOut}</td>
              <td>{book.Price}</td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => handleSetEditedBook(book)}
                >
                  {edit}
                </button>
                {"  "}
                <button
                  className="icon-button"
                  onClick={() => {
                    onDelete(book.BookID);
                  }}
                >
                  {del}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Boolean(editedBook) && (
        <EditBookModal
          show={Boolean(editedBook)}
          book={editedBook}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default BookTable;
