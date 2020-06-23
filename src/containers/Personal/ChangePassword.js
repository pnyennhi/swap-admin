import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";
import Axios from "../../Instance";
import { toast } from "react-toastify";
import loading from "../../assets/images/loading.gif";

const ChangePass = () => {
  const initialValues = {
    oldpassword: "",
    newpassword: "",
    confirmedpassword: "",
  };

  const SignupSchema = Yup.object().shape({
    oldpassword: Yup.string().required("Please fill out this field"),
    newpassword: Yup.string()
      .min(6, "Password must be more than 6 characters")
      .required("Please fill out this field"),
    confirmedpassword: Yup.string().oneOf(
      [Yup.ref("newpassword"), null],
      "Passwords must match"
    ),
  });

  const handleSubmit = (values, actions) => {
    Axios.put(
      `https://bookstoreprojectdut.azurewebsites.net/api/applicationuser/changepassword`,
      values
    )
      .then((res) => {
        toast.success("Đổi mật khẩu thành công");
        actions.setSubmitting(false);
      })
      .catch((err) => {
        if (err.response.data.message === "Old password is incorrect!") {
          actions.setFieldError("oldpassword", err.response.data.message);
        } else {
          toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        }
        actions.setSubmitting(false);
      });
  };

  return (
    <>
      <nav className="page-breadcrumb flex align-items-center justify-content-center">
        <h5>ĐỔI MẬT KHẨU</h5>
      </nav>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div
            className="card"
            style={{ width: "0", minWidth: "600px", margin: "auto" }}
          >
            <div className="card-body">
              <div className="row align-items-md-center justify-content-between my-3">
                <div className="col-12 col-md-11 mx-auto">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) =>
                      handleSubmit(values, actions)
                    }
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
                          <div className="form-group">
                            <div className="row">
                              <div className="col-md-4 text-right">
                                <label style={{ paddingTop: "7px" }}>
                                  Mật khẩu cũ
                                </label>
                              </div>
                              <div className="col-md-8">
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Mật khẩu cũ"
                                  name="oldpassword"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "oldpassword",
                                      e.target.value
                                    );
                                  }}
                                />
                                {errors.oldpassword && touched.oldpassword ? (
                                  <div className="input-feedback">
                                    {errors.oldpassword}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-md-4 text-right">
                                <label style={{ paddingTop: "7px" }}>
                                  Mật khẩu mới
                                </label>
                              </div>
                              <div className="col-md-8">
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Mật khẩu mới"
                                  name="newpassword"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "newpassword",
                                      e.target.value
                                    );
                                  }}
                                />
                                {errors.newpassword && touched.newpassword ? (
                                  <div className="input-feedback">
                                    {errors.newpassword}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-md-4 text-right">
                                <label style={{ paddingTop: "7px" }}>
                                  Xác nhận mật khẩu mới
                                </label>
                              </div>
                              <div className="col-md-8">
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Xác nhận mật khẩu mới"
                                  name="confirmedpassword"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "confirmedpassword",
                                      e.target.value
                                    );
                                  }}
                                />
                                {errors.confirmedpassword &&
                                touched.confirmedpassword ? (
                                  <div className="input-feedback">
                                    {errors.confirmedpassword}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-content-end">
                            {isSubmitting ? (
                              <img
                                src={loading}
                                width="5%"
                                style={{ marginRight: "1rem" }}
                              />
                            ) : null}
                            <button
                              type="submit"
                              className="btn btn-success"
                              disabled={isSubmitting}
                            >
                              Lưu
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePass;
