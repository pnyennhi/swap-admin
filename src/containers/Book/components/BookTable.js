import React, { useState } from "react";
import { edit, del } from "../../../components/svg/icon";
import CheckBox from "../../../components/CheckBox";
import DeleteBookModal from "./DeleteBookModal";

const BookTable = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(id);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(null);
  };

  const handleDeleteOneBook = (id) => {
    //delete one book API
    setShowDeleteModal(null);
    props.onChangeBooks([id]);
  };

  return (
    <div class="table-responsive">
      <table id="dataTableExample" class="table">
        <tr>
          <th>
            <CheckBox />
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
          {props.books.map((book) => (
            <tr>
              <td>
                <CheckBox />
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
                    handleShowDeleteModal(book.id);
                  }}
                >
                  {del}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteModal && (
        <DeleteBookModal
          show={showDeleteModal === null ? false : true}
          bookId={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteOneBook}
        />
      )}
    </div>
  );
};

export default BookTable;
