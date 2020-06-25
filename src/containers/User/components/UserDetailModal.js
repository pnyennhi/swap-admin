import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modal";

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
    <Modal show={show} maxWidth="910px">
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
                  <div className="form-group">
                    <label>
                      <b>Id</b>
                    </label>
                    <p>{user.applicationUserId}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Tên</b>
                    </label>
                    <p>{user.name}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Email</b>
                    </label>
                    <p>{user.email}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Vai trò</b>
                    </label>
                    <p>{user.role}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Vai trò</b>
                    </label>
                    <p>{user.role}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <b>Ngày đăng ký</b>
                    </label>
                    <p>
                      {new Date(user.accountCreateDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                  </div>
                </div>

                <div className="col-sm-12 col-md-6">
                  <div className="form-group">
                    <label>
                      <b>Avatar</b>
                    </label>
                    <br />
                    <img
                      src={user.avatarLink}
                      alt={user.name}
                      className="preview-image"
                    />
                  </div>
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
