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

const EditShippingModal = (props) => {
  const { show, districtID, onClose, onEdit } = props;

  const [editedShipping, setEditedShipping] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/shipping/${districtID}`
    ).then((res) => {
      setEditedShipping(res.data);
    });
  }, []);

  const SignupSchema = Yup.object().shape({
    fee: Yup.number()
      .min(2, "Too Short!")
      .max(100000000, "Too Long!")
      .required("Please fill out this field"),
  });

  const handleSubmit = (data, actions) => {
    setIsLoading(true);
    Axios.put(
      `https://bookstoreprojectdut.azurewebsites.net/api/shipping/${districtID}`,
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
        <h5 className="modal-title" id="exampleModalLabel">
          Chỉnh sửa phí vận chuyển
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

      {editedShipping ? (
        <Formik
          enableReinitialize={true}
          initialValues={editedShipping}
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
                    name="districtID"
                    value={editedShipping.districtID}
                    component={TextInput}
                    className="form-control"
                    label="ID"
                    disabled
                  />
                  <Field
                    type="text"
                    name="district"
                    component={TextInput}
                    className={
                      errors.district && touched.district
                        ? "form-control error"
                        : "form-control"
                    }
                    label="Quận, Huyện"
                    disabled
                  />
                  <Field
                    type="text"
                    name="city"
                    component={TextInput}
                    className={
                      errors.city && touched.city
                        ? "form-control error"
                        : "form-control"
                    }
                    label="Tỉnh, Thành phố"
                    disabled
                  />

                  <Field
                    type="text"
                    name="fee"
                    component={NumberInput}
                    className="form-control"
                    value={values.fee}
                    label="Phí ship"
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

export default EditShippingModal;
