import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";
import TextAreaInput from "../../../components/TextAreaInput";
import NumberInput from "../../../components/NumberInput";
import DateInput from "../../../components/DateInput";

import { storage } from "../../../firebase";

const EditBookModal = (props) => {
  const { show, book, onClose } = props;

  const initialValues = {
    BookID: book.BookID,
    Name: book.Name,
    Author: book.Author,
    CategoryID: book.CategoryID,
    PublisherID: book.PublisherID,
    OriginalPrice: book.OriginalPrice,
    Price: book.Price,
    ImageLink: "",
    Dimensions: book.Dimensions,
    Weight: book.Weight,
    NumberOfPage: book.NumberOfPage,
    Information: book.Information,
    QuantityIn: book.QuantityIn,
    QuantityOut: book.QuantityOut,
    Date: new Date(book.Date),
    Format: book.Format,
  };

  const SignupSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    Author: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    PublisherID: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    Information: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    Price: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    OriginalPrice: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    Dimensions: Yup.string().required("Please fill out this field"),
    Weight: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    NumberOfPage: Yup.number()
      .positive("This field must not be negative")
      .integer("This field must be non-decimal")
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    QuantityIn: Yup.number()
      .min(0, "Too Short!")
      .max(10000000000, "Too Long!")
      .required("Please fill out this field"),
    ImageLink: Yup.mixed().required("Please fill out this field"),
  });

  const handleSubmit = (values, actions) => {
    // alert(JSON.stringify(values, null, 2));

    const uploadTask = storage
      .ref(`images/${values.ImageLink.name}`)
      .put(values.ImageLink);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(values.ImageLink.name)
          .getDownloadURL()
          .then((url) => {
            values.ImageLink = url;
            // console.log(url);
            console.log(values);
          });
      }
    );

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
                  name="BookID"
                  component={TextInput}
                  className="form-control"
                  label="ID"
                  disabled
                />

                <Field
                  type="text"
                  name="Name"
                  component={TextInput}
                  className={
                    errors.Name && touched.Name
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Tên"
                />

                <Field
                  type="text"
                  name="Author"
                  component={TextInput}
                  className={
                    errors.Author && touched.Author
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
                    name="CategoryID"
                    value={values.CategoryID}
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
                  name="PublisherID"
                  component={TextInput}
                  className={
                    errors.PublisherID && touched.PublisherID
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Nhà xuất bản"
                />

                <Field
                  type="text"
                  name="OriginalPrice"
                  component={NumberInput}
                  className={
                    errors.OriginalPrice && touched.OriginalPrice
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.OriginalPrice}
                  label="Giá gốc (VND)"
                />

                <Field
                  type="text"
                  name="Price"
                  component={NumberInput}
                  className={
                    errors.Price && touched.Price
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.Price}
                  label="Giá bán (VND)"
                />

                <div class="form-group">
                  <label>Ảnh bìa</label>
                  <input
                    type="file"
                    name="ImageLink"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue("ImageLink", event.currentTarget.files[0]);
                    }}
                    className={
                      errors.ImageLink && touched.ImageLink
                        ? "form-control error"
                        : "form-control"
                    }
                  />
                  {errors.ImageLink && touched.ImageLink ? (
                    <div className="input-feedback">{errors.ImageLink}</div>
                  ) : null}
                </div>

                {values.ImageLink ? (
                  <img
                    src={URL.createObjectURL(values.ImageLink)}
                    width="100%"
                  />
                ) : null}

                <div>
                  <label>Loại</label>
                  <br />
                  <input
                    type="Radio"
                    id="soft"
                    name="Format"
                    value="soft"
                    checked={values.Format === "soft"}
                    onChange={() => {
                      setFieldValue("Format", "soft");
                    }}
                  />
                  <label htmlFor="soft">Bìa mềm</label>
                  <br />
                  <input
                    type="Radio"
                    id="hard"
                    name="Format"
                    value="hard"
                    checked={values.Format === "hard"}
                    onChange={() => {
                      setFieldValue("Format", "hard");
                    }}
                  />
                  <label htmlFor="hard">Bìa cứng</label>
                  <br />
                </div>

                <Field
                  type="text"
                  name="Dimensions"
                  component={TextInput}
                  className={
                    errors.Dimensions && touched.Dimensions
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Kích thước"
                />

                <Field
                  type="text"
                  name="Weight"
                  component={NumberInput}
                  className={
                    errors.Weight && touched.Weight
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.Weight}
                  label="Khối lượng (kg)"
                />

                <Field
                  type="text"
                  name="NumberOfPage"
                  component={NumberInput}
                  className={
                    errors.NumberOfPage && touched.NumberOfPage
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.NumberOfPage}
                  label="Số trang"
                />

                <Field
                  type="text"
                  name="Information"
                  component={TextAreaInput}
                  className={
                    errors.Information && touched.Information
                      ? "form-control error"
                      : "form-control"
                  }
                  label="Thông tin"
                />

                <Field
                  type="text"
                  name="QuantityIn"
                  component={NumberInput}
                  className={
                    errors.QuantityIn && touched.QuantityIn
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.QuantityIn}
                  label="Số lượng nhập"
                />

                <Field
                  type="text"
                  name="QuantityOut"
                  component={NumberInput}
                  className={
                    errors.QuantityOut && touched.QuantityOut
                      ? "form-control error"
                      : "form-control"
                  }
                  value={values.QuantityOut}
                  disabled
                  label="Số lượng bán"
                />

                <Field
                  type="text"
                  name="Date"
                  component={DateInput}
                  value={new Date(book.Date)}
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
