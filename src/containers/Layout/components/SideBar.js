import React from "react";
import {
  dashboard,
  user,
  book,
  type,
  coupon,
  invoice,
  review,
  reply,
  shipping,
  subscribe,
} from "../../../components/svg/icon";

const SideBar = () => {
  return (
    <div className="sidebar-dark">
      <nav className="sidebar">
        <div className="sidebar-header">
          <a href="#" className="sidebar-brand">
            ADMIN <span>website</span>
          </a>
          <div className="sidebar-toggler not-active">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="sidebar-body">
          <ul className="nav">
            {/* <li className="nav-item">
              <Link to="/">
                <a href="dashboard-one.html" className="nav-link">
                  <i className="link-icon flex">{dashboard}</i>
                  <span className="link-title">Dashboard</span>
                </a>
              </Link>
            </li> */}
            <li className="nav-item">
              <a href="dashboard-one.html" className="nav-link">
                <i className="link-icon flex">{dashboard}</i>
                <span className="link-title">Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="dashboard-one.html" className="nav-link">
                <i className="link-icon flex">{user}</i>
                <span className="link-title">Quản lí người dùng</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="dashboard-one.html" className="nav-link">
                <i className="link-icon flex">{book}</i>
                <span className="link-title">Quản lí sách</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="dashboard-one.html" className="nav-link">
                <i className="link-icon flex">{type}</i>
                <span className="link-title">Quản lí thể loại sách</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="dashboard-one.html" className="nav-link">
                <i className="link-icon flex">{coupon}</i>
                <span className="link-title">Quản lí mã giảm giá</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="dashboard-one.html" className="nav-link">
                <i className="link-icon flex">{invoice}</i>
                <span className="link-title">Quản lí đơn hàng</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="dashboard-one.html" className="nav-link">
                <i className="link-icon flex">{review}</i>
                <span className="link-title">Quản lí đánh giá</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="dashboard-one.html" className="nav-link">
                <i className="link-icon flex">{reply}</i>
                <span className="link-title">Quản lí phản hồi</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="dashboard-one.html" className="nav-link">
                <i className="link-icon flex">{shipping}</i>
                <span className="link-title">Quản lí phí vận chuyển</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="dashboard-one.html" className="nav-link">
                <i className="link-icon flex">{subscribe}</i>
                <span className="link-title">Quản lí người theo dõi</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
