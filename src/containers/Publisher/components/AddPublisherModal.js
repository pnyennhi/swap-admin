import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";
import { toast } from "react-toastify";

const AddPublisherModal = (props) => {
  const { show, onClose, onAdd } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values, formikBag) => {
    setIsLoading(true);
    Axios.post(`http://localhost:3001/conditions`, values)
      .then((res) => {
        toast.success("Thêm tình trạng thành công");
        setIsLoading(false);
        setIsSubmitted(true);
        formikBag.resetForm({ values: "" });
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        setIsLoading(false);
        setIsSubmitted(true);
        formikBag.resetForm({ values: "" });
      });
  };

  const handleClose = () => {
    onClose();
    if (isSubmitted) onAdd();
  };

  const initialValues = {
    condition: "",
    description: "",
  };

  const SignupSchema = Yup.object().shape({
    condition: Yup.string().required("Please fill out this field"),
    description: Yup.string().required("Please fill out this field"),
  });

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Thêm tình trạng
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
                <Field
                  type="text"
                  name="condition"
                  component={TextInput}
                  className={
                    errors.condition && touched.condition
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Tình trạng"
                />

                <Field
                  type="text"
                  name="description"
                  component={TextInput}
                  className={
                    errors.description && touched.description
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Mô tả"
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
                  Hủy
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddPublisherModal;
