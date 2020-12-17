import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

import { toast } from "react-toastify";

const EditCategoryModal = (props) => {
  const { show, categoryId, isSub, onClose, onEdit } = props;

  const [editedCategory, setEditedCategory] = useState(null);
  const [parents, setParents] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    Axios.get(
      `http://localhost:3001/${
        isSub ? "subCategories" : "categories"
      }/${categoryId}`
    )
      .then((res) => {
        setEditedCategory(
          !isSub ? res.data : { ...res.data, category: res.data.subCategory }
        );
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
      });
    Axios.get(`http://localhost:3001/categories/all`).then((res) => {
      setParents(res.data);
    });
  }, []);

  const SignupSchema = Yup.object().shape({
    category: Yup.string().required("Please fill out this field"),
  });

  const handleSubmit = (data, actions) => {
    data.subCategory = data.category;

    setIsLoading(true);
    Axios.put(
      `http://localhost:3001/${
        isSub ? "subCategories" : "categories"
      }/${categoryId}`,
      data
    )
      .then((res) => {
        console.log(res.status);
        actions.setSubmitting(false);
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success("Edit thể loại thành công!");
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
          Chỉnh sửa thể loại
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

      {editedCategory ? (
        <Formik
          enableReinitialize={true}
          initialValues={editedCategory}
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
                    name="id"
                    value={editedCategory.id}
                    component={TextInput}
                    className="form-control"
                    label="ID"
                    disabled
                  />
                  <Field
                    type="text"
                    name="category"
                    component={TextInput}
                    className={
                      errors.category && touched.category
                        ? "form-control error"
                        : "form-control"
                    }
                    label="Tên"
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
                      disabled={isSub ? false : true}
                    >
                      <option
                        value={undefined}
                        style={{ display: isSub ? "none" : "block" }}
                      ></option>
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

export default EditCategoryModal;
