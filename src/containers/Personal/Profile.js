import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";

import Axios from "../../Instance";
import { uploadImage } from "../../firebase/uploadImage";

import { toast } from "react-toastify";

const Profile = () => {
  const [info, setInfo] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [typeOfFile, setTypeOfFile] = useState("File");

  useEffect(() => {
    //call API get personal information
    //then setInfo
    setIsLoading(true);
    Axios()
      .get(`https://bookstoreprojectdut.azurewebsites.net/api/admins`)
      .then((res) => {
        setInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    avatarLink: Yup.mixed().required("Please fill out this field"),
  });

  const handleSubmit = (values, actions) => {
    setIsLoading(true);
    if (values.avatarLink.name) {
      uploadImage(values.avatarLink)
        .then((res) => {
          values.avatarLink = res;
          console.log(values);
          handleEditProfile(values, actions);
        })
        .catch((err) => {
          toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
          setIsLoading(false);
          actions.setSubmitting(false);
        });
    } else {
      handleEditProfile(values, actions);
    }
  };

  const handleEditProfile = (data, actions) => {
    Axios()
      .put(`https://bookstoreprojectdut.azurewebsites.net/api/admins`, data)
      .then((res) => {
        console.log(res.status);
        actions.setSubmitting(false);
        setIsLoading(false);
        toast.success("Edit trang cá nhân thành công!");
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        setIsLoading(false);
        actions.setSubmitting(false);
      });
  };

  return (
    <>
      <nav class="page-breadcrumb flex align-items-center justify-content-between">
        <h5>TRANG CÁ NHÂN</h5>
      </nav>
      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="row align-items-md-center justify-content-between mb-4">
                <div class="col-sm-12 col-md-10" style={{ margin: "auto" }}>
                  <Formik
                    enableReinitialize={true}
                    initialValues={info}
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
                          <div class="row align-items-md-center justify-content-between mb-4">
                            <div class="col-sm-12 col-md-4">
                              <div class="form-group">
                                <br />
                                <div style={{ textAlign: "center" }}>
                                  {!values?.avatarLink ? null : values
                                      .avatarLink.name ? (
                                    <img
                                      src={URL.createObjectURL(
                                        values.avatarLink
                                      )}
                                      width="100%"
                                    />
                                  ) : (
                                    <img src={values.avatarLink} width="100%" />
                                  )}
                                </div>
                                <br />
                                <div className="flex">
                                  <div style={{ marginRight: "1rem" }}>
                                    <input
                                      type="Radio"
                                      id="Upload File"
                                      name="typeOfFile"
                                      value="Upload File"
                                      checked={typeOfFile === "File"}
                                      onChange={() => setTypeOfFile("File")}
                                    />
                                    <label htmlFor="Upload File">
                                      Upload File
                                    </label>
                                  </div>

                                  <div>
                                    <input
                                      type="Radio"
                                      id="Upload Link"
                                      name="typeOfFile"
                                      value="Upload Link"
                                      checked={typeOfFile === "Link"}
                                      onChange={() => setTypeOfFile("Link")}
                                    />
                                    <label htmlFor="Upload Link">
                                      Upload Link
                                    </label>
                                  </div>
                                </div>
                                {typeOfFile === "File" ? (
                                  <div className="form-group">
                                    <input
                                      type="file"
                                      name="avatarLink"
                                      accept="image/*"
                                      onChange={(event) => {
                                        setFieldValue(
                                          "avatarLink",
                                          event.currentTarget.files[0]
                                        );
                                      }}
                                      className={
                                        errors.avatarLink && touched.avatarLink
                                          ? "form-control error"
                                          : "form-control"
                                      }
                                    />
                                    {errors.avatarLink && touched.avatarLink ? (
                                      <div className="input-feedback">
                                        {errors.avatarLink}
                                      </div>
                                    ) : null}
                                  </div>
                                ) : (
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      name="avatarLink"
                                      onChange={(event) => {
                                        setFieldValue(
                                          "avatarLink",
                                          event.target.value
                                        );
                                      }}
                                      className={
                                        errors.avatarLink && touched.avatarLink
                                          ? "form-control error"
                                          : "form-control"
                                      }
                                    />
                                    {errors.avatarLink && touched.avatarLink ? (
                                      <div className="input-feedback">
                                        {errors.avatarLink}
                                      </div>
                                    ) : null}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div class="col-sm-12 col-md-8">
                              <Field
                                type="text"
                                name="email"
                                component={TextInput}
                                className="form-control"
                                label="Email"
                                disabled
                              />

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
                                name="role"
                                component={TextInput}
                                className="form-control"
                                label="Role"
                                disabled
                              />

                              <div style={{ textAlign: "right" }}>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  disabled={isSubmitting}
                                >
                                  Lưu
                                </button>
                              </div>
                            </div>
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

export default Profile;
