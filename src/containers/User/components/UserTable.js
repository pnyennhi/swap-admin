import React, { useState } from "react";
import { edit, unlock, ban } from "../../../components/svg/icon";
import EditUserModal from "./EditUserModal";
import UserDetailModal from "./UserDetailModal";

const UserTable = (props) => {
  const {
    users,
    selectedUsers,
    onDelete,
    onSelect,
    onUnlock,
    onSort,
    onEdit,
  } = props;

  const [editedUserId, setEditedUserId] = useState(null);
  const [detailedUserId, setDetailedUserId] = useState(null);

  const handlesetEditedBookId = (id) => {
    setEditedUserId(id);
  };

  const handleCloseEditModal = () => {
    setEditedUserId(null);
  };

  const handleCloseDetailModal = () => {
    setDetailedUserId(null);
  };

  return (
    <div className="table-responsive">
      <table
        style={{ tableLayout: "fixed" }}
        className="table table-striped table-hover dataTable"
      >
        <colgroup>
          <col span="1" style={{ width: "2%" }} />
          <col span="1" style={{ width: "6%" }} />
          <col span="1" style={{ width: "15%" }} />
          <col span="1" style={{ width: "23%" }} />
          <col span="1" style={{ width: "10%" }} />
          <col span="1" style={{ width: "8%" }} />
          <col span="1" style={{ width: "10%" }} />
          <col span="1" style={{ width: "8%" }} />
          <col span="1" style={{ width: "8%" }} />
        </colgroup>
        <tr className="tr-header">
          <th>
            {/* <input
              type="checkbox"
              checked={
                selectedUsers.length === users.length &&
                users.length > 0
              }
              onChange={(e) => onSelectAll(e)}
            /> */}
          </th>
          <th
            onClick={() => {
              onSort("id");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("username");
            }}
          >
            Username
          </th>
          <th
            onClick={() => {
              onSort("email");
            }}
          >
            Email
          </th>
          <th
            onClick={() => {
              onSort("phone");
            }}
          >
            Điện thoại
          </th>
          <th
            onClick={() => {
              onSort("roleId");
            }}
          >
            Vai trò
          </th>
          <th
            onClick={() => {
              onSort("createdAt");
            }}
          >
            Ngày đăng kí
          </th>
          <th
            onClick={() => {
              onSort("isActive");
            }}
            className="text-center"
          >
            Status
          </th>

          <th>Action</th>
        </tr>

        <tbody>
          {users.map((user) => (
            <tr
              className={
                selectedUsers.indexOf(user.id) > -1
                  ? "selected tr-body"
                  : "tr-body"
              }
              key={user.id}
            >
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    onSelect(e, user.id);
                  }}
                  checked={selectedUsers.indexOf(user.id) > -1}
                />
              </td>
              <td>
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user.id}
                </div>
              </td>
              <td>
                <a
                  onClick={() => {
                    setDetailedUserId(user.id);
                  }}
                >
                  {user.username}
                </a>
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString("en-GB")}</td>
              <td className="text-center">
                <span
                  className={`badge ${
                    user.isActive ? "badge-success" : "badge-secondary"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => handlesetEditedBookId(user.id)}
                >
                  {edit}
                </button>
                {"  "}
                {user.isActive ? (
                  <button
                    className="icon-button"
                    onClick={() => {
                      onDelete(user.id);
                    }}
                  >
                    {ban}
                  </button>
                ) : (
                  <button
                    className="icon-button"
                    onClick={() => {
                      onUnlock(user.id);
                    }}
                  >
                    {unlock}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(editedUserId) && (
        <UserDetailModal
          show={Boolean(editedUserId)}
          userId={editedUserId}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
        />
      )}

      {Boolean(detailedUserId) && (
        <UserDetailModal
          show={Boolean(detailedUserId)}
          userId={detailedUserId}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default UserTable;
