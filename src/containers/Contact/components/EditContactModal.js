import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";
import TextAreaInput from "../../../components/TextAreaInput";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

import { toast } from "react-toastify";

import { CONTACT_STATUS } from "../../../constants";

const STATUSES = CONTACT_STATUS.map((status) => status.id);

const EditContactModal = (props) => {
  const { show, contactId, onClose, onEdit } = props;

  const [editedContact, setEditedContact] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/contacts/${contactId}`
    ).then((res) => {
      setEditedContact(res.data);
    });
  }, []);

  const handleSubmit = (actions) => {
    setIsLoading(true);
    const newStatus = STATUSES[STATUSES.indexOf(editedContact.status) + 1];
    Axios.put(
      `https://bookstoreprojectdut.azurewebsites.net/api/contacts/${contactId}`,
      { status: newStatus }
    )
      .then((res) => {
        console.log(res.status);
        actions.setSubmitting(false);
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success("Edit liên hệ thành công!");
        setEditedContact({ ...editedContact, status: newStatus });
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
          Chỉnh sửa liên hệ
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

      {editedContact ? (
        <Formik
          enableReinitialize={true}
          initialValues={editedContact}
          onSubmit={(values, actions) => handleSubmit(actions)}
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
                    name="contactID"
                    value={editedContact.contactID}
                    component={TextInput}
                    className="form-control"
                    label="ID"
                    disabled
                  />
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
                    className="form-control"
                    label="Tên"
                    disabled
                  />
                  <Field
                    type="text"
                    name="phone"
                    component={TextInput}
                    className="form-control"
                    label="Số điện thoại"
                    disabled
                  />
                  <Field
                    type="text"
                    name="message"
                    component={TextAreaInput}
                    className="form-control"
                    label="Nội dung"
                    disabled
                  />
                  <div className="form-group">
                    <label>
                      <b>Ngày gửi</b>
                    </label>
                    <input
                      className="form-control"
                      value={new Date(editedContact.date).toLocaleDateString(
                        "en-GB"
                      )}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <b>Tình trạng</b>
                    </label>
                    <span
                      className={`ml-3 badge ${
                        CONTACT_STATUS.find(
                          (status) => status.id === editedContact.status
                        )?.color
                      }`}
                    >
                      {
                        CONTACT_STATUS.find(
                          (status) => status.id === editedContact.status
                        )?.status
                      }
                    </span>
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

                  {editedContact.status !== 2 && (
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={isSubmitting}
                    >
                      {
                        CONTACT_STATUS.find(
                          (status) => status.id === editedContact.status
                        ).nextStep
                      }
                    </button>
                  )}

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      onClose();
                      if (isSubmitted) onEdit();
                    }}
                    disabled={isSubmitting}
                  >
                    Đóng
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

export default EditContactModal;
