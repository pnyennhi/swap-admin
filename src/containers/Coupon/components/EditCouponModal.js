import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";
import NumberInput from "../../../components/NumberInput";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

import { toast } from "react-toastify";

const EditCouponModal = (props) => {
  const { show, couponId, onClose, onEdit } = props;

  const [editedCoupon, setEditedCoupon] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/coupons/${couponId}`
    ).then((res) => {
      setEditedCoupon(res.data);
    });
  }, []);

  const SignupSchema = Yup.object().shape({
    couponID: Yup.string().required("Please fill out this field"),
    discount: Yup.number()
      .min(0, "Too Short!")
      .max(100, "Too Long!")
      .required("Please fill out this field"),
    quantity: Yup.number()
      .min(
        editedCoupon?.quantityUsed,
        "Total must be more than used coupon quantity"
      )
      .required("Please fill out this field"),
  });

  const handleSubmit = (data, actions) => {
    setIsLoading(true);
    Axios.put(
      `https://bookstoreprojectdut.azurewebsites.net/api/coupons/${couponId}`,
      data
    )
      .then((res) => {
        console.log(res.status);
        actions.setSubmitting(false);
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success("Edit mã giảm giá thành công!");
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
        <h5 className="modal-title" id="exampleModalLabel">
          Chỉnh sửa mã giảm giá
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

      {editedCoupon ? (
        <Formik
          enableReinitialize={true}
          initialValues={editedCoupon}
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
                    name="couponID"
                    component={TextInput}
                    className={
                      errors.couponID && touched.couponID
                        ? "form-control error"
                        : "form-control"
                    }
                    label="ID"
                    disabled
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
                  <Field
                    type="text"
                    name="quantityUsed"
                    component={NumberInput}
                    className="form-control"
                    value={values.quantityUsed ? values.quantityUsed : 0}
                    label="Số mã đã dùng"
                    disabled
                  />
                  <div className="form-group">
                    <label>Tình trạng</label>
                    <select
                      style={{ color: "black" }}
                      className="form-control mb-3"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={values.quantity <= values.quantityUsed}
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

export default EditCouponModal;
