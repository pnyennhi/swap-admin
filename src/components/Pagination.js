import React from "react";

const Pagination = (props) => {
  const { currentPage, limit, totalRows, onChange } = props;

  let pages = [];
  const pageTotal = Math.ceil(totalRows / limit);

  for (let i = 1; i <= pageTotal; i++) pages.push(i);

  return (
    <div className="row">
      <div class="col-sm-12 col-md-7">
        <div
          class="dataTables_paginate paging_simple_numbers"
          id="dataTableExample_paginate"
        >
          <ul class="pagination">
            <li
              class={
                currentPage === 1
                  ? "paginate_button page-item previous disabled"
                  : "paginate_button page-item previous"
              }
              id="dataTableExample_previous"
            >
              <a
                class="page-link"
                onClick={() => {
                  onChange(currentPage - 1);
                }}
              >
                Previous
              </a>
            </li>
            {pages.map((page) => (
              <li
                class={
                  page === currentPage
                    ? "paginate_button page-item active"
                    : "paginate_button page-item"
                }
                id="dataTableExample_next"
              >
                <a
                  class="page-link"
                  onClick={() => {
                    onChange(page);
                  }}
                >
                  {page}
                </a>
              </li>
            ))}
            <li
              class={
                currentPage === pageTotal
                  ? "paginate_button page-item next disabled"
                  : "paginate_button page-item next"
              }
              id="dataTableExample_next"
            >
              <a
                class="page-link"
                onClick={() => {
                  onChange(currentPage + 1);
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
