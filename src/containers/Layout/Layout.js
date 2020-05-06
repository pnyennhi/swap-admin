import React, { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const Layout = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [openSidebarFolded, setOpenSidebarFolded] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleToggleOpenSidebarFolded = () => {
    if (!showSidebar) setOpenSidebarFolded(!openSidebarFolded);
  };

  let classname = "";
  if (!showSidebar) classname += "sidebar-folded";
  if (openSidebarFolded) classname += " open-sidebar-folded";

  return (
    <div className={classname}>
      <div className="main-wrapper">
        <SideBar
          onToggle={handleToggleSidebar}
          onOpen={handleToggleOpenSidebarFolded}
        />
        <div className="page-wrapper" style={{ minHeight: "0" }}>
          <TopBar />
          <div className="page-content">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
