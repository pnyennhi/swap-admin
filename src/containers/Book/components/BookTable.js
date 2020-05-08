import React, { useState } from "react";
import { edit, del } from "../../../components/svg/icon";

const BookTable = (props) => {
  const { books, selectedBooks, onDelete, onSelect, onSelectAll } = props;
  return (
    <div class="table-responsive">
      <table id="dataTableExample" class="table">
        <tr>
          <th>
            <input type="checkbox" onChange={(e) => onSelectAll(e)} />
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
                  checked={selectedBooks.indexOf(book.id) > -1 ? true : false}
                />
              </td>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.type}</td>
              <td>{book.publisher}</td>
              <td>{book.quatity}</td>
              <td>{book.sold}</td>
              <td>{book.price}</td>
              <td>
                <button className="icon-button">{edit}</button>
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
      {/* {showDeleteModal && (
        <DeleteBookModal
          show={showDeleteModal === null ? false : true}
          bookId={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteOneBook}
        />
      )} */}
    </div>
  );
};

export default BookTable;
