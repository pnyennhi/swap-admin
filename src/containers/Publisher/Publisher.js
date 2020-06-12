import React, { useState, useEffect } from "react";

import PublisherTable from "./components/PublisherTable";
import PublisherToolbar from "./components/PublisherToolbar";
import DeletePublisherModal from "./components/DeletePublisherModal";
import AddPublisherModal from "./components/AddPublisherModal";
import Pagination from "../../components/Pagination";

import { add } from "../../components/svg/icon";
import loading from "../../assets/images/loading.gif";

import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";

const Publisher = () => {
  const [publishers, setPublishers] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [deletedPublisher, setDeletedPublisher] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
    //call API get when filters change (get publisher list)
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
      .get(
        `https://bookstoreprojectdut.azurewebsites.net/api/publishers?${query}`
      )
      .then((res) => {
        setPublishers(res.data.items);
        setTotalRows(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
      });
  };

  const handleSetDeletedBook = (id) => {
    setDeletedPublisher(id);
  };

  const handleCloseDeleteModal = () => {
    setDeletedPublisher(null);
    setShowDeleteModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleDeletePublisher = (ids) => {
    //delete publisher API
    //id is an array
    const deletedAPIs = ids.map((id) => {
      return axios.delete(
        `https://bookstoreprojectdut.azurewebsites.net/api/publishers/${id}`
      );
    });
    Promise.all(deletedAPIs)
      .then((res) => {
        toast.success("Delete thanh cong");
        setSelectedPublishers([]);
        setDeletedPublisher(null);
        setShowDeleteModal(false);
        handleGetBook();
      })
      .catch((err) => {
        toast.error("Fail");
        setSelectedPublishers([]);
        setDeletedPublisher(null);
        setShowDeleteModal(false);
      });

    // setDeletedPublisher(null);
    // setShowDeleteModal(false);
    // handleDeleteBooks(ids);
  };

  const handleSelectOnePublisher = (e, id) => {
    const selectedIndex = selectedPublishers.indexOf(id);
    let newSelectedBooks = [...selectedPublishers];
    console.log(newSelectedBooks);

    if (selectedIndex === -1) {
      newSelectedBooks.push(id);
    } else {
      newSelectedBooks.splice(selectedIndex, 1);
    }
    setSelectedPublishers(newSelectedBooks);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked)
      setSelectedPublishers(
        publishers.map((publisher) => publisher.publisherID)
      );
    else setSelectedPublishers([]);
  };

  const handleSearchPublishers = () => {
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
        <h5>QUẢN LÝ NHÀ XUẤT BẢN</h5>
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
              <PublisherToolbar
                selectedLength={selectedPublishers.length}
                onSearch={handleSearchPublishers}
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
                  <PublisherTable
                    publishers={publishers}
                    selectedPublishers={selectedPublishers}
                    onDelete={handleSetDeletedBook}
                    onSelect={handleSelectOnePublisher}
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

              {(Boolean(deletedPublisher) || showDeleteModal) && (
                <DeletePublisherModal
                  show={Boolean(deletedPublisher) || showDeleteModal}
                  publisherIds={
                    showDeleteModal ? selectedPublishers : [deletedPublisher]
                  }
                  onClose={handleCloseDeleteModal}
                  onDelete={handleDeletePublisher}
                />
              )}

              {showAddModal && (
                <AddPublisherModal
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

export default Publisher;
