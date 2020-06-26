import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";
import TextAreaInput from "../../../components/TextAreaInput";
import NumberInput from "../../../components/NumberInput";
import DateInput from "../../../components/DateInput";

import { uploadImage } from "../../../firebase/uploadImage";

import loading from "../../../assets/images/loading.gif";

// import Axios from "Axios";
import { toast } from "react-toastify";
import Axios from "../../../Instance";

const AddUserModal = (props) => {
  const { show, onClose, onAdd } = props;

  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [typeOfFile, setTypeOfFile] = useState("File");

  useEffect(() => {
    //call API to get list of types, PublisherIDs when mounted
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/admins/getrole`
    ).then((res) => {
      setRoles(res.data.map((role) => role.name));
    });
  }, []);

  const handleSubmit = (values, formikBag) => {
    setIsLoading(true);
    if (values.avatarLink.name) {
      uploadImage(values.avatarLink)
        .then((res) => {
          values.avatarLink = res;
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
    data.status = !!data.status;

    let api =
      // data.role === "Admin"
      //   ? `https://bookstoreprojectdut.azurewebsites.net/api/admins/addadmin`
      `https://bookstoreprojectdut.azurewebsites.net/api/admins/adduser`;

    Axios.post(api, data)
      .then((res) => {
        console.log(res.status);
        formikBag.setSubmitting(false);
        formikBag.resetForm({ values: "" });
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success("Thêm người dùng thành công!");
      })
      .catch((err) => {
        if (err.response.data.errors[0].code === "DuplicateUserName") {
          formikBag.setFieldError(
            "email",
            err.response.data.errors[0].description
          );
        } else {
          toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        }
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
    name: "",
    confirmedPassword: "",
    role: "User",
    avatarLink: "",
    status: true,
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Please fill out this field"),
    email: Yup.string().required("Please fill out this field"),
    password: Yup.string()
      .min(6, "Password must be more than 6 characters")
      .required("Please fill out this field"),
    confirmedpassword: Yup.string().oneOf(
      [Yup.ref("newpassword"), null],
      "Passwords must match"
    ),
    avatarLink: Yup.mixed().required("Please fill out this field"),
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
                  <div className="col-sm-12 col-md-6">
                    <Field
                      type="text"
                      name="name"
                      component={TextInput}
                      className={
                        errors.name && touched.name
                          ? "form-control error"
                          : "form-control"
                      }
                      label="Tên"
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
                    <div className="form-group">
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
                      >
                        {roles.map((role) => {
                          return (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        <b>Tình trạng</b>
                      </label>
                      <select
                        style={{ color: "black" }}
                        className="form-control mb-3"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="true">Đang hoạt động</option>
                        <option value="false">Bị khóa</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <label>
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
                          name="avatarLink"
                          accept="image/*"
                          onChange={(event) => {
                            setFieldValue(
                              "avatarLink",
                              event.currentTarget.files[0]
                            );
                          }}
                          className={
                            errors.avatarLink && touched.avatarLink
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.avatarLink && touched.avatarLink ? (
                          <div className="input-feedback">
                            {errors.avatarLink}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="form-group">
                        <input
                          type="text"
                          name="avatarLink"
                          onChange={(event) => {
                            setFieldValue("avatarLink", event.target.value);
                          }}
                          className={
                            errors.avatarLink && touched.avatarLink
                              ? "form-control error"
                              : "form-control"
                          }
                        />
                        {errors.avatarLink && touched.avatarLink ? (
                          <div className="input-feedback">
                            {errors.avatarLink}
                          </div>
                        ) : null}
                      </div>
                    )}

                    {!values.avatarLink ? null : values.avatarLink.name ? (
                      <img
                        src={URL.createObjectURL(values.avatarLink)}
                        className="preview-image user"
                        style={{ marginBottom: "1rem" }}
                      />
                    ) : (
                      <img
                        src={values.avatarLink}
                        className="preview-image user"
                        style={{ marginBottom: "1rem" }}
                      />
                    )}
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
