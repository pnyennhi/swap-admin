import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modal";

import { email, role } from "../../../components/svg/icon";
import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

const UserDetailModal = (props) => {
  const { show, userId, onClose } = props;

  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/admins/${userId}`
    ).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <Modal show={show} maxWidth="750px">
      <div className="modal-header">
        <h5 className="modal-title">Chi tiết người dùng</h5>
        <button
          className="close"
          onClick={() => {
            onClose();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {user ? (
        <>
          <div className="modal-body">
            <div className="form-detail">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <img src={user.avatarLink} className="preview-image user" />
                </div>
                <div className="mt-5 col-sm-12 col-md-6">
                  <h4 className="mb-1">{user.name}</h4>
                  <div className="mb-5 flex justify-content-between">
                    <span
                      className={`badge ${
                        user.status ? "badge-success" : "badge-secondary"
                      }`}
                    >
                      {user.status ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <p>
                    {email} {user.email}
                  </p>
                  <p>
                    {role} {user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={() => onClose()}>
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

export default UserDetailModal;
