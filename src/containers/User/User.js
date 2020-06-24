import React, { useState, useEffect } from "react";

import UserTable from "./components/UserTable";
import UserToolbar from "./components/UserToolbar";
import DeleteUserModal from "./components/DeleteUserModal";
import AddUserModal from "./components/AddUserModal";
import Pagination from "../../components/Pagination";

import { add } from "../../components/svg/icon";
import loading from "../../assets/images/loading.gif";

import Axios from "../../Instance";
import queryString from "query-string";
import { toast } from "react-toastify";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [deletedUser, setDeletedUser] = useState(null);
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
    //call API get when filters change (get user list)
    handleGetUser();
  }, [filters]);

  const handleGetUser = () => {
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
      `https://bookstoreprojectdut.azurewebsites.net/api/admins/listuser?${query}`
    )
      .then((res) => {
        setUsers(res.data.items);
        setTotalRows(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
      });
  };

  const handleSetDeletedUser = (id) => {
    setDeletedUser(id);
  };

  const handleCloseDeleteModal = () => {
    setDeletedUser(null);
    setShowDeleteModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleDeleteUser = (ids) => {
    //delete user API
    //id is an array
    const deletedAPIs = ids.map((id) => {
      return Axios.delete(
        `https://bookstoreprojectdut.azurewebsites.net/api/admins/${id}`
      );
    });
    Promise.all(deletedAPIs)
      .then((res) => {
        toast.success("Xóa người dùng thành công");
        setSelectedUsers([]);
        setDeletedUser(null);
        setShowDeleteModal(false);
        handleGetUser();
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        setSelectedUsers([]);
        setDeletedUser(null);
        setShowDeleteModal(false);
      });

    // setDeletedUser(null);
    // setShowDeleteModal(false);
    // handleDeleteUsers(ids);
  };

  const handleSelectOneUser = (e, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [...selectedUsers];
    console.log(newSelectedUsers);

    if (selectedIndex === -1) {
      newSelectedUsers.push(id);
    } else {
      newSelectedUsers.splice(selectedIndex, 1);
    }
    setSelectedUsers(newSelectedUsers);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedUsers(users.map((user) => user.userID));
    else setSelectedUsers([]);
  };

  const handleSearchUsers = () => {
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
      <nav className="page-breadcrumb flex align-items-center justify-content-between">
        <h5>QUẢN LÝ NGƯỜI DÙNG</h5>
        <div className="col-sm-12 col-md-2 text-right">
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

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <UserToolbar
                selectedLength={selectedUsers.length}
                onSearch={handleSearchUsers}
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
                  <UserTable
                    users={users}
                    selectedUsers={selectedUsers}
                    onDelete={handleSetDeletedUser}
                    onSelect={handleSelectOneUser}
                    onSelectAll={handleSelectAll}
                    onSort={handleSort}
                    onEdit={handleGetUser}
                  />

                  <Pagination
                    totalRows={totalRows}
                    page={filters.page}
                    pageSize={filters.pageSize}
                    onChange={handleChangePage}
                  />
                </>
              )}

              {(Boolean(deletedUser) || showDeleteModal) && (
                <DeleteUserModal
                  show={Boolean(deletedUser) || showDeleteModal}
                  userIds={showDeleteModal ? selectedUsers : [deletedUser]}
                  onClose={handleCloseDeleteModal}
                  onDelete={handleDeleteUser}
                />
              )}

              {showAddModal && (
                <AddUserModal
                  show={showAddModal}
                  onClose={handleCloseAddModal}
                  onAdd={handleGetUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
