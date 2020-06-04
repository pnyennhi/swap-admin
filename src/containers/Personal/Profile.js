import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";

const Profile = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    //call API get personal information
    //then setInfo
  }, []);

  const initialValues = {
    UserID: 4,
    Email: "mno",
    Name: "Nguyen Van A",
    registerDate: "10/05/2019",
    Role: 0,
    Status: "active",
    AvatarLink: "",
  };

  const SignupSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please fill out this field"),
    AvatarLink: Yup.mixed().required("Please fill out this field"),
  });

  const handleSubmit = (values, actions) => {
    alert(JSON.stringify(values, null, 2));
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
                          <div class="row align-items-md-center justify-content-between mb-4">
                            <div class="col-sm-12 col-md-4">
                              <div class="form-group">
                                <br />
                                <div style={{ textAlign: "center" }}>
                                  {values.AvatarLink ? (
                                    <img
                                      src={URL.createObjectURL(
                                        values.AvatarLink
                                      )}
                                      width="100%"
                                    />
                                  ) : (
                                    <img
                                      src="https://pickaface.net/gallery/avatar/20130319_083314_1174_admin.png"
                                      alt="profile"
                                    />
                                  )}
                                </div>
                                <br />
                                <input
                                  type="file"
                                  class="form-control"
                                  name="AvatarLink"
                                  accept="image/*"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "AvatarLink",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                  className={
                                    errors.AvatarLink && touched.AvatarLink
                                      ? "form-control error"
                                      : "form-control"
                                  }
                                />
                                {errors.AvatarLink && touched.AvatarLink ? (
                                  <div className="input-feedback">
                                    {errors.AvatarLink}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div class="col-sm-12 col-md-8">
                              <Field
                                type="text"
                                name="UserID"
                                component={TextInput}
                                className="form-control"
                                label="ID"
                                disabled
                              />

                              <Field
                                type="text"
                                name="Email"
                                component={TextInput}
                                className="form-control"
                                label="Email"
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
