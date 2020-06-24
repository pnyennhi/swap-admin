import React, { useState } from "react";
import { edit, del, user } from "../../../components/svg/icon";
import EditUserModal from "./EditUserModal";
import UserDetailModal from "./UserDetailModal";

const UserTable = (props) => {
  const {
    users,
    selectedUsers,
    onDelete,
    onSelect,
    onSelectAll,
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
          <col span="1" style={{ width: "20%" }} />
          <col span="1" style={{ width: "18%" }} />
          <col span="1" style={{ width: "10%" }} />
          <col span="1" style={{ width: "15%" }} />
          <col span="1" style={{ width: "5%" }} />
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
              onSort("email");
            }}
          >
            Email
          </th>
          <th
            onClick={() => {
              onSort("name");
            }}
          >
            Tên
          </th>
          <th
            onClick={() => {
              onSort("accountCreateDate");
            }}
          >
            Ngày đăng kí
          </th>
          <th
            onClick={() => {
              onSort("status");
            }}
            className="text-center"
          >
            Trạng thái
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
                  {user.email}
                </a>
              </td>
              <td>{user.name}</td>
              <td>
                {new Date(user.accountCreateDate).toLocaleDateString("en-GB")}
              </td>
              <td className="text-center">
                <span
                  className={`badge ${
                    user.status ? "badge-success" : "badge-secondary"
                  }`}
                >
                  {user.status ? "Available" : "Unavailable"}
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
                <button
                  className="icon-button"
                  onClick={() => {
                    onDelete(user.id);
                  }}
                >
                  {del}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(editedUserId) && (
        <EditUserModal
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
