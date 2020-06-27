import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modal";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

const ContactDetailModal = (props) => {
  const { show, contactId, onClose } = props;

  const [contact, setContact] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/contacts/${contactId}`
    ).then((res) => {
      setContact(res.data);
    });
  }, []);

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title">Chi tiết liên hệ</h5>
        <button
          className="close"
          onClick={() => {
            onClose();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {contact ? (
        <>
          <div className="modal-body">
            <div className="form-detail">
              <div className="form-group">
                <label>
                  <b>Id</b>
                </label>
                <p>{contact.contactID}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Email</b>
                </label>
                <p>{contact.email}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Tên</b>
                </label>
                <p>{contact.name}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Số điện thoại</b>
                </label>
                <p>{contact.phone}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Nội dung</b>
                </label>
                <p>{contact.message}</p>
              </div>

              <div className="form-group">
                <label>
                  <b>Ngày gửi</b>
                </label>
                <p>{new Date(contact.date).toLocaleDateString("en-GB")}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => onClose()}>
              Đóng
            </button>
          </div>
        </>
      ) : (
        <img style={{ margin: "20px auto" }} src={loading} width="10%" />
      )}
    </Modal>
  );
};

export default ContactDetailModal;
