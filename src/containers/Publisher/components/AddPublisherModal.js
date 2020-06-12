import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";

import loading from "../../../assets/images/loading.gif";

import axios from "axios";
import { toast } from "react-toastify";

const AddPublisherModal = (props) => {
  const { show, onClose, onAdd } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values, formikBag) => {
    setIsLoading(true);
    axios
      .post(
        `https://bookstoreprojectdut.azurewebsites.net/api/publishers`,
        values
      )
      .then((res) => {
        toast.success("Thêm thể loại thành công");
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
    publisher: "",
  };

  const SignupSchema = Yup.object().shape({
    publisher: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
  });

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Thêm thể loại
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
                  name="publisher"
                  component={TextInput}
                  className={
                    errors.publisher && touched.publisher
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Tên thể loại"
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
                  className="btn btn-secondary"
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
                  className="btn btn-primary"
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
