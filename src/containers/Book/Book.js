import React, { useState, useEffect } from "react";
import { add } from "../../components/svg/icon";
import BookTable from "./components/BookTable";
import { books as fakeBooks } from "../../FakeData";
import DeleteBookModal from "./components/DeleteBookModal";
import AddBookModal from "./components/AddBookModal";
import Pagination from "../../components/Pagination";
import axios from "axios";

const Book = () => {
  const [books, setBooks] = useState(fakeBooks);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [deletedBook, setDeletedBook] = useState(null);
  const [showDeleteModal, setShowDeletedModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortConfig, setSortConfig] = useState(null);
  const [totalRows, setTotalRows] = useState(21);
  const [filters, setFilters] = useState({
    currentPage: 1,
    limit: 10,
    search: null,
  });

  useEffect(() => {
    //call API get when mounted (category list, publisher list)
  }, []);

  useEffect(() => {
    //call API get when filters change (get book list)
  }, [filters]);

  const handleSetDeletedBook = (id) => {
    setDeletedBook(id);
  };

  const handleCloseDeleteModal = () => {
    setDeletedBook(null);
    setShowDeletedModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleDeleteBook = (ids) => {
    //delete book API
    //id is an array
    setDeletedBook(null);
    setShowDeletedModal(false);
    // handleDeleteBooks(ids);
  };

  // const handleDeleteBooks = (delIds) => {
  //   const newBooks = books.filter((book) => delIds.indexOf(book.id) === -1);
  //   setBooks(newBooks);
  //   const newSelectedBooks = selectedBooks.filter(
  //     (bookId) => delIds.indexOf(bookId) === -1
  //   );
  //   console.log(newSelectedBooks);

  //   setSelectedBooks(newSelectedBooks);
  // };

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
    if (e.target.checked) setSelectedBooks(books.map((book) => book.BookID));
    else setSelectedBooks([]);
  };

  const handleSearchBooks = () => {
    // var key = e.target.value;
    // var results = books.filter(
    //   (book) =>
    //     JSON.stringify(book).toLowerCase().search(key.toLowerCase()) > -1
    // );
    // console.log(results);
    // if (key) setIsSearching(true);
    // else setIsSearching(false);
    // setSearchedBooks(results);

    //call API search
    alert(filters.search);
  };

  const handleChangePage = (page) => {
    setFilters({ ...filters, currentPage: page });
  };

  const handleSort = (field) => {
    if (!sortConfig) setSortConfig({ field: field, order: "asc" });
    else if (sortConfig.field !== field)
      setSortConfig({ field: field, order: "asc" });
    else if (sortConfig.order === "asc")
      setSortConfig({
        field: field,
        order: "desc",
      });
    else
      setSortConfig({
        field: field,
        order: "asc",
      });
  };

  useEffect(() => {
    if (sortConfig) alert(JSON.stringify(sortConfig));
  }, [sortConfig]);

  return (
    <>
      <nav class="page-breadcrumb">
        <h5>QUẢN LÝ SÁCH</h5>
      </nav>

      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="row align-items-md-center justify-content-between mb-4">
                <div class="col-sm-12 col-md-8">
                  <div className="row align-items-md-center">
                    <div class="col-sm-9 col-md-8  dataTables_filter">
                      <input
                        class="form-control"
                        placeholder="Search"
                        onChange={(e) => {
                          setFilters({ ...filters, search: e.target.value });
                        }}
                        onKeyUp={(e) => {
                          if (e.keyCode === 13) handleSearchBooks();
                        }}
                      />
                    </div>
                    <div class="col-sm-3 col-md-4">
                      <a
                        className="btn btn-primary mr-2 mb-2 mb-md-0 text-white"
                        onClick={() => handleSearchBooks()}
                      >
                        Tìm
                      </a>
                    </div>
                  </div>
                </div>

                {selectedBooks.length > 0 && (
                  <div class="col-sm-12 col-md-2 text-right">
                    <a
                      className="btn btn-primary mr-2 mb-2 mb-md-0 text-white"
                      onClick={() => {
                        setShowDeletedModal(true);
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
                      setShowAddModal(true);
                    }}
                  >
                    <i className="mr-2">{add}</i>
                    Thêm
                  </a>
                </div>
              </div>

              <BookTable
                // books={
                //   searchedBooks.length > 0 || isSearching
                //     ? searchedBooks
                //     : books
                // }

                books={books}
                selectedBooks={selectedBooks}
                onDelete={handleSetDeletedBook}
                onSelect={handleSelectOneBook}
                onSelectAll={handleSelectAll}
                onSort={handleSort}
              />

              <Pagination
                totalRows={totalRows}
                currentPage={filters.currentPage}
                limit={filters.limit}
                onChange={handleChangePage}
              />

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
                  // onAdd={handleAddBook}
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
