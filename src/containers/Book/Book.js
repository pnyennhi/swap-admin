import React, { useState } from "react";
import { add } from "../../components/svg/icon";
import BookTable from "./components/BookTable";
import { books as fakeBooks } from "../../FakeData";

const Book = () => {
  const [books, setBooks] = useState(fakeBooks);

  const handleChangeBooks = (delIds) => {
    const newBooks = books.filter((book) => delIds.indexOf(book.id) === -1);
    console.log(newBooks);

    setBooks(newBooks);
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

              {/* Table */}
              <BookTable books={books} onChangeBooks={handleChangeBooks} />

              <div class="row">
                <div class="col-sm-12 col-md-5">
                  <div
                    class="dataTables_info"
                    id="dataTableExample_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing 1 to 10 of 22 entries
                  </div>
                </div>
                <div class="col-sm-12 col-md-7">
                  <div
                    class="dataTables_paginate paging_simple_numbers"
                    id="dataTableExample_paginate"
                  >
                    <ul class="pagination">
                      <li
                        class="paginate_button page-item previous disabled"
                        id="dataTableExample_previous"
                      >
                        <a
                          href="#"
                          aria-controls="dataTableExample"
                          data-dt-idx="0"
                          tabindex="0"
                          class="page-link"
                        >
                          Previous
                        </a>
                      </li>
                      <li class="paginate_button page-item active">
                        <a
                          href="#"
                          aria-controls="dataTableExample"
                          data-dt-idx="1"
                          tabindex="0"
                          class="page-link"
                        >
                          1
                        </a>
                      </li>
                      <li class="paginate_button page-item ">
                        <a
                          href="#"
                          aria-controls="dataTableExample"
                          data-dt-idx="2"
                          tabindex="0"
                          class="page-link"
                        >
                          2
                        </a>
                      </li>
                      <li class="paginate_button page-item ">
                        <a
                          href="#"
                          aria-controls="dataTableExample"
                          data-dt-idx="3"
                          tabindex="0"
                          class="page-link"
                        >
                          3
                        </a>
                      </li>
                      <li
                        class="paginate_button page-item next"
                        id="dataTableExample_next"
                      >
                        <a
                          href="#"
                          aria-controls="dataTableExample"
                          data-dt-idx="4"
                          tabindex="0"
                          class="page-link"
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
