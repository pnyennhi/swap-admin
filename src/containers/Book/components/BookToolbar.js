import React from "react";
import { add } from "../../../components/svg/icon";

const BookToolbar = (props) => {
  const {
    selectedLength,
    onChangeFilters,
    onSearch,
    onShowDeleteModal,
    onShowAddModal,
  } = props;
  return (
    <>
      <div class="row align-items-md-center justify-content-between mb-4">
        <div class="col-sm-12 col-md-8">
          <div className="row align-items-md-center">
            <div class="col-sm-9 col-md-8  dataTables_filter">
              <input
                class="form-control"
                placeholder="Search"
                onChange={(e) => {
                  onChangeFilters("search", e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.keyCode === 13) onSearch();
                }}
              />
            </div>
            <div class="col-sm-3 col-md-4">
              <a
                className="btn btn-primary mr-2 mb-2 mb-md-0 text-white"
                onClick={() => onSearch()}
              >
                Tìm
              </a>
            </div>
          </div>
        </div>

        {selectedLength > 0 && (
          <div class="col-sm-12 col-md-2 text-right">
            <a
              className="btn btn-primary mr-2 mb-2 mb-md-0 text-white"
              onClick={() => {
                onShowDeleteModal(true);
              }}
            >
              <i className="mr-2">{add}</i>
              Delete
            </a>
          </div>
        )}
        <div class="col-sm-12 col-md-2 text-right">
          <a
            className="btn btn-primary mr-2 mb-2 mb-md-0 text-white"
            onClick={() => {
              onShowAddModal(true);
            }}
          >
            <i className="mr-2">{add}</i>
            Thêm
          </a>
        </div>
      </div>
      <div className="row mb-3">
        <div class="col-sm-12 col-md-6">
          <div class="dataTables_length flex align-items-center">
            <span className="mr-2">Show </span>
            <select
              class="custom-select custom-select-sm form-control mr-2"
              style={{ width: "30%" }}
            >
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>{" "}
            <span>entries</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookToolbar;
