import React, { useState, useEffect } from "react";

import SubcriberTable from "./components/SubcriberTable";
import SubcriberToolbar from "./components/SubcriberToolbar";
import DeleteSubcriberModal from "./components/DeleteSubcriberModal";
import AddSubcriberModal from "./components/AddSubcriberModal";
import Pagination from "../../components/Pagination";

import { add } from "../../components/svg/icon";
import loading from "../../assets/images/loading.gif";

import Axios from "../../Instance";
import queryString from "query-string";
import { toast } from "react-toastify";

const Subcriber = () => {
  const [subcribers, setSubcribers] = useState([]);
  const [selectedSubcribers, setSelectedSubcribers] = useState([]);
  const [deletedSubcriber, setDeletedSubcriber] = useState(null);
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
    //call API get when filters change (get subcriber list)
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
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/subcribers?${query}`
    )
      .then((res) => {
        setSubcribers(res.data.items);
        setTotalRows(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
      });
  };

  const handleSetDeletedBook = (id) => {
    setDeletedSubcriber(id);
  };

  const handleCloseDeleteModal = () => {
    setDeletedSubcriber(null);
    setShowDeleteModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleDeleteSubcriber = (ids) => {
    //delete subcriber API
    //id is an array
    const deletedAPIs = ids.map((id) => {
      return Axios.delete(
        `https://bookstoreprojectdut.azurewebsites.net/api/subcribers/${id}`
      );
    });
    Promise.all(deletedAPIs)
      .then((res) => {
        toast.success("Delete người theo dõi thành công");
        setSelectedSubcribers([]);
        setDeletedSubcriber(null);
        setShowDeleteModal(false);
        handleGetBook();
      })
      .catch((err) => {
        toast.error("Fail");
        setSelectedSubcribers([]);
        setDeletedSubcriber(null);
        setShowDeleteModal(false);
      });
  };

  const handleSelectOneSubcriber = (e, id) => {
    const selectedIndex = selectedSubcribers.indexOf(id);
    let newSelectedBooks = [...selectedSubcribers];
    console.log(newSelectedBooks);

    if (selectedIndex === -1) {
      newSelectedBooks.push(id);
    } else {
      newSelectedBooks.splice(selectedIndex, 1);
    }
    setSelectedSubcribers(newSelectedBooks);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked)
      setSelectedSubcribers(
        subcribers.map((subcriber) => subcriber.subcriberID)
      );
    else setSelectedSubcribers([]);
  };

  const handleSearchSubcribers = () => {
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
        <h5>QUẢN LÝ NGƯỜI THEO DÕI</h5>
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
              <SubcriberToolbar
                selectedLength={selectedSubcribers.length}
                onSearch={handleSearchSubcribers}
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
                  <SubcriberTable
                    subcribers={subcribers}
                    selectedSubcribers={selectedSubcribers}
                    onDelete={handleSetDeletedBook}
                    onSelect={handleSelectOneSubcriber}
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

              {(Boolean(deletedSubcriber) || showDeleteModal) && (
                <DeleteSubcriberModal
                  show={Boolean(deletedSubcriber) || showDeleteModal}
                  subcriberIds={
                    showDeleteModal ? selectedSubcribers : [deletedSubcriber]
                  }
                  onClose={handleCloseDeleteModal}
                  onDelete={handleDeleteSubcriber}
                />
              )}

              {showAddModal && (
                <AddSubcriberModal
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

export default Subcriber;
