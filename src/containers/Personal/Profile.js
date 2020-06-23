import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import Axios from "../../Instance";
import { uploadImage } from "../../firebase/uploadImage";

import { toast } from "react-toastify";

import loading from "../../assets/images/loading.gif";
import { email, role, edit, check, close } from "../../components/svg/icon";

import { useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/user";

const Profile = () => {
  const info = useSelector((store) => store.user);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [typeOfFile, setTypeOfFile] = useState("File");
  const [isEditMode, setIsEditMode] = useState(false);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    avatarLink: Yup.mixed().required("Please fill out this field"),
  });

  const handleSubmit = (values, actions) => {
    if (values.avatarLink.name) {
      uploadImage(values.avatarLink)
        .then((res) => {
          values.avatarLink = res;
          console.log(values);
          handleEditProfile(values, actions);
        })
        .catch((err) => {
          toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
          actions.setSubmitting(false);
        });
    } else {
      handleEditProfile(values, actions);
    }
  };

  const handleEditProfile = (data, actions) => {
    Axios.put(`https://bookstoreprojectdut.azurewebsites.net/api/admins`, data)
      .then((res) => {
        actions.setSubmitting(false);
        toast.success("Edit trang cá nhân thành công!");
        setIsEditMode(false);
        updateUser(res.data);
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
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
              {isLoading ? (
                <img
                  src={loading}
                  width="50px"
                  style={{ display: "block", margin: "auto" }}
                />
              ) : hasError ? (
                <p style={{ color: "red" }}>Đã có lỗi xảy ra</p>
              ) : (
                <div class="row align-items-md-center justify-content-between mb-4">
                  <div class="col-sm-12 col-md-9" style={{ margin: "auto" }}>
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
                            <div class="row justify-content-between mb-4 profile">
                              <div class="col-sm-12 col-md-4">
                                <div class="form-group">
                                  <div style={{ textAlign: "center" }}>
                                    {!values?.avatarLink ? null : values
                                        .avatarLink.name ? (
                                      <img
                                        src={URL.createObjectURL(
                                          values.avatarLink
                                        )}
                                        width="100%"
                                        className="avatar"
                                      />
                                    ) : (
                                      <img
                                        src={values.avatarLink}
                                        width="100%"
                                        className="avatar"
                                      />
                                    )}
                                  </div>
                                  <br />
                                  <div className="flex justify-content-center">
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
                                          handleSubmit();
                                        }}
                                        className={
                                          errors.avatarLink &&
                                          touched.avatarLink
                                            ? "form-control error"
                                            : "form-control"
                                        }
                                      />
                                      {errors.avatarLink &&
                                      touched.avatarLink ? (
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
                                          errors.avatarLink &&
                                          touched.avatarLink
                                            ? "form-control error"
                                            : "form-control"
                                        }
                                      />
                                      {errors.avatarLink &&
                                      touched.avatarLink ? (
                                        <div className="input-feedback">
                                          {errors.avatarLink}
                                        </div>
                                      ) : null}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div class="col-sm-12 col-md-8 info">
                                <div className="mb-5">
                                  {isEditMode ? (
                                    <>
                                      <div className="flex align-items-md-center">
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="name"
                                          defaultValue={values.name}
                                          onChange={(e) => {
                                            setFieldValue(
                                              "name",
                                              e.target.value
                                            );
                                          }}
                                        />

                                        <button
                                          className="icon-button"
                                          type="submit"
                                        >
                                          {check}
                                          {"     "}
                                        </button>
                                        <span
                                          className="icon-button"
                                          onClick={() => {
                                            setIsEditMode(false);
                                            handleReset();
                                          }}
                                        >
                                          {close}
                                        </span>
                                      </div>
                                      {errors.name && touched.name ? (
                                        <div className="input-feedback">
                                          {errors.name}
                                        </div>
                                      ) : null}
                                    </>
                                  ) : (
                                    <>
                                      <h3 className="mr-3">
                                        {info?.name}{" "}
                                        <span
                                          className="icon-button"
                                          onClick={() => setIsEditMode(true)}
                                        >
                                          {edit}
                                        </span>
                                      </h3>
                                    </>
                                  )}
                                </div>
                                <p>
                                  {email} {info?.email}
                                </p>
                                <p>
                                  {role} {info?.role}
                                </p>

                                {/* <div style={{ textAlign: "right" }}>
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
                                </div> */}
                              </div>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
