import React, { useState } from "react";
import { edit, del, book } from "../../../components/svg/icon";
import EditUserModal from "./EditUserModal";

const UserTable = (props) => {
  const { users, selectedUsers, onDelete, onSelect, onSelectAll } = props;

  const [editedUser, setEditedUser] = useState(null);

  const handleSetEditedUser = (id) => {
    setEditedUser(id);
  };

  const handleCloseEditModal = () => {
    setEditedUser(null);
  };

  return (
    <div class="table-responsive">
      <table id="dataTableExample" class="table">
        <tr>
          <th>
            <input
              type="checkbox"
              checked={
                selectedUsers.length === users.length && users.length > 0
              }
              onChange={(e) => onSelectAll(e)}
            />
          </th>
          <th>Id</th>
          <th>Username</th>
          <th>Tên</th>
          <th>Ngày đăng ký</th>
          <th>Vai trò</th>
          <th>Trạng thái</th>
          <th>Action</th>
        </tr>

        <tbody>
          {users.map((book) => (
            <tr>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    onSelect(e, book.id);
                  }}
                  checked={selectedUsers.indexOf(book.id) > -1}
                />
              </td>
              <td>{book.id}</td>
              <td>{book.username}</td>
              <td>{book.name}</td>
              <td>{book.registerDate}</td>
              <td>{book.role}</td>
              <td>{book.status}</td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => handleSetEditedUser(book)}
                >
                  {edit}
                </button>
                {"  "}
                <button
                  className="icon-button"
                  onClick={() => {
                    onDelete(book.id);
                  }}
                >
                  {del}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Boolean(editedUser) && (
        <EditUserModal
          show={Boolean(editedUser)}
          user={editedUser}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default UserTable;
