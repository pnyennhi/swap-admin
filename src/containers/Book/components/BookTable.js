import React, { useState } from "react";
import { edit, del, book } from "../../../components/svg/icon";
import EditBookModal from "./EditBookModal";

const BookTable = (props) => {
  const { books, selectedBooks, onDelete, onSelect, onSelectAll } = props;

  const [editedBook, setEditedBook] = useState(null);

  const handleSetEditedBook = (id) => {
    setEditedBook(id);
  };

  const handleCloseEditModal = () => {
    setEditedBook(null);
  };

  return (
    <div class="table-responsive">
      <table id="dataTableExample" class="table">
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
          <th>Id</th>
          <th>Tên</th>
          <th>Tác giả</th>
          <th>Thể loại</th>
          <th>Nhà xuất bản</th>
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
                    onSelect(e, book.id);
                  }}
                  checked={selectedBooks.indexOf(book.id) > -1}
                />
              </td>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.type}</td>
              <td>{book.publisher}</td>
              <td>{book.inputQuantity}</td>
              <td>{book.sold}</td>
              <td>{book.price}</td>
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
                    onDelete(book.id);
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
