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
    <Modal show={show} maxWidth="700px">
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
                  <img src={book.imageLink} className="preview-image" />
                </div>
                <div className="col-sm-12 col-md-6">
                  <h4 className="mb-1">{book.nameBook}</h4>
                  <div className="mb-4 flex justify-content-between">
                    <p>
                      <i>
                        Ngày nhập:{" "}
                        {new Date(book.date).toLocaleDateString("en-GB")}
                      </i>
                    </p>
                    <span
                      className={`badge ${
                        book.status ? "badge-success" : "badge-secondary"
                      }`}
                    >
                      {book.status ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <h4 className="mb-3">
                    {new Number(book.price).toLocaleString("vi-VI")}
                  </h4>

                  <table className="detail-table">
                    <tbody>
                      <tr>
                        <td className="font-weight-bold">Tác giả:</td>
                        <td className="pl-3">{book.author}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Thể loại:</td>
                        <td className="pl-3">
                          {
                            categories.find(
                              (category) =>
                                category.categoryID === book.categoryID
                            )?.category
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Nhà xuất bản:</td>
                        <td className="pl-3">
                          {
                            categories.find(
                              (category) =>
                                category.categoryID === book.categoryID
                            )?.category
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Loại:</td>
                        <td className="pl-3">{book.format}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Kích thước:</td>
                        <td className="pl-3">{book.dimensions}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Khối lượng:</td>
                        <td className="pl-3">{book.weight} kg</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Số trang:</td>
                        <td className="pl-3">{book.numberOfPage}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Giá gốc:</td>
                        <td className="pl-3">
                          {new Number(book.originalPrice).toLocaleString(
                            "vi-VI"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Số lượng nhập:</td>
                        <td className="pl-3">
                          {new Number(book.quantityIn).toLocaleString("vi-VI")}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Số lượng bán:</td>
                        <td className="pl-3">
                          {new Number(book.quantityOut).toLocaleString("vi-VI")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="mb-2">
                  <b>Thông tin</b>
                </p>
                <p>{book.information}</p>
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
