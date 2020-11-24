/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";
// import TextAreaInput from "../../../components/TextAreaInput";
// import NumberInput from "../../../components/NumberInput";
// import DateInput from "../../../components/DateInput";
import { camera } from "../../../components/svg/icon";

import { uploadImage } from "../../../firebase/uploadImage";

import loading from "../../../assets/images/loading.gif";

// import Axios from "Axios";
import { toast } from "react-toastify";
import Axios from "../../../Instance";
import { useSelector } from "react-redux";

const AddUserModal = (props) => {
  const { show, onClose, onAdd } = props;

  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [typeOfFile, setTypeOfFile] = useState("File");

  const loggedUser = useSelector((store) => store.user);

  // useEffect(() => {
  //   //call API to get list of types, PublisherIDs when mounted
  //   Axios.get(
  //     `https://bookstoreprojectdut.azurewebsites.net/api/admins/getrole`
  //   ).then((res) => {
  //     setRoles(res.data.map((role) => role.name));
  //   });
  // }, []);

  const handleSubmit = (values, formikBag) => {
    setIsLoading(true);
    if (values.avatarImage.name) {
      uploadImage(values.avatarImage)
        .then((res) => {
          values.avatarImage = res;
          console.log(values);
          handleAddUser(values, formikBag);
        })
        .catch((err) => {
          toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
          setIsLoading(false);
          formikBag.setSubmitting(false);
        });
    } else {
      handleAddUser(values, formikBag);
    }
  };

  const handleAddUser = (data, formikBag) => {
    data.isActive =
      data.isActive === "true" || data.isActive === true ? true : false;

    let api = `http://localhost:3001/users`;

    Axios.post(api, data)
      .then((res) => {
        console.log(res.isActive);
        formikBag.setSubmitting(false);
        formikBag.resetForm({ values: "" });
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success("Thêm người dùng thành công!");
      })
      .catch((err) => {
        // if (err.response.data.errors[0].code === "DuplicateUserName") {
        //   formikBag.setFieldError(
        //     "email",
        //     err.response.data.errors[0].description
        //   );
        // } else {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        // }
        setIsLoading(false);
        formikBag.setSubmitting(false);
      });
  };

  const handleClose = () => {
    onClose();
    if (isSubmitted) onAdd();
  };

  const initialValues = {
    email: "",
    password: "",
    username: "",
    confirmedPassword: "",
    // role: "User",
    avatarImage: "",
    isActive: true,
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Please fill out this field"),
    email: Yup.string().required("Please fill out this field"),
    password: Yup.string()
      .min(6, "Password must be more than 6 characters")
      .required("Please fill out this field"),
    confirmedpassword: Yup.string().oneOf(
      [Yup.ref("newpassword"), null],
      "Passwords must match"
    ),
    phone: Yup.string().required("Please fill out this field"),
    // avatarImage: Yup.mixed().required("Please fill out this field"),
  });

  return (
    <Modal show={show} maxWidth="910px">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Thêm người dùng
        </h5>
        <button className="close" onClick={handleClose}>
          <span>×</span>
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
        validationSchema={SignupSchema}
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
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-12 col-md-12 position-relative">
                    <img
                      // src="https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg"
                      src={
                        values.coverImage
                          ? URL.createObjectURL(values.coverImage)
                          : "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg"
                      }
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
                        setFieldValue(
                          "coverImage",
                          event.currentTarget.files[0]
                        );
                      }}
                      hidden
                      className="upload-image-input"
                    />
                  </div>
                  <div className="col-12">
                    <div className="position-relative avatar-wrapper">
                      <img
                        src={
                          values.avatarImage
                            ? URL.createObjectURL(values.avatarImage)
                            : "https://static.toiimg.com/photo/76729750.cms"
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
                          setFieldValue(
                            "avatarImage",
                            event.currentTarget.files[0]
                          );
                        }}
                        hidden
                        className="upload-image-input"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
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
                    />

                    <Field
                      type="password"
                      name="password"
                      component={TextInput}
                      className={
                        errors.password && touched.password
                          ? "form-control error"
                          : "form-control"
                      }
                      label="Mật khẩu"
                    />

                    <Field
                      type="password"
                      name="confirmedPassword"
                      component={TextInput}
                      className={
                        errors.confirmedPassword && touched.confirmedPassword
                          ? "form-control error"
                          : "form-control"
                      }
                      label="Nhập lại mật khẩu"
                    />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    {/* <div className="form-group">
                      <label>
                        <b>Vai trò</b>
                      </label>
                      <select
                        style={{ color: "black" }}
                        className="form-control mb-3"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // disabled={loggedUser.role !== "Admin"}
                      >
                        {roles.map((role) => {
                          return (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          );
                        })}
                      </select>
                    </div> */}

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
                    />
                    <Field
                      type="text"
                      name="phone"
                      component={TextInput}
                      className={
                        errors.phone && touched.phone
                          ? "form-control error"
                          : "form-control"
                      }
                      label="Số điện thoại"
                    />

                    <div className="form-group">
                      <label>
                        <b>Tình trạng</b>
                      </label>
                      <select
                        style={{ color: "black" }}
                        className="form-control mb-3"
                        name="isActive"
                        value={values.isActive}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="true">Đang hoạt động</option>
                        <option value="false">Bị khóa</option>
                      </select>
                    </div>
                    {/* <label>
                      <b>Avatar</b>
                    </label>
                    <div className="flex">
                      <div style={{ marginRight: "1rem" }}>
                        <input
                          type="Radio"
                          id="Upload File"
                          name="typeOfFile"
                          value="Upload File"
                          checked={typeOfFile === "File"}
                          onChange={() => setTypeOfFile("File")}
                        />
                        <label htmlFor="Upload File">Upload File</label>
                      </div>

                      <div>
                        <input
                          type="Radio"
                          id="Upload Link"
                          name="typeOfFile"
                          value="Upload Link"
                          checked={typeOfFile === "Link"}
                          onChange={() => setTypeOfFile("Link")}
                        />
                        <label htmlFor="Upload Link">Upload Link</label>
                      </div>
                    </div>

                    {typeOfFile === "File" ? (
                      <div className="form-group">
                        <input
                          type="file"
                          name="avatarImage"
                          accept="image/*"
                          onChange={(event) => {
                            setFieldValue(
                              "avatarImage",
                              event.currentTarget.files[0]
                            );
                          }}
                          className={
                            errors.avatarImage && touched.avatarImage
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.avatarImage && touched.avatarImage ? (
                          <div className="input-feedback">
                            {errors.avatarImage}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="form-group">
                        <input
                          type="text"
                          name="avatarImage"
                          onChange={(event) => {
                            setFieldValue("avatarImage", event.target.value);
                          }}
                          className={
                            errors.avatarImage && touched.avatarImage
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.avatarImage && touched.avatarImage ? (
                          <div className="input-feedback">
                            {errors.avatarImage}
                          </div>
                        ) : null}
                      </div>
                    )}

                    {!values.avatarImage ? null : values.avatarImage.name ? (
                      <img
                        src={URL.createObjectURL(values.avatarImage)}
                        className="preview-image user"
                        style={{ marginBottom: "1rem" }}
                      />
                    ) : (
                      <img
                        src={values.avatarImage}
                        className="preview-image user"
                        style={{ marginBottom: "1rem" }}
                      />
                    )} */}
                  </div>
                </div>

                <ErrorFocus />
              </div>
              <div className="modal-footer">
                <img
                  style={{
                    display: isLoading ? "inline" : "none",
                    marginRight: "1rem",
                  }}
                  src={loading}
                  width="6%"
                />
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isSubmitting}
                >
                  Thêm
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Đóng
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddUserModal;
