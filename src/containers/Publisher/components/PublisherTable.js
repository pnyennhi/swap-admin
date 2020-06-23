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
    <div class="table-responsive">
      <table class="table table-striped table-hover dataTable">
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
              onSort("publisherID");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("publisher");
            }}
          >
            Thể loại
          </th>
          <th
            onClick={() => {
              onSort("bookTitleCount");
            }}
          >
            Số đầu sách
          </th>

          <th>Action</th>
        </tr>

        <tbody>
          {publishers.map((publisher) => (
            <tr
              className={
                selectedPublishers.indexOf(publisher.publisherID) > -1
                  ? "selected tr-body"
                  : "tr-body"
              }
            >
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    onSelect(e, publisher.publisherID);
                  }}
                  checked={
                    selectedPublishers.indexOf(publisher.publisherID) > -1
                  }
                />
              </td>
              <td>{publisher.publisherID}</td>
              <td>
                <a
                  onClick={() => {
                    setDetailedPublisherId(publisher.publisherID);
                  }}
                >
                  {publisher.publisher}
                </a>
              </td>
              <td>{publisher.bookTitleCount}</td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => handlesetEditedBookId(publisher.publisherID)}
                >
                  {edit}
                </button>
                {"  "}
                <button
                  className="icon-button"
                  onClick={() => {
                    onDelete(publisher.publisherID);
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
