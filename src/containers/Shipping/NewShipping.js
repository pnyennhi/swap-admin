import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import ErrorFocus from "../../components/ErrorFocus";
import TextInput from "../../components/TextInput";
import loading from "../../assets/images/loading.gif";
import Axios from "../../Instance";
import { toast } from "react-toastify";

const Shipping = () => {
  const [shipping, setShipping] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/shipping")
      .then((res) => {
        setShipping(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Please fill out this field"),
    baseFee: Yup.number()
      .positive("This field must not be negative")
      .required("Please fill out this field"),
    feePerUnit: Yup.number()
      .positive("This field must not be negative")
      .required("Please fill out this field"),
    minForFree: Yup.number()
      .positive("This field must not be negative")
      .required("Please fill out this field"),
    minTime: Yup.number()
      .positive("This field must not be negative")
      .required("Please fill out this field"),
    maxTime: Yup.number()
      .positive("This field must not be negative")
      .required("Please fill out this field"),
  });

  const handleSubmit = (values) => {
    Axios.put(`http://localhost:3001/shipping/${shipping.id}`, values)
      .then((res) => {
        setShipping(res.data);
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
      });
  };

  return (
    <>
      <nav className="page-breadcrumb flex align-items-center justify-content-between">
        <h5>QUẢN LÝ PHÍ VẬN CHUYỂN</h5>
        <p style={{ fontSize: 12, color: "#888" }}>
          Cập nhật lúc:{" "}
          {new Date(shipping?.updatedAt).toLocaleDateString("en-GB")}{" "}
          {new Date(shipping?.updatedAt).toLocaleTimeString("en-US")}
        </p>
      </nav>
      <div className="card">
        <div className="card-body">
          {shipping ? (
            <Formik
              enableReinitialize={true}
              initialValues={shipping}
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
                    <Field
                      type="text"
                      name="name"
                      component={TextInput}
                      className={
                        errors.name && touched.name
                          ? "form-control error"
                          : "form-control"
                      }
                      label="Phương thức vận chuyển"
                    />

                    <Field
                      type="text"
                      name="baseFee"
                      component={TextInput}
                      className={
                        errors.baseFee && touched.baseFee
                          ? "form-control error"
                          : "form-control"
                      }
                      label="Phí tiêu chuẩn"
                    />
                    <Field
                      type="text"
                      name="feePerUnit"
                      component={TextInput}
                      className={
                        errors.feePerUnit && touched.feePerUnit
                          ? "form-control error"
                          : "form-control"
                      }
                      label="Phí/kg"
                    />
                    <Field
                      type="text"
                      name="minForFree"
                      component={TextInput}
                      className={
                        errors.minForFree && touched.minForFree
                          ? "form-control error"
                          : "form-control"
                      }
                      label="Miễn phí khi tối thiểu"
                    />
                    <Field
                      type="text"
                      name="minTime"
                      component={TextInput}
                      className={
                        errors.minTime && touched.minTime
                          ? "form-control error"
                          : "form-control"
                      }
                      label="Thời gian tối thiểu (ngày)"
                    />
                    <Field
                      type="text"
                      name="maxTime"
                      component={TextInput}
                      className={
                        errors.maxTime && touched.maxTime
                          ? "form-control error"
                          : "form-control"
                      }
                      label="Thời gian tối đa (ngày)"
                    />

                    <ErrorFocus />

                    {/* <img
                  style={{
                    display: isLoading ? "inline" : "none",
                    marginRight: "1rem",
                  }}
                  src={loading}
                  width="6%"
                  alt="loading"
                /> */}

                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={isSubmitting}
                    >
                      Lưu
                    </button>
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <img
              style={{ margin: "20px auto" }}
              src={loading}
              width="10%"
              alt="loading"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Shipping;
