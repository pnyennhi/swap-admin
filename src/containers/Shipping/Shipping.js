import React, { useState, useEffect } from "react";

import ShippingTable from "./components/ShippingTable";
import ShippingToolbar from "./components/ShippingToolbar";
// import DeleteShippingModal from "./components/DeleteShippingModal";
// import AddShippingModal from "./components/AddShippingModal";
import Pagination from "../../components/Pagination";

import { add } from "../../components/svg/icon";
import loading from "../../assets/images/loading.gif";

import Axios from "../../Instance";
import queryString from "query-string";
import { toast } from "react-toastify";

const Shipping = () => {
  const [shippings, setShippings] = useState([]);

  const [search, setSearch] = useState(null);
  const [totalRows, setTotalRows] = useState(21);
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
    keyword: null,
    criteria: null,
    sort: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    //call API get when filters change (get shipping list)
    handleGetBook();
  }, [filters]);

  const handleGetBook = () => {
    let query;
    if (filters.keyword && filters.criteria)
      query = queryString.stringify(filters);
    else if (!filters.keyword && !filters.criteria)
      query = queryString.stringify({
        page: filters.page,
        pageSize: filters.pageSize,
      });
    else if (filters.keyword && !filters.criteria)
      query = queryString.stringify({
        page: filters.page,
        pageSize: filters.pageSize,
        keyword: filters.keyword,
      });
    else if (!filters.keyword && filters.criteria)
      query = queryString.stringify({
        page: filters.page,
        pageSize: filters.pageSize,
        criteria: filters.criteria,
        sort: filters.sort,
      });
    setIsLoading(true);
    Axios.get(`http://localhost:3001/shipping?${query}`)
      .then((res) => {
        setShippings(res.data.data);
        setTotalRows(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
      });
  };

  const handleSearchShippings = () => {
    setFilters({ ...filters, keyword: search, page: 1 });
  };

  const handleChangePage = (page) => {
    setFilters({ ...filters, page: page });
  };

  const handleSort = (criteria) => {
    if (!filters.criteria)
      setFilters({ ...filters, criteria: criteria, sort: 1 });
    else if (filters.criteria !== criteria)
      setFilters({ ...filters, criteria: criteria, sort: 1 });
    else if (filters.sort === 1)
      setFilters({ ...filters, criteria: criteria, sort: 0 });
    else setFilters({ ...filters, criteria: criteria, sort: 1 });
  };

  return (
    <>
      <nav className="page-breadcrumb flex align-items-center justify-content-between">
        <h5>QUẢN LÝ PHÍ VẬN CHUYỂN</h5>
        {/* <div className="col-sm-12 col-md-2 text-right">
          <a
            className="btn btn-primary mb-md-0 text-white"
            onClick={() => {
              setShowAddModal(true);
            }}
          >
            <i className="mr-2">{add}</i>
            Thêm
          </a>
        </div> */}
      </nav>

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <ShippingToolbar
                onSearch={handleSearchShippings}
                onChangeSearch={setSearch}
                onChangePageSize={(val) => {
                  setFilters({ ...filters, pageSize: val });
                }}
              />

              {isLoading ? (
                <img
                  src={loading}
                  width="50px"
                  style={{ display: "block", margin: "auto" }}
                />
              ) : hasError ? (
                <p style={{ color: "red" }}>Đã có lỗi xảy ra</p>
              ) : (
                <>
                  <ShippingTable
                    shippings={shippings}
                    onSort={handleSort}
                    onEdit={handleGetBook}
                  />

                  <Pagination
                    totalRows={totalRows}
                    page={filters.page}
                    pageSize={filters.pageSize}
                    onChange={handleChangePage}
                  />
                </>
              )}

              {/* {(Boolean(deletedShipping) || showDeleteModal) && (
                <DeleteShippingModal
                  show={Boolean(deletedShipping) || showDeleteModal}
                  shippingIds={
                    showDeleteModal ? selectedShippings : [deletedShipping]
                  }
                  onClose={handleCloseDeleteModal}
                  onDelete={handleDeleteShipping}
                />
              )}

              {showAddModal && (
                <AddShippingModal
                  show={showAddModal}
                  onClose={handleCloseAddModal}
                  onAdd={handleGetBook}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
