import React from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const Layout = (props) => {
  return (
    <div className="main-wrapper">
      <SideBar />
      <div className="page-wrapper" style={{ minHeight: "0" }}>
        <TopBar />
        <div className="page-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
