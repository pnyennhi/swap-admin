import React, { useState, useEffect } from "react";

import ReviewTable from "./components/ReviewTable";
import ReviewToolbar from "./components/ReviewToolbar";
import DeleteReviewModal from "./components/DeleteReviewModal";
import Pagination from "../../components/Pagination";

import loading from "../../assets/images/loading.gif";

import Axios from "../../Instance";
import queryString from "query-string";
import { toast } from "react-toastify";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [deletedReview, setDeletedReview] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
    //call API get when filters change (get review list)
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
    Axios.get(`http://localhost:3001/reviews?${query}`)
      .then((res) => {
        setReviews(res.data.data);
        setTotalRows(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
      });
  };

  const handleSetDeletedBook = (id) => {
    setDeletedReview(id);
  };

  const handleCloseDeleteModal = () => {
    setDeletedReview(null);
    setShowDeleteModal(false);
  };

  const handleDeleteReview = (ids) => {
    //delete review API
    //id is an array
    const deletedAPIs = ids.map((id) => {
      return Axios.delete(
        `https://bookstoreprojectdut.azurewebsites.net/api/reviews/${id}`
      );
    });
    Promise.all(deletedAPIs)
      .then((res) => {
        toast.success("Xóa đánh giá thành công");
        setSelectedReviews([]);
        setDeletedReview(null);
        setShowDeleteModal(false);
        handleGetBook();
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        setSelectedReviews([]);
        setDeletedReview(null);
        setShowDeleteModal(false);
      });

    // setDeletedReview(null);
    // setShowDeleteModal(false);
    // handleDeleteBooks(ids);
  };

  const handleSelectOneReview = (e, id) => {
    const selectedIndex = selectedReviews.indexOf(id);
    let newSelectedBooks = [...selectedReviews];
    console.log(newSelectedBooks);

    if (selectedIndex === -1) {
      newSelectedBooks.push(id);
    } else {
      newSelectedBooks.splice(selectedIndex, 1);
    }
    setSelectedReviews(newSelectedBooks);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked)
      setSelectedReviews(reviews.map((review) => review.reviewID));
    else setSelectedReviews([]);
  };

  const handleSearchReviews = () => {
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
        <h5>QUẢN LÝ ĐÁNH GIÁ</h5>
      </nav>

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <ReviewToolbar
                selectedLength={selectedReviews.length}
                onSearch={handleSearchReviews}
                onChangeSearch={setSearch}
                onChangePageSize={(val) => {
                  setFilters({ ...filters, pageSize: val });
                }}
                onShowDeleteModal={setShowDeleteModal}
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
                  <ReviewTable
                    reviews={reviews}
                    selectedReviews={selectedReviews}
                    onDelete={handleSetDeletedBook}
                    onSelect={handleSelectOneReview}
                    onSelectAll={handleSelectAll}
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

              {(Boolean(deletedReview) || showDeleteModal) && (
                <DeleteReviewModal
                  show={Boolean(deletedReview) || showDeleteModal}
                  reviewIds={
                    showDeleteModal ? selectedReviews : [deletedReview]
                  }
                  onClose={handleCloseDeleteModal}
                  onDelete={handleDeleteReview}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
