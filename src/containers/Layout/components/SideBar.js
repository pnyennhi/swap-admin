import React from "react";
import { dashboard } from "../../../components/svg/icon";

import { NavLink, Link } from "react-router-dom";

import { ROUTES } from "../../../constants";
import { useSelector } from "react-redux";

const SideBar = (props) => {
  const user = useSelector((store) => store.user);
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <Link to="/dashboard" className="sidebar-brand">
          ADMIN <span>website</span>
        </Link>
        <div
          className="sidebar-toggler not-active"
          onClick={() => {
            props.onToggle();
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="sidebar-body">
        <ul
          className="nav"
          onMouseOver={() => props.onOpen()}
          onMouseOut={() => props.onOpen()}
        >
          <NavLink to="/dashboard" className="nav-item">
            <a className="nav-link">
              <i className="link-icon flex">{dashboard}</i>
              <span className="link-title">Dashboard</span>
            </a>
          </NavLink>
          {ROUTES.map((route) =>
            // user?.permissions.indexOf(route.type.toUpperCase()) > -1 ? (
            1 > -1 ? (
              <NavLink to={route.path} className="nav-item" key={route.path}>
                <a className="nav-link">
                  <i className="link-icon flex">{route.icon}</i>
                  <span className="link-title">{route.title}</span>
                </a>
              </NavLink>
            ) : null
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
