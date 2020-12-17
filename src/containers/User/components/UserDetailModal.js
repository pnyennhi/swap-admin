import React, { useEffect, useState } from "react";
import { Tabs, Divider } from "antd";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import Modal from "../../../components/Modal";

import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";

import { camera } from "../../../components/svg/icon";
import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";
import { uploadImage } from "../../../firebase/uploadImage";

const { TabPane } = Tabs;

const UserDetailModal = (props) => {
  const { show, userId, onClose } = props;

  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderStatistic, setOrderStatistic] = useState([]);
  const [productStatus, setProductStatus] = useState([]);
  const [productStatistic, setProductStatistic] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loggedUser = useSelector((store) => store.user);

  useEffect(() => {
    Axios.get(`http://localhost:3001/users/${userId}`).then((res) => {
      setUser(res.data);
    });
    Axios.get(`http://localhost:3001/orderStatus/`).then((res) => {
      setOrderStatus(res.data);
    });
    Axios.get(`http://localhost:3001/orders/seller/statistic/${userId}`).then(
      (res) => {
        setOrderStatistic(res.data);
      }
    );
    Axios.get(`http://localhost:3001/productStatus/`).then((res) => {
      setProductStatus(res.data);
    });
    Axios.get(`http://localhost:3001/products/seller/statistic/${userId}`).then(
      (res) => {
        setProductStatistic(res.data);
      }
    );
  }, []);

  useEffect(() => {
    if (avatar) {
      uploadImage(avatar)
        .then((res) => {
          Axios.put(`http://localhost:3001/users/${userId}`, {
            avatarImage: res,
          })
            .then((res) => {
              toast.success("Upload avatar thành công");
            })
            .catch((err) => {
              toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
            });
        })
        .catch((err) => {
          toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        });
    }
  }, [avatar]);

  useEffect(() => {
    if (cover) {
      uploadImage(cover)
        .then((res) => {
          Axios.put(`http://localhost:3001/users/${userId}`, {
            coverImage: res,
          })
            .then((res) => {
              toast.success("Upload ảnh bìa thành công");
            })
            .catch((err) => {
              toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
            });
        })
        .catch((err) => {
          toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        });
    }
  }, [cover]);

  return (
    <Modal show={show} maxWidth="900px">
      <div className="modal-header">
        <h5 className="modal-title">Chi tiết người dùng</h5>
        <button
          className="close"
          onClick={() => {
            onClose();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {user ? (
        <>
          <div className="modal-body">
            <div className="form-detail">
              <div className="row">
                <div className="col-sm-12 col-md-12 position-relative">
                  <img
                    alt="cover"
                    src={cover ? URL.createObjectURL(cover) : user?.coverImage}
                    className="cover-image user"
                  />
                  <label htmlFor="coverImage" className="label-upload-cover">
                    {camera} Upload picture
                  </label>
                  <input
                    type="file"
                    name="coverImage"
                    id="coverImage"
                    accept="image/*"
                    onChange={(event) => {
                      setCover(event.currentTarget.files[0]);
                    }}
                    hidden
                    className="upload-image-input"
                  />
                </div>
                <div className="col-12">
                  <div className="position-relative avatar-wrapper">
                    <img
                      alt="avatar"
                      src={
                        avatar ? URL.createObjectURL(avatar) : user?.avatarImage
                      }
                      className="preview-image user"
                    />{" "}
                    <label
                      htmlFor="avatarImage"
                      className="label-upload-avatar"
                    >
                      {camera}
                    </label>
                    <input
                      type="file"
                      name="avatarImage"
                      id="avatarImage"
                      accept="image/*"
                      onChange={(event) => {
                        setAvatar(event.currentTarget.files[0]);
                      }}
                      hidden
                      className="upload-image-input"
                    />
                  </div>
                </div>
                <div className="mt-1 col-12 text-center">
                  <h4 className="mb-1">{user.username}</h4>
                  <p>
                    <i>
                      Ngày đăng kí:{" "}
                      {new Date(user.createdAt).toLocaleString("en-GB")}
                    </i>
                  </p>
                  <div
                    className={`badge mt-1 ${
                      user.isActive ? "badge-success" : "badge-secondary"
                    }`}
                  >
                    {user.isActive ? "Available" : "Unavailable"}
                  </div>
                </div>
                <div className="col-11 mt-3" style={{ margin: "auto" }}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Thông tin người dùng" key="userInfo">
                      {user && (
                        <Formik
                          enableReinitialize={true}
                          initialValues={user}
                          // onSubmit={(values, actions) => handleSubmit(values, actions)}
                          // valuserationSchema={SignupSchema}
                        >
                          {(props) => {
                            const {
                              values,
                              touched,
                              errors,
                              dirty,
                              isSubmitting,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              handleReset,
                              setFieldValue,
                            } = props;

                            return (
                              <Form>
                                <Field
                                  type="text"
                                  name="id"
                                  component={TextInput}
                                  className="form-control"
                                  label="Id"
                                  disabled
                                />
                                <Field
                                  type="text"
                                  name="username"
                                  component={TextInput}
                                  className={
                                    errors.username && touched.username
                                      ? "form-control error"
                                      : "form-control"
                                  }
                                  label="Username"
                                  disabled
                                />

                                <Field
                                  type="email"
                                  name="email"
                                  component={TextInput}
                                  className={
                                    errors.email && touched.email
                                      ? "form-control error"
                                      : "form-control"
                                  }
                                  label="Email"
                                  disabled
                                />

                                <div className="form-group">
                                  <label>
                                    <b>Vai trò</b>
                                  </label>
                                  <select
                                    style={{ color: "black" }}
                                    className="form-control mb-3"
                                    name="role"
                                    value={values.roleId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={loggedUser.id === user.id}
                                  >
                                    <option value="1">Admin</option>
                                    <option value="2">Người dùng</option>
                                  </select>
                                </div>

                                <ErrorFocus />
                              </Form>
                            );
                          }}
                        </Formik>
                      )}
                    </TabPane>
                    <TabPane tab="Thông tin bán hàng" key="sellerInfo">
                      <h6 className="mb-4">Sản phẩm</h6>
                      <div className="row">
                        {productStatus.map((status, index) => (
                          <div className="col-20 text-center">
                            <h4>{productStatistic[index]}</h4>
                            <p>{status.status}</p>
                          </div>
                        ))}
                      </div>
                      <Divider />
                      <h6 className="mb-4">Đơn hàng</h6>
                      <div className="row">
                        {orderStatus.map((status, index) => (
                          <div className="col-2 text-center">
                            <h4>{orderStatistic[index]}</h4>
                            <p>{status.status}</p>
                          </div>
                        ))}
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => onClose()}>
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

export default UserDetailModal;
