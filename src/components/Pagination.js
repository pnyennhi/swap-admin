import React from "react";

const Pagination = (props) => {
  const { page, pageSize, totalRows, onChange } = props;

  let pages = [];
  const pageTotal = Math.ceil(totalRows / pageSize);

  for (let i = 1; i <= pageTotal; i++) pages.push(i);

  return (
    <div className="row">
      <div class="col-sm-12 col-md-5">Showing 1 to 10 of 200 entries</div>
      <div class="col-sm-12 col-md-7">
        <div
          class="dataTables_paginate paging_simple_numbers"
          id="dataTableExample_paginate"
        >
          <ul class="pagination">
            <li
              class={
                page === 1
                  ? "paginate_button page-item previous disabled"
                  : "paginate_button page-item previous"
              }
              id="dataTableExample_previous"
            >
              <a
                class="page-link"
                onClick={() => {
                  onChange(1);
                }}
              >
                First
              </a>
            </li>
            <li
              class={
                page === 1
                  ? "paginate_button page-item previous disabled"
                  : "paginate_button page-item previous"
              }
              id="dataTableExample_previous"
            >
              <a
                class="page-link"
                onClick={() => {
                  onChange(page - 1);
                }}
              >
                Prev
              </a>
            </li>
            {pages.map((pageItem) => (
              <li
                class={
                  pageItem === page
                    ? "paginate_button page-item active"
                    : "paginate_button page-item"
                }
                id="dataTableExample_next"
              >
                <a
                  class="page-link"
                  onClick={() => {
                    onChange(pageItem);
                  }}
                >
                  {pageItem}
                </a>
              </li>
            ))}
            <li
              class={
                page === pageTotal || pageTotal === 0
                  ? "paginate_button page-item next disabled"
                  : "paginate_button page-item next"
              }
              id="dataTableExample_next"
            >
              <a
                class="page-link"
                onClick={() => {
                  onChange(page + 1);
                }}
              >
                Next
              </a>
            </li>
            <li
              class={
                page === pageTotal || pageTotal === 0
                  ? "paginate_button page-item next disabled"
                  : "paginate_button page-item next"
              }
              id="dataTableExample_next"
            >
              <a
                class="page-link"
                onClick={() => {
                  onChange(pageTotal);
                }}
              >
                Last
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
