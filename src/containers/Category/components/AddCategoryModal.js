import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";
import { toast } from "react-toastify";

const AddCategoryModal = (props) => {
  const { show, onClose, onAdd } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [parents, setParents] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/categories/all`).then((res) => {
      setParents(res.data);
    });
  }, []);

  const handleSubmit = (values, formikBag) => {
    setIsLoading(true);
    const data = { ...values };
    if (data.parentId) data.subCategory = data.category;
    Axios.post(
      `http://localhost:3001/${data.parentId ? "subCategories" : "categories"}`,
      data
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
    category: "",
    // path: "",
    parentId: "",
  };

  const SignupSchema = Yup.object().shape({
    category: Yup.string().required("Please fill out this field"),
    // path: Yup.string().required("Please fill out this field"),
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
                  name="category"
                  component={TextInput}
                  className={
                    errors.category && touched.category
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Tên thể loại"
                />
                {/* <Field
                  type="text"
                  name="path"
                  component={TextInput}
                  className={
                    errors.path && touched.path
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Đường dẫn"
                /> */}
                <div className="form-group">
                  <label>
                    <b>Thể loại cha</b>
                  </label>
                  <select
                    style={{ color: "black" }}
                    className="form-control mb-3"
                    name="parentId"
                    value={values.parentId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={undefined}></option>
                    {parents.map((parent) => (
                      <option value={parent.id}>{parent.category}</option>
                    ))}
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

export default AddCategoryModal;
