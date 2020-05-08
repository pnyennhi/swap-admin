import React, { useState, useEffect } from "react";
import { add } from "../../components/svg/icon";
import BookTable from "./components/BookTable";
import { books as fakeBooks } from "../../FakeData";
import DeleteBookModal from "./components/DeleteBookModal";

const Book = () => {
  const [books, setBooks] = useState(fakeBooks);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [deletedBook, setDeletedBook] = useState(null);

  const handledeletedBook = (id) => {
    setDeletedBook(id);
  };

  const handleCloseDeleteModal = () => {
    setDeletedBook(null);
  };

  const handleDeleteOneBook = (id) => {
    //delete one book API
    setDeletedBook(null);
    handleDeleteBooks([id]);
  };

  const handleDeleteBooks = (delIds) => {
    const newBooks = books.filter((book) => delIds.indexOf(book.id) === -1);
    setBooks(newBooks);
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
    if (e.target.checked) setSelectedBooks(books.map((book) => book.id));
    else setSelectedBooks([]);
  };

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
                  <div id="dataTableExample_filter" class="dataTables_filter">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Search"
                      aria-controls="dataTableExample"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-2 text-right">
                  <a className="btn btn-primary mr-2 mb-2 mb-md-0 text-white">
                    <i className="mr-2">{add}</i>
                    Thêm
                  </a>
                </div>
              </div>

              <BookTable
                books={books}
                selectedBooks={selectedBooks}
                onDelete={handledeletedBook}
                onSelect={handleSelectOneBook}
                onSelectAll={handleSelectAll}
              />

              {deletedBook && (
                <DeleteBookModal
                  show={deletedBook === null ? false : true}
                  bookId={deletedBook}
                  onClose={handleCloseDeleteModal}
                  onDelete={handleDeleteOneBook}
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
