import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

import { toast } from "react-toastify";

const EditUserModal = (props) => {
  const { show, userId, onClose, onEdit } = props;

  const [editedUser, setEditedUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [typeOfFile, setTypeOfFile] = useState("File");

  useEffect(() => {
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/admins/${userId}`
    ).then((res) => {
      setEditedUser(res.data);
    });
  }, []);

  const SignupSchema = Yup.object().shape({
    user: Yup.string().required("Please fill out this field"),
  });

  const handleSubmit = (data, actions) => {
    setIsLoading(true);
    Axios.put(
      `https://bookstoreprojectdut.azurewebsites.net/api/admins/${userId}`,
      data
    )
      .then((res) => {
        console.log(res.status);
        actions.setSubmitting(false);
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success("Edit sách thành công!");
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        setIsLoading(false);
        actions.setSubmitting(false);
      });
  };

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" user="exampleModalLabel">
          Chỉnh sửa người dùng
        </h5>
        <button
          className="close"
          onClick={() => {
            onClose();
            if (isSubmitted) onEdit();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {editedUser ? (
        <Formik
          enableReinitialize={true}
          initialValues={editedUser}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          valuserationSchema={SignupSchema}
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
                  <Field
                    type="text"
                    name="applicationUserId"
                    value={editedUser.applicationUserId}
                    component={TextInput}
                    className="form-control"
                    label="ID"
                    disabled
                  />
                  <Field
                    type="text"
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
                    type="text"
                    name="email"
                    component={TextInput}
                    className={
                      errors.email && touched.email
                        ? "form-control error"
                        : "form-control"
                    }
                    label="Email"
                  />

                  <div className="row">
                    <label className="col-md-7">Ảnh bìa</label>
                    <div className="col-md-5 flex justify-content-between">
                      <div>
                        <input
                          type="Radio"
                          applicationUserId="Upload File"
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
                          applicationUserId="Upload Link"
                          name="typeOfFile"
                          value="Upload Link"
                          checked={typeOfFile === "Link"}
                          onChange={() => setTypeOfFile("Link")}
                        />
                        <label htmlFor="Upload Link">Upload Link</label>
                      </div>
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
                      width="100%"
                      style={{ marginBottom: "1rem" }}
                    />
                  ) : (
                    <img
                      src={values.avatarLink}
                      width="100%"
                      style={{ marginBottom: "1rem" }}
                    />
                  )}
                  <ErrorFocus />
                </div>
                <div className="modal-footer">
                  <img
                    style={{
                      display: isLoading ? "inline" : "none",
                      marginRight: "1rem",
                    }}
                    src={loading}
                    wuserth="6%"
                  />

                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    Lưu
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
                    onClick={() => {
                      onClose();
                      if (isSubmitted) onEdit();
                    }}
                    disabled={isSubmitting}
                  >
                    Hủy
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <img style={{ margin: "20px auto" }} src={loading} width="10%" />
      )}
    </Modal>
  );
};

export default EditUserModal;
