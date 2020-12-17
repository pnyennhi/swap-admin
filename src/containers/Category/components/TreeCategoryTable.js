import React, { useState, useEffect } from "react";
import { TreeTable, TreeState } from "cp-react-tree-table";
import "./index.css";
import { edit, del } from "../../../components/svg/icon";
import EditCategoryModal from "./EditCategoryModal";

export default (props) => {
  const [treeValue, setTreeValue] = useState(
    TreeState.create(props.categories)
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [detailedCategoryId, setDetailedCategoryId] = useState(null);

  const treeTableRef = React.createRef();

  const handlesetEditedBookId = (id) => {
    setEditedCategoryId(id);
  };

  const handleCloseEditModal = () => {
    setEditedCategoryId(null);
  };

  const handleCloseDetailModal = () => {
    setDetailedCategoryId(null);
  };

  const handleOnChange = (newValue) => {
    setTreeValue(newValue);
  };

  const handleOnScroll = (newValue) => {};

  const handleToggle = () => {
    setTreeValue(
      isExpanded
        ? TreeState.collapseAll(treeValue)
        : TreeState.expandAll(treeValue)
    );
    setIsExpanded(!isExpanded);
  };

  const renderHeaderCell = (name, alignLeft = true) => {
    return () => {
      return <span className="align-left">{name}</span>;
    };
  };

  const renderCategoryCell = (row) => {
    return (
      <div
        style={{ paddingLeft: row.metadata.depth * 15 + "px", outline: "none" }}
      >
        <button
          className={`toggle-button ${row.$state.isExpanded ? "expanded" : ""}`}
          onClick={row.toggleChildren}
          disabled={!row.metadata.hasChildren}
        >
          <span>{row.data.category}</span>
        </button>
      </div>
    );
  };

  const renderTotalCell = (row) => {
    return <span>{row.data.totalProducts}</span>;
  };

  const renderPathCell = (row) => {
    return <span>{row.data.path}</span>;
  };

  const renderActionsCell = (row) => {
    return (
      <>
        <button
          className="icon-button"
          style={{ marginRight: "10px" }}
          onClick={() => setEditedCategoryId(row.data)}
        >
          {edit}
        </button>

        {/* <button
          className="icon-button"
          onClick={() => {
            props.onDelete(row.data.id);
          }}
        >
          {del}
        </button> */}
      </>
    );
  };

  return (
    <>
      <button className="toggle-btn" onClick={() => handleToggle()}>
        {isExpanded ? "Thu gọn" : "Mở rộng"}
      </button>
      <TreeTable
        className="demo-tree-table"
        height="360"
        headerHeight="40"
        value={treeValue}
        onChange={handleOnChange}
        ref={treeTableRef}
        onScroll={handleOnScroll}
      >
        <TreeTable.Column
          renderCell={renderCategoryCell}
          renderHeaderCell={renderHeaderCell("Thể loại")}
          basis="180px"
          grow="0"
        />
        <TreeTable.Column
          renderCell={renderPathCell}
          renderHeaderCell={renderHeaderCell("Đường dẫn")}
        />
        <TreeTable.Column
          renderCell={renderTotalCell}
          renderHeaderCell={renderHeaderCell("Tổng sản phẩm", false)}
        />
        <TreeTable.Column
          renderCell={renderActionsCell}
          renderHeaderCell={renderHeaderCell("Actions", false)}
        />
      </TreeTable>

      <p className="mt-4">
        There are{" "}
        {props.categories.reduce(
          (sum, category) => (sum += category.children.length),
          0
        ) + props.categories.length}{" "}
        entries in total
      </p>

      {Boolean(editedCategoryId) && (
        <EditCategoryModal
          show={Boolean(editedCategoryId)}
          categoryId={editedCategoryId.id}
          isSub={editedCategoryId.subCategory}
          onClose={handleCloseEditModal}
          onEdit={props.onEdit}
        />
      )}
    </>
  );
  // }
};
