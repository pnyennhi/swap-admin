import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

import Modal from "../../../components/Modal";
import { PRODUCT_STATUS } from "../../../constants";

import loading from "../../../assets/images/loading.gif";
import "react-image-gallery/styles/css/image-gallery.css";

// import Axios from "Axios";
import Axios from "../../../Instance";

const BookDetailModal = (props) => {
  const { show, bookId, onClose, onEdit } = props;

  const [book, setBook] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:3001/products/${bookId}`).then((res) => {
      setBook(res.data);

      const images = res.data.images.map((image) => ({
        original: image.imageLink,
        thumbnail: image.imageLink,
      }));

      images.unshift({
        original: res.data.coverImage,
        thumbnail: res.data.coverImage,
      });
      setImages(images);
    });
    // Axios.get(
    //   `http://localhost:3001/productStatus`
    // ).then((res) => {
    //   setStatus(res.data);
    // });
    // Axios.get(`http://localhost:3001/categories`).then((res) => {
    //   setCategories(res.data);
    // });
  }, []);

  return (
    <Modal show={show} maxWidth="900px">
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
                <div className="col-sm-12 col-md-7">
                  {/* <img src={book.imageLink} className="preview-image" /> */}
                  <ImageGallery
                    items={images}
                    showPlayButton={false}
                    showFullscreenButton={false}
                  />
                </div>
                <div className="col-sm-12 col-md-5">
                  <h4 className="mb-1">{book.name}</h4>
                  <div className="mb-4 flex justify-content-between">
                    <p>
                      <i>
                        Ngày đăng:{" "}
                        {new Date(book.createdAt).toLocaleDateString("en-GB")}
                      </i>
                    </p>
                    <span
                      className={`badge ${
                        PRODUCT_STATUS.find(
                          (status) => status.status === book.status?.status
                        )?.color
                      }`}
                    >
                      {book.status?.status}
                    </span>
                  </div>
                  <h4 className="mb-3">
                    $ {new Number(book.price).toFixed(2)}
                  </h4>

                  <table className="detail-table">
                    <tbody>
                      <tr>
                        <td className="font-weight-bold">Người bán:</td>
                        <td className="pl-3">{book.owner.email}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Danh mục:</td>
                        <td className="pl-3">
                          {book.category.parent.category} /
                          {book.category.subCategory}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Tình trạng:</td>
                        <td className="pl-3">{book.condition.condition}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Thương hiệu:</td>
                        <td className="pl-3">{book.brand}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Kích cỡ:</td>
                        <td className="pl-3">{book.size} kg</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Chất liệu:</td>
                        <td className="pl-3">{book.material}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Số lượng:</td>
                        <td className="pl-3">
                          {new Number(book.quantity).toLocaleString("vi-VI")}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Đã bán:</td>
                        <td className="pl-3">
                          {new Number(book.soldQuantity).toLocaleString(
                            "vi-VI"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="mb-2">
                  <b>Mô tả sản phẩm</b>
                </p>
                <p>{book.description}</p>
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
