import React from "react";
import { del } from "../../../components/svg/icon";

const CategoryToolbar = (props) => {
  const {
    onChangeSearch,
    onChangePageSize,
    onSearch,
    onShowDeleteModal,
  } = props;
  return (
    <>
      <div className="row mb-4 justify-content-between">
        <div class="col-sm-12 col-md-5">
          <div class="dataTables_length flex align-items-center">
            <span className="mr-2">Show </span>
            <select
              class="custom-select custom-select-sm form-control mr-2"
              style={{ width: "30%" }}
              onChange={(e) => {
                onChangePageSize(e.target.value);
              }}
            >
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>{" "}
            <span>entries</span>
          </div>
        </div>

        <div className="col-sm-12 col-md-6">
          <div className="row justify-content-end align-items-center">
            <div class="col-sm-9 col-md-8 dataTables_filter">
              <input
                class="form-control"
                placeholder="Search"
                onChange={(e) => {
                  onChangeSearch(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.keyCode === 13) onSearch();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryToolbar;
