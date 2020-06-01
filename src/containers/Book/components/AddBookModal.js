import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";
import TextAreaInput from "../../../components/TextAreaInput";
import NumberInput from "../../../components/NumberInput";
import DateInput from "../../../components/DateInput";

const AddBookModal = (props) => {
  const { show, onClose, onAdd } = props;

  useEffect(() => {
    //call API to get list of types, PublisherIDs when mounted
  }, []);

  const initialValues = {
    Name: "",
    Author: "",
    CategoryID: "0",
    PublisherID: "",
    OriginalPrice: "",
    Price: "",
    ImageLink: "",
    Dimensions: "",
    Weight: "",
    NumberOfPage: "",
    Information: "",
    QuantityIn: "",
    Date: new Date(),
    Format: "soft",
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
    Dimensions: Yup.number().required("Please fill out this field"),
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
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Thêm sách
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
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option selected="" value="0">
                      Truyện tranh
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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
                  label="Số lượng nhập"
                />

                <Field
                  type="text"
                  name="Date"
                  component={DateInput}
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
                  Thêm
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

export default AddBookModal;
