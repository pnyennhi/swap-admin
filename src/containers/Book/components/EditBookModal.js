import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";
import TextAreaInput from "../../../components/TextAreaInput";
import NumberInput from "../../../components/NumberInput";
import DateInput from "../../../components/DateInput";

const EditBookModal = (props) => {
  const { show, book, onClose } = props;

  const initialValues = {
    name: book.name,
    author: book.author,
    type: book.type,
    publisher: book.publisher,
    originalPrice: book.originalPrice,
    price: book.price,
    coverImage: "",
    dimension: book.dimension,
    weight: book.weight,
    numberOfPages: book.numberOfPages,
    info: book.info,
    inputQuantity: book.inputQuantity,
    sold: book.sold,
    inputDate: new Date(book.inputDate),
    coverType: book.coverType,
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    author: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    publisher: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    info: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    price: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    originalPrice: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    dimension: Yup.string().required("Please fill out this field"),
    weight: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    numberOfPages: Yup.number()
      .positive("This field must not be negative")
      .integer("This field must be non-decimal")
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    inputQuantity: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    coverImage: Yup.mixed().required("Please fill out this field"),
  });

  const handleSubmit = (values, actions) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Chỉnh sửa sách
        </h5>
        <button className="close" onClick={() => onClose()}>
          <span>×</span>
        </button>
      </div>

      <Formik
        initialValues={initialValues}
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
                  name="author"
                  component={TextInput}
                  className={
                    errors.author && touched.author
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Tác giả"
                />

                <div class="form-group">
                  <label>Thể loại</label>
                  <select
                    style={{ color: "black" }}
                    class="form-control mb-3"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option selected="" value="Truyện tranh">
                      Truyện tranh
                    </option>
                    <option value="Sách kinh tế">Sách kinh tế</option>
                    <option value="Sách văn học">Sách văn học</option>
                  </select>
                </div>

                <Field
                  type="text"
                  name="publisher"
                  component={TextInput}
                  className={
                    errors.publisher && touched.publisher
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Nhà xuất bản"
                />

                <Field
                  type="text"
                  name="originalPrice"
                  component={NumberInput}
                  className={
                    errors.originalPrice && touched.originalPrice
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.originalPrice}
                  label="Giá gốc (VND)"
                />

                <Field
                  type="text"
                  name="price"
                  component={NumberInput}
                  className={
                    errors.price && touched.price
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.price}
                  label="Giá bán (VND)"
                />

                <div class="form-group">
                  <label>Ảnh bìa</label>
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue("coverImage", event.currentTarget.files[0]);
                    }}
                    className={
                      errors.coverImage && touched.coverImage
                        ? "form-control error"
                        : "form-control"
                    }
                  />
                  {errors.coverImage && touched.coverImage ? (
                    <div className="input-feedback">{errors.coverImage}</div>
                  ) : null}
                </div>

                {values.coverImage ? (
                  <img
                    src={URL.createObjectURL(values.coverImage)}
                    width="100%"
                  />
                ) : null}

                <div>
                  <label>Loại</label>
                  <br />
                  <input
                    type="Radio"
                    id="soft"
                    name="coverType"
                    value="soft"
                    checked={values.coverType === "soft"}
                    onChange={() => {
                      setFieldValue("coverType", "soft");
                    }}
                  />
                  <label htmlFor="soft">Bìa mềm</label>
                  <br />
                  <input
                    type="Radio"
                    id="hard"
                    name="coverType"
                    value="hard"
                    checked={values.coverType === "hard"}
                    onChange={() => {
                      setFieldValue("coverType", "hard");
                    }}
                  />
                  <label htmlFor="hard">Bìa cứng</label>
                  <br />
                </div>

                <Field
                  type="text"
                  name="dimension"
                  component={TextInput}
                  className={
                    errors.dimension && touched.dimension
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Kích thước"
                />

                <Field
                  type="text"
                  name="weight"
                  component={NumberInput}
                  className={
                    errors.weight && touched.weight
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.weight}
                  label="Khối lượng (kg)"
                />

                <Field
                  type="text"
                  name="numberOfPages"
                  component={NumberInput}
                  className={
                    errors.numberOfPages && touched.numberOfPages
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.numberOfPages}
                  label="Số trang"
                />

                <Field
                  type="text"
                  name="info"
                  component={TextAreaInput}
                  className={
                    errors.info && touched.info
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Thông tin"
                />

                <Field
                  type="text"
                  name="inputQuantity"
                  component={NumberInput}
                  className={
                    errors.inputQuantity && touched.inputQuantity
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.inputQuantity}
                  label="Số lượng nhập"
                />

                <Field
                  type="text"
                  name="sold"
                  component={NumberInput}
                  className={
                    errors.sold && touched.sold
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.sold}
                  disabled
                  label="Số lượng bán"
                />

                <Field
                  type="text"
                  name="inputDate"
                  component={DateInput}
                  value={new Date(book.inputDate)}
                  label="Ngày nhập"
                />

                <ErrorFocus />
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-secondary"
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
                <button className="btn btn-primary" onClick={() => onClose()}>
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

export default EditBookModal;
