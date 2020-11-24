import React, { useState, useEffect } from "react";

import BookTable from "./components/BookTable";
import BookToolbar from "./components/BookToolbar";
import { books as fakeBooks } from "../../FakeData";
import DeleteBookModal from "./components/DeleteBookModal";
import AddBookModal from "./components/AddBookModal";
import Pagination from "../../components/Pagination";

import { add } from "../../components/svg/icon";
import loading from "../../assets/images/loading.gif";

import queryString from "query-string";
import { toast } from "react-toastify";

import Axios from "../../Instance";

const Book = () => {
  const [books, setBooks] = useState(fakeBooks);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [deletedBook, setDeletedBook] = useState(null);
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
    //call API get when filters change (get book list)
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
    Axios.get(`http://localhost:3001/products?${query}`)
      .then((res) => {
        setBooks(res.data.data);
        setTotalRows(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
      });
  };

  const handleSetDeletedBook = (id) => {
    setDeletedBook(id);
  };

  const handleCloseDeleteModal = () => {
    setDeletedBook(null);
    setShowDeleteModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleDeleteBook = (ids) => {
    //delete book API
    //id is an array
    const deletedAPIs = ids.map((id) => {
      return Axios.delete(`http://localhost:3001/products/${id}`);
    });
    Promise.all(deletedAPIs)
      .then((res) => {
        toast.success("Delete thanh cong");
        setSelectedBooks([]);
        setDeletedBook(null);
        setShowDeleteModal(false);
        handleGetBook();
      })
      .catch((err) => {
        toast.error("Fail");
        setSelectedBooks([]);
        setDeletedBook(null);
        setShowDeleteModal(false);
      });

    // setDeletedBook(null);
    // setShowDeleteModal(false);
    // handleDeleteBooks(ids);
  };

  const handleSelectOneBook = (e, id) => {
    const selectedIndex = selectedBooks.indexOf(id);
    let newSelectedBooks = [...selectedBooks];
    console.log(newSelectedBooks);

    if (selectedIndex === -1) {
      newSelectedBooks.push(id);
    } else {
      newSelectedBooks.splice(selectedIndex, 1);
    }
    setSelectedBooks(newSelectedBooks);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedBooks(books.map((book) => book.bookID));
    else setSelectedBooks([]);
  };

  const handleSearchBooks = () => {
    setFilters({ ...filters, keyword: search, page: 1 });
  };

  const handleChangePage = (page) => {
    setFilters({ ...filters, page: page });
  };

  const handleSort = (criteria) => {
    if (!filters.criteria)
      setFilters({ ...filters, criteria: criteria, sort: "asc" });
    else if (filters.criteria !== criteria)
      setFilters({ ...filters, criteria: criteria, sort: "asc" });
    else if (filters.sort === "asc")
      setFilters({ ...filters, criteria: criteria, sort: "desc" });
    else setFilters({ ...filters, criteria: criteria, sort: "asc" });
  };

  return (
    <>
      <nav className="page-breadcrumb flex align-items-center justify-content-between">
        <h5>QUẢN LÝ SÁCH</h5>
        <div className="col-sm-12 col-md-2 text-right">
          {/* <a
            className="btn btn-primary mb-md-0 text-white"
            onClick={() => {
              setShowAddModal(true);
            }}
          >
            <i className="mr-2">{add}</i>
            Thêm
          </a> */}
        </div>
      </nav>

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <BookToolbar
                selectedLength={selectedBooks.length}
                onSearch={handleSearchBooks}
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
                  <BookTable
                    books={books}
                    selectedBooks={selectedBooks}
                    onDelete={handleSetDeletedBook}
                    onSelect={handleSelectOneBook}
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

              {(Boolean(deletedBook) || showDeleteModal) && (
                <DeleteBookModal
                  show={Boolean(deletedBook) || showDeleteModal}
                  bookIds={showDeleteModal ? selectedBooks : [deletedBook]}
                  onClose={handleCloseDeleteModal}
                  onDelete={handleDeleteBook}
                />
              )}

              {showAddModal && (
                <AddBookModal
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

export default Book;
