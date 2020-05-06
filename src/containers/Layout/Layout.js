import React, { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const Layout = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [openSidebarFolded, setOpenSidebarFolded] = useState(false);
  const [showSidebarRes, setShowSidebarRes] = useState(false);

  const handleToggleSidebar = () => {
    if (window.innerWidth > 991) setShowSidebar(!showSidebar);
    else setShowSidebarRes(!showSidebarRes);
  };

  const handleToggleOpenSidebarFolded = () => {
    if (!showSidebar) setOpenSidebarFolded(!openSidebarFolded);
  };

  const handleToggleSidebarResponsive = () => {
    setShowSidebarRes(!showSidebarRes);
  };

  let classname = "sidebar-dark";
  if (showSidebarRes) classname += " sidebar-open";
  else {
    if (!showSidebar) classname += " sidebar-folded";
    if (openSidebarFolded) classname += " open-sidebar-folded";
  }

  return (
    <div className={classname}>
      <div className="main-wrapper">
        <SideBar
          onToggle={handleToggleSidebar}
          onOpen={handleToggleOpenSidebarFolded}
        />
        <div className="page-wrapper" style={{ minHeight: "0" }}>
          <TopBar onToggleSidebar={handleToggleSidebarResponsive} />
          <div className="page-content">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
