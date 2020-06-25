import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modal";

import loading from "../../../assets/images/loading.gif";

// import Axios from "Axios";
import Axios from "../../../Instance";

const BookDetailModal = (props) => {
  const { show, bookId, onClose, onEdit } = props;

  const [book, setBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/books/${bookId}`
    ).then((res) => {
      setBook(res.data);
    });
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/categories/all`
    ).then((res) => {
      setCategories(res.data);
    });
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/publishers/all`
    ).then((res) => {
      setPublishers(res.data);
    });
  }, []);

  return (
    <Modal show={show} maxWidth="75%">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Chi tiết sách
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

      {book ? (
        <>
          <div className="modal-body">
            <div className="form-detail">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group">
                    <label>
                      <b>Id</b>
                    </label>
                    <p>{book.bookID}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Tên sách</b>
                    </label>
                    <p>{book.nameBook}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Tác giả</b>
                    </label>
                    <p>{book.author}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Thể loại</b>
                    </label>
                    <p>
                      {
                        categories.find(
                          (category) => category.categoryID === book.categoryID
                        )?.category
                      }
                    </p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Nhà xuất bản</b>
                    </label>
                    <p>
                      {
                        publishers.find(
                          (publisher) =>
                            publisher.publisherID === book.publisherID
                        )?.publisher
                      }
                    </p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Giá gốc</b>
                    </label>
                    <p>{book.originalPrice}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Giá bán</b>
                    </label>
                    <p>{book.price}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Kích thước</b>
                    </label>
                    <p>{book.dimensions}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Khối lượng</b>
                    </label>
                    <p>{book.weight}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Số trang</b>
                    </label>
                    <p>{book.numberOfPage}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Số lượng nhập</b>
                    </label>
                    <p>{book.quantityIn}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Số lượng bán</b>
                    </label>
                    <p>{book.quantityOut}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Ngày nhập</b>
                    </label>
                    <p>{new Date(book.date).toLocaleDateString("en-GB")}</p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="form-group">
                    <label>
                      <b>Ảnh bìa</b>
                    </label>
                    <br />
                    <img
                      src={book.imageLink}
                      alt={book.nameBook}
                      className="preview-image"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Loại</b>
                    </label>
                    <p>{book.format}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Thông tin</b>
                    </label>
                    <div style={{ height: "300px", overflowY: "auto" }}>
                      {book.information}
                    </div>
                  </div>
                </div>
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
