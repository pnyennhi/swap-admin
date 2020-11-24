import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { profile, editProfile, logout } from "../../../components/svg/icon";
import Dropdown from "../../../components/Dropdown";
import { useSelector } from "react-redux";

import { deleteUser } from "../../../redux/actions/user";

const TopBar = (props) => {
  const [show, setShow] = useState(false);
  const user = useSelector((store) => store.user);

  const handleToggleDropdown = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    localStorage.removeItem("TOKEN_AUTH");
    deleteUser();
  };

  let history = useHistory();

  const handleClick = (link) => {
    setShow(false);
    history.push(link);
  };

  return (
    <nav className="navbar">
      <a
        href="#"
        className="sidebar-toggler"
        onClick={() => props.onToggleSidebar()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          stroke-linecap="round"
          strokeLinejoin="round"
          className="feather feather-menu"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </a>
      <div className="navbar-content">
        <ul className="navbar-nav">
          <li className="nav-item">Hi, {user?.name}</li>
          <li className="nav-item dropdown nav-profile">
            <a
              className="nav-link dropdown-toggle"
              onClick={() => handleToggleDropdown()}
            >
              <img src={user?.avatarImage} />
            </a>
            {show && (
              <Dropdown onClick={handleToggleDropdown}>
                <div className={show ? "dropdown-menu show" : "dropdown-menu"}>
                  <div className="dropdown-header d-flex flex-column align-items-center">
                    <div className="figure mb-3">
                      <img src={user?.avatarImage} alt="Avatar" />
                    </div>
                    <div className="info text-center">
                      <p className="name font-weight-bold mb-0">
                        {user?.username}
                      </p>
                      <p className="email text-muted mb-3">{user?.role.role}</p>
                    </div>
                  </div>
                  <div className="dropdown-body">
                    <ul className="profile-nav p-0 pt-3">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          onClick={() => handleClick("/profile")}
                        >
                          <i data-feather="user">{profile}</i>
                          <span>Trang cá nhân</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          onClick={() => handleClick("/changepassword")}
                          className="nav-link"
                        >
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
              </Dropdown>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
