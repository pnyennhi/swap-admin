import React, { useState } from "react";

import { profile, editProfile, logout } from "../../../components/svg/icon";

const TopBar = (props) => {
  const [show, setShow] = useState(false);

  const handleToggleDropdown = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // window.location.assign("/login");
    props.onLogout(null);
  };

  return (
    <nav className="navbar">
      <a
        href="#"
        class="sidebar-toggler"
        onClick={() => props.onToggleSidebar()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-menu"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </a>
      <div className="navbar-content">
        <ul className="navbar-nav">
          <li className="nav-item">Hi, Admin</li>
          <li className="nav-item dropdown nav-profile">
            <a
              className="nav-link dropdown-toggle"
              id="profileDropdown"
              onClick={() => handleToggleDropdown()}
            >
              <img
                src="https://pickaface.net/gallery/avatar/20130319_083314_1174_admin.png"
                alt="profile"
              />
            </a>
            <div className={show ? "dropdown-menu show" : "dropdown-menu"}>
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
                    <a className="nav-link" onClick={() => handleLogout()}>
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
  );
};

export default TopBar;
