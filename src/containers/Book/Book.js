import React from "react";
import { add, edit, del } from "../../components/svg/icon";

const Book = () => {
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
              <div class="table-responsive">
                <table id="dataTableExample" class="table">
                  <colgroup>
                    <col span="1" style={{ width: "5%" }} />
                    <col span="1" style={{ width: "28%" }} />
                    <col span="1" style={{ width: "15%" }} />
                    <col span="1" style={{ width: "15%" }} />
                    <col span="1" style={{ width: "15%" }} />
                    <col span="1" style={{ width: "5%" }} />
                    <col span="1" style={{ width: "5%" }} />
                    <col span="1" style={{ width: "8%" }} />
                    <col span="1" style={{ width: "auto" }} />
                  </colgroup>
                  <tr>
                    <th>Id</th>
                    <th>Tên</th>
                    <th>Tác giả</th>
                    <th>Thể loại</th>
                    <th>Nhà xuất bản</th>
                    <th>Nhập</th>
                    <th>Bán</th>
                    <th>Giá bán</th>
                    <th>Action</th>
                  </tr>

                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Thám Tử Lừng Danh Conan - Tập 96</td>
                      <td>Gosho Aoyama</td>
                      <td>Truyện tranh</td>
                      <td>NXB Kim Đồng</td>
                      <td>100</td>
                      <td>0</td>
                      <td>16.000</td>
                      <td>
                        {edit}
                        {"  "}
                        {del}
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Đọc Vị Bất Kì Ai (Tái Bản)</td>
                      <td>TS. David J. Lieberman</td>
                      <td>Sách kinh tế</td>
                      <td>NXB Lao Động</td>
                      <td>100</td>
                      <td>20</td>
                      <td>52.000</td>
                      <td>
                        {edit}
                        {"  "}
                        {del}
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sự Cứu Rỗi Của Thánh Nữ</td>
                      <td>Higashino Keigo</td>
                      <td>Sách văn học</td>
                      <td>NXB Hội Nhà Văn</td>
                      <td>100</td>
                      <td>0</td>
                      <td>95.000</td>
                      <td>
                        {edit}
                        {"  "}
                        {del}
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Thế Giới Ba Không</td>
                      <td>Muahammad Yunus</td>
                      <td>Sách kinh tế</td>
                      <td>NXB Thế Giới</td>
                      <td>100</td>
                      <td>5</td>
                      <td>90.000</td>
                      <td>
                        {edit}
                        {"  "}
                        {del}
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Sống Thực Tế Giữa Đời Thực Dụng</td>
                      <td>Mễ Mông</td>
                      <td>Sách Kỹ năng sống</td>
                      <td>NXB Dân Trí</td>
                      <td>100</td>
                      <td>0</td>
                      <td>72.000</td>
                      <td>
                        {edit}
                        {"  "}
                        {del}
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mắt Biếc (Tái Bản 2019)</td>
                      <td>Nguyễn Nhật Ánh</td>
                      <td>Sách văn học</td>
                      <td>NXB Trẻ</td>
                      <td>100</td>
                      <td>87</td>
                      <td>42.000</td>
                      <td>
                        {edit}
                        {"  "}
                        {del}
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Tuổi Trẻ Hoang Dại</td>
                      <td>Nguyễn Ngọc Thạch</td>
                      <td>Sách văn học</td>
                      <td>NXB Văn Học</td>
                      <td>100</td>
                      <td>4</td>
                      <td>66.000</td>
                      <td>
                        {edit}
                        {"  "}
                        {del}
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Chúng Ta Không Có Sau Này</td>
                      <td>Hà Thanh Phúc</td>
                      <td>Sách văn học</td>
                      <td>NXB Phụ Nữ</td>
                      <td>100</td>
                      <td>0</td>
                      <td>49.000</td>
                      <td>
                        {edit}
                        {"  "}
                        {del}
                      </td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Anh Sẽ Yêu Em Mãi Chứ?</td>
                      <td>Gào</td>
                      <td>Sách văn học</td>
                      <td>NXB Văn Học</td>
                      <td>100</td>
                      <td>20</td>
                      <td>53.000</td>
                      <td>
                        {edit}
                        {"  "}
                        {del}
                      </td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Nếu tôi biết được khi còn 20</td>
                      <td>Tina Seelig</td>
                      <td>Sách Kỹ năng sống</td>
                      <td>NXB Trẻ</td>
                      <td>100</td>
                      <td>42</td>
                      <td>73.000</td>
                      <td>
                        {edit}
                        {"  "}
                        {del}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
      </div>
    </>
  );
};

export default Book;
