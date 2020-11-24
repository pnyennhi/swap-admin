import React, { useState } from "react";
import { edit, del, publisher } from "../../../components/svg/icon";
import EditPublisherModal from "./EditPublisherModal";
import PublisherDetailModal from "./PublisherDetailModal";

const PublisherTable = (props) => {
  const {
    publishers,
    selectedPublishers,
    onDelete,
    onSelect,
    onSelectAll,
    onSort,
    onEdit,
  } = props;

  const [editedPublisherId, setEditedPublisherId] = useState(null);
  const [detailedPublisherId, setDetailedPublisherId] = useState(null);

  const handlesetEditedBookId = (id) => {
    setEditedPublisherId(id);
  };

  const handleCloseEditModal = () => {
    setEditedPublisherId(null);
  };

  const handleCloseDetailModal = () => {
    setDetailedPublisherId(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover dataTable">
        <colgroup>
          <col span="1" style={{ width: "2%" }} />
          <col span="1" style={{ width: "4%" }} />
          <col span="1" style={{ width: "20%" }} />
          <col span="1" style={{ width: "50%" }} />
          <col span="1" style={{ width: "12%" }} />
          <col span="1" style={{ width: "8%" }} />
        </colgroup>
        <tr className="tr-header">
          <th>
            {/* <input
              type="checkbox"
              checked={
                selectedPublishers.length === publishers.length &&
                publishers.length > 0
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
              onSort("condition");
            }}
          >
            Tình trạng
          </th>
          <th
            onClick={() => {
              onSort("description");
            }}
          >
            Mô tả
          </th>
          <th
            onClick={() => {
              onSort("totalProducts");
            }}
          >
            Số sản phẩm
          </th>

          <th>Action</th>
        </tr>

        <tbody>
          {publishers.map((publisher) => (
            <tr
              className={
                selectedPublishers.indexOf(publisher.id) > -1
                  ? "selected tr-body"
                  : "tr-body"
              }
              key={publisher.id}
            >
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    onSelect(e, publisher.id);
                  }}
                  checked={selectedPublishers.indexOf(publisher.id) > -1}
                />
              </td>
              <td>{publisher.id}</td>
              <td>
                <a
                  onClick={() => {
                    setDetailedPublisherId(publisher.id);
                  }}
                >
                  {publisher.condition}
                </a>
              </td>
              <td>{publisher.description}</td>
              <td>{publisher.totalProducts}</td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => handlesetEditedBookId(publisher.id)}
                >
                  {edit}
                </button>
                {"  "}
                <button
                  className="icon-button"
                  onClick={() => {
                    onDelete(publisher.id);
                  }}
                >
                  {del}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(editedPublisherId) && (
        <EditPublisherModal
          show={Boolean(editedPublisherId)}
          publisherId={editedPublisherId}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
        />
      )}

      {Boolean(detailedPublisherId) && (
        <PublisherDetailModal
          show={Boolean(detailedPublisherId)}
          publisherId={detailedPublisherId}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default PublisherTable;
