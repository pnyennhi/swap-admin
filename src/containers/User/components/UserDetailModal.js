import React, { useEffect, useState } from "react";
import { Tabs } from "antd";

import Modal from "../../../components/Modal";

import { email, role } from "../../../components/svg/icon";
import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

const { TabPane } = Tabs;

const UserDetailModal = (props) => {
  const { show, userId, onClose } = props;

  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:3001/users/${userId}`).then((res) => {
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
                <div className="col-sm-12 col-md-12">
                  <img src={user.coverImage} className="cover-image user" />
                </div>
                <div className="col-12">
                  <img src={user.avatarImage} className="preview-image user" />
                </div>
                <div className="mt-1 col-12 text-center">
                  <h4 className="mb-1">{user.username}</h4>
                  <p>
                    <i>
                      Ngày đăng kí:{" "}
                      {new Date(user.createdAt).toLocaleString("en-GB")}
                    </i>
                  </p>
                  <div
                    className={`badge mt-1 ${
                      user.isActive ? "badge-success" : "badge-secondary"
                    }`}
                  >
                    {user.isActive ? "Available" : "Unavailable"}
                  </div>
                </div>
                <div className="col-11 mt-3" style={{ margin: "auto" }}>
                  <Tabs defaultActiveKey="1" tabPosition="left">
                    <TabPane tab="Thông tin người dùng" key="userInfo">
                      <p>
                        {email} {user.email}
                      </p>
                      <p>
                        {role} {user.role.role}
                      </p>
                    </TabPane>
                    <TabPane tab="Thông tin bán hàng" key="sellerInfo">
                      Content of Tab Pane 2
                    </TabPane>
                  </Tabs>
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
