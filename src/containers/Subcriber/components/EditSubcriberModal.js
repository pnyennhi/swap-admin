import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";

import loading from "../../../assets/images/loading.gif";

import axios from "axios";

import { toast } from "react-toastify";

const EditSubcriberModal = (props) => {
  const { show, subcriberId, onClose, onEdit } = props;

  const [editedSubcriber, setEditedSubcriber] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://bookstoreprojectdut.azurewebsites.net/api/subcribers/${subcriberId}`
      )
      .then((res) => {
        setEditedSubcriber(res.data);
      });
  }, []);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().required("Please fill out this field"),
  });

  const handleSubmit = (data, actions) => {
    setIsLoading(true);
    axios
      .put(
        `https://bookstoreprojectdut.azurewebsites.net/api/subcribers/${subcriberId}`,
        data
      )
      .then((res) => {
        console.log(res.status);
        actions.setSubmitting(false);
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success("Edit người theo dõi thành công!");
      })
      .catch((err) => {
        if (err.response.data.message.includes("Email")) {
          formikBag.setFieldError("email", err.response.data.message);
        } else {
          toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        }
        setIsLoading(false);
        actions.setSubmitting(false);
      });
  };

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Chỉnh sửa người theo dõi
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

      {editedSubcriber ? (
        <Formik
          enableReinitialize={true}
          initialValues={editedSubcriber}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
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
                  <Field
                    type="text"
                    name="subcriberID"
                    value={editedSubcriber.subcriberId}
                    component={TextInput}
                    className="form-control"
                    label="ID"
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
                  />
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

export default EditSubcriberModal;
