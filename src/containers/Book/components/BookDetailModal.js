import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modal";

import loading from "../../../assets/images/loading.gif";

import axios from "axios";

const BookDetailModal = (props) => {
  const { show, bookId, onClose, onEdit } = props;

  const [editedBook, setEditedBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://bookstoreprojectdut.azurewebsites.net/api/books/${bookId}`)
      .then((res) => {
        setEditedBook(res.data);
      });
    axios
      .get(`https://bookstoreprojectdut.azurewebsites.net/api/categories/all`)
      .then((res) => {
        setCategories(res.data);
      });
    axios
      .get(`https://bookstoreprojectdut.azurewebsites.net/api/publishers/all`)
      .then((res) => {
        setPublishers(res.data);
      });
  }, []);

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Chỉnh sửa sách
        </h5>
        <button
          className="close"
          onClick={() => {
            onClose();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {editedBook ? (
        <>
          <div className="modal-body">
            <div className="form-detail">
              <div className="form-group">
                <label>
                  <b>Id</b>
                </label>
                <p>{editedBook.bookID}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Tên sách</b>
                </label>
                <p>{editedBook.nameBook}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Tác giả</b>
                </label>
                <p>{editedBook.author}</p>
              </div>

              {/* <div className="form-group">
              <label>
                <b>Thể loại</b>
              </label>
              <p>
                {
                  categories.find(
                    (category) => category.categoryID === editedBook.categoryID
                  ).category
                }
              </p>
            </div> */}

              <div className="form-group">
                <label>
                  <b>Giá gốc</b>
                </label>
                <p>{editedBook.originalPrice}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Giá bán</b>
                </label>
                <p>{editedBook.price}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Ảnh bìa</b>
                </label>
                <br />
                <img src={editedBook.imageLink} alt={editedBook.nameBook} />
              </div>

              <div className="form-group">
                <label>
                  <b>Loại</b>
                </label>
                <p>{editedBook.format}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Kích thước</b>
                </label>
                <p>{editedBook.dimensions}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Khối lượng</b>
                </label>
                <p>{editedBook.weight}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Số trang</b>
                </label>
                <p>{editedBook.numberOfPage}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Thông tin</b>
                </label>
                <p>{editedBook.information}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Số lượng nhập</b>
                </label>
                <p>{editedBook.quantityIn}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Số lượng bán</b>
                </label>
                <p>{editedBook.quantityOut}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Ngày nhập</b>
                </label>
                <p>{`${new Date(editedBook.date).getDate()}/${new Date(
                  editedBook.date
                ).getMonth()}/${new Date(editedBook.date).getFullYear()}`}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => onClose()}>
              Đóng
            </button>
          </div>
        </>
      ) : (
        <img style={{ margin: "20px auto" }} src={loading} width="10%" />
      )}
    </Modal>
  );
};

export default BookDetailModal;
