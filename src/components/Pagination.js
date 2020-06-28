import React from "react";

const Pagination = (props) => {
  const { page, pageSize, totalRows, onChange } = props;

  let pages = [];
  const pageTotal = Math.ceil(totalRows / pageSize);

  for (let i = 1; i <= pageTotal; i++) pages.push(i);

  return (
    <div className="row">
      <div className="col-sm-12 col-md-5">
        Showing {page * pageSize - pageSize + 1} to{" "}
        {page === pageTotal ? totalRows : page * pageSize} of {totalRows}{" "}
        entries
      </div>
      <div className="col-sm-12 col-md-7">
        <div
          className="dataTables_paginate paging_simple_numbers"
          id="dataTableExample_paginate"
        >
          <ul className="pagination">
            <li
              className={
                page === 1
                  ? "paginate_button page-item previous disabled"
                  : "paginate_button page-item previous"
              }
            >
              <a
                className="page-link"
                onClick={() => {
                  onChange(page - 1);
                }}
              >
                Prev
              </a>
            </li>

            {pages.map((pageItem) => (
              <>
                <li
                  key={pageItem}
                  className={
                    pageItem === page
                      ? "paginate_button page-item active"
                      : "paginate_button page-item"
                  }
                  style={{
                    display:
                      (pageItem >= page - 2 && pageItem <= page + 2) ||
                      pageItem === 1 ||
                      pageItem == pageTotal
                        ? "inline-block"
                        : "none",
                  }}
                >
                  <a
                    className="page-link"
                    onClick={() => {
                      onChange(pageItem);
                    }}
                  >
                    {pageItem}
                  </a>
                </li>
                <li
                  style={{
                    display:
                      (pageItem === 1 && page - 2 > 1 + 1) ||
                      (page + 2 < pageTotal - 1 && pageItem === page + 2)
                        ? "inline"
                        : "none",
                    padding: "18px 9px 0",
                    lineHeight: "0",
                  }}
                >
                  ...
                </li>
              </>
            ))}
            <li
              className={
                page === pageTotal || pageTotal === 0
                  ? "paginate_button page-item next disabled"
                  : "paginate_button page-item next"
              }
              id="dataTableExample_next"
            >
              <a
                className="page-link"
                onClick={() => {
                  onChange(page + 1);
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
