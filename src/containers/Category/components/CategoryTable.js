import React, { useState } from "react";
import { edit, del, category } from "../../../components/svg/icon";
import EditCategoryModal from "./EditCategoryModal";
import CategoryDetailModal from "./CategoryDetailModal";

const CategoryTable = (props) => {
  const {
    categories,
    selectedCategories,
    onDelete,
    onSelect,
    onSelectAll,
    onSort,
    onEdit,
  } = props;

  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [detailedCategoryId, setDetailedCategoryId] = useState(null);

  const handlesetEditedBookId = (id) => {
    setEditedCategoryId(id);
  };

  const handleCloseEditModal = () => {
    setEditedCategoryId(null);
  };

  const handleCloseDetailModal = () => {
    setDetailedCategoryId(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover dataTable">
        <tr className="tr-header">
          <th>
            {/* <input
              type="checkbox"
              checked={
                selectedCategories.length === categories.length &&
                categories.length > 0
              }
              onChange={(e) => onSelectAll(e)}
            /> */}
          </th>
          <th
            onClick={() => {
              onSort("categoryID");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("category");
            }}
          >
            Thể loại
          </th>
          <th
            onClick={() => {
              onSort("bookTitleCount");
            }}
          >
            Số đầu sách
          </th>

          <th>Action</th>
        </tr>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.categoryID}
              className={
                selectedCategories.indexOf(category.categoryID) > -1
                  ? "selected tr-body"
                  : "tr-body"
              }
            >
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    onSelect(e, category.categoryID);
                  }}
                  checked={selectedCategories.indexOf(category.categoryID) > -1}
                />
              </td>
              <td>{category.categoryID}</td>
              <td>
                <a
                  onClick={() => {
                    setDetailedCategoryId(category.categoryID);
                  }}
                >
                  {category.category}
                </a>
              </td>
              <td>{category.bookTitleCount}</td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => handlesetEditedBookId(category.categoryID)}
                >
                  {edit}
                </button>
                {"  "}
                <button
                  className="icon-button"
                  onClick={() => {
                    onDelete(category.categoryID);
                  }}
                >
                  {del}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(editedCategoryId) && (
        <EditCategoryModal
          show={Boolean(editedCategoryId)}
          categoryId={editedCategoryId}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
        />
      )}

      {Boolean(detailedCategoryId) && (
        <CategoryDetailModal
          show={Boolean(detailedCategoryId)}
          categoryId={detailedCategoryId}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default CategoryTable;
