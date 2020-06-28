import React, { useState } from "react";
import { edit, del } from "../../../components/svg/icon";
import EditSubcriberModal from "./EditSubcriberModal";
// import SubcriberDetailModal from "./SubcriberDetailModal";

const SubcriberTable = (props) => {
  const {
    subcribers,
    selectedSubcribers,
    onDelete,
    onSelect,
    onSelectAll,
    onSort,
    onEdit,
  } = props;

  const [editedSubcriberId, setEditedSubcriberId] = useState(null);
  const [detailedSubcriberId, setDetailedSubcriberId] = useState(null);

  const handlesetEditedBookId = (id) => {
    setEditedSubcriberId(id);
  };

  const handleCloseEditModal = () => {
    setEditedSubcriberId(null);
  };

  const handleCloseDetailModal = () => {
    setDetailedSubcriberId(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover dataTable">
        <tr className="tr-header">
          <th>
            {/* <input
              type="checkbox"
              checked={
                selectedSubcribers.length === subcribers.length &&
                subcribers.length > 0
              }
              onChange={(e) => onSelectAll(e)}
            /> */}
          </th>
          <th
            onClick={() => {
              onSort("subcriberId");
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
              onSort("createdDate");
            }}
          >
            Ngày đăng ký
          </th>

          <th>Action</th>
        </tr>

        <tbody>
          {subcribers.map((subcriber) => (
            <tr
              className={
                selectedSubcribers.indexOf(subcriber.subcriberId) > -1
                  ? "selected tr-body"
                  : "tr-body"
              }
            >
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    onSelect(e, subcriber.subcriberId);
                  }}
                  checked={
                    selectedSubcribers.indexOf(subcriber.subcriberId) > -1
                  }
                />
              </td>
              <td>{subcriber.subcriberId}</td>
              <td>
                {/* <a
                  onClick={() => {
                    setDetailedSubcriberId(subcriber.subcriberId);
                  }}
                > */}
                {subcriber.email}
                {/* </a> */}
              </td>
              <td>
                {new Date(subcriber.createdDate).toLocaleDateString("en-GB")}
              </td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => handlesetEditedBookId(subcriber.subcriberId)}
                >
                  {edit}
                </button>
                {"  "}
                <button
                  className="icon-button"
                  onClick={() => {
                    onDelete(subcriber.subcriberId);
                  }}
                >
                  {del}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(editedSubcriberId) && (
        <EditSubcriberModal
          show={Boolean(editedSubcriberId)}
          subcriberId={editedSubcriberId}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
        />
      )}

      {/*{Boolean(detailedSubcriberId) && (
        <SubcriberDetailModal
          show={Boolean(detailedSubcriberId)}
          subcriberId={detailedSubcriberId}
          onClose={handleCloseDetailModal}
        />
      )} */}
    </div>
  );
};

export default SubcriberTable;
