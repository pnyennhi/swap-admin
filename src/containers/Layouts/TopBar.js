import React from "react";

import { profile, editProfile, logout } from "../../components/svg/icon";

const TopBar = () => {
  return (
    <div className="page-wrapper" style={{ minHeight: "0" }}>
      <nav className="navbar">
        <div className="navbar-content">
          <ul className="navbar-nav">
            <li className="nav-item">Hi, Admin</li>
            <li className="nav-item dropdown nav-profile">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="profileDropdown"
              >
                <img
                  src="https://pickaface.net/gallery/avatar/20130319_083314_1174_admin.png"
                  alt="profile"
                />
              </a>
              <div className="dropdown-menu">
                <div className="dropdown-header d-flex flex-column align-items-center">
                  <div className="figure mb-3">
                    <img
                      src="https://pickaface.net/gallery/avatar/20130319_083314_1174_admin.png"
                      alt=""
                    />
                  </div>
                  <div className="info text-center">
                    <p className="name font-weight-bold mb-0">Nguyễn Văn An</p>
                    <p className="email text-muted mb-3">admin01</p>
                  </div>
                </div>
                <div className="dropdown-body">
                  <ul className="profile-nav p-0 pt-3">
                    <li className="nav-item">
                      <a href="pages/general/profile.html" className="nav-link">
                        <i data-feather="user">{profile}</i>
                        <span>Trang cá nhân</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="" className="nav-link">
                        <i data-feather="edit">{editProfile}</i>
                        <span>Đổi mật khẩu</span>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a href="" className="nav-link">
                        <i data-feather="log-out">{logout}</i>
                        <span>Log Out</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
