import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";
import NumberInput from "../../../components/NumberInput";

import loading from "../../../assets/images/loading.gif";

import axios from "axios";
import { toast } from "react-toastify";

const AddCouponModal = (props) => {
  const { show, onClose, onAdd } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values, formikBag) => {
    setIsLoading(true);
    axios
      .post(`https://bookstoreprojectdut.azurewebsites.net/api/coupons`, values)
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
        formikBag.resetForm({ values: initialValues });
      });
  };

  const handleClose = () => {
    onClose();
    if (isSubmitted) onAdd();
  };

  const initialValues = {
    couponID: "",
    discount: 0,
    quantity: 0,
    status: "Available",
  };

  const SignupSchema = Yup.object().shape({
    couponID: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    discount: Yup.number()
      .min(0, "Too Short!")
      .max(100, "Too Long!")
      .required("Please fill out this field"),
    quantity: Yup.number()
      .min(0, "Too Short!")
      .max(100000000000, "Too Long!")
      .required("Please fill out this field"),
  });

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Thêm mã giảm gía
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
                  name="couponID"
                  component={TextInput}
                  className={
                    errors.couponID && touched.couponID
                      ? "form-control error"
                      : "form-control"
                  }
                  label="ID"
                />
                <Field
                  type="text"
                  name="discount"
                  component={NumberInput}
                  className={
                    errors.discount && touched.discount
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Tỉ lệ giảm (%)"
                />
                <Field
                  type="text"
                  name="quantity"
                  component={NumberInput}
                  className={
                    errors.quantity && touched.quantity
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Tổng số mã"
                />
                <div class="form-group">
                  <label>Tình trạng</label>
                  <select
                    style={{ color: "black" }}
                    class="form-control mb-3"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
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

export default AddCouponModal;
