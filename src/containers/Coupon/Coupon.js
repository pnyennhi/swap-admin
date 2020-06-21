import React, { useState, useEffect } from "react";

import CouponTable from "./components/CouponTable";
import CouponToolbar from "./components/CouponToolbar";
import AddCouponModal from "./components/AddCouponModal";
import Pagination from "../../components/Pagination";

import { add } from "../../components/svg/icon";
import loading from "../../assets/images/loading.gif";

import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupons, setSelectedCoupons] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
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
    //call API get when filters change (get coupon list)
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
    axios
      .get(`https://bookstoreprojectdut.azurewebsites.net/api/coupons?${query}`)
      .then((res) => {
        setCoupons(res.data.items);
        setTotalRows(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
      });
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleSearchCoupons = () => {
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
      <nav class="page-breadcrumb flex align-items-center justify-content-between">
        <h5>QUẢN LÝ THỂ LOẠI</h5>
        <div class="col-sm-12 col-md-2 text-right">
          <a
            className="btn btn-primary mb-md-0 text-white"
            onClick={() => {
              setShowAddModal(true);
            }}
          >
            <i className="mr-2">{add}</i>
            Thêm
          </a>
        </div>
      </nav>

      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <CouponToolbar
                selectedLength={selectedCoupons.length}
                onSearch={handleSearchCoupons}
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
                  <CouponTable
                    coupons={coupons}
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

              {showAddModal && (
                <AddCouponModal
                  show={showAddModal}
                  onClose={handleCloseAddModal}
                  onAdd={handleGetBook}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
