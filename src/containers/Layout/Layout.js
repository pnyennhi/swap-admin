import React, { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const Layout = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div className={showSidebar ? "" : "sidebar-folded"}>
      <div className="main-wrapper">
        <SideBar onToggle={handleToggleSidebar} />
        <div className="page-wrapper" style={{ minHeight: "0" }}>
          <TopBar />
          <div className="page-content">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
