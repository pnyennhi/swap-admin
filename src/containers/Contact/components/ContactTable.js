import React, { useState } from "react";
import { edit, check, view } from "../../../components/svg/icon";
import EditContactModal from "./EditContactModal";
import ContactDetailModal from "./ContactDetailModal";

import { CONTACT_STATUS } from "../../../constants";

import Axios from "../../../Instance";

const STATUSES = CONTACT_STATUS.map((status) => status.status);

const ContactTable = (props) => {
  const { contacts, onSort, onEdit, onSetContacts } = props;

  const [editedContactId, setEditedContactId] = useState(null);
  const [detailedContactId, setDetailedContactId] = useState(null);

  const handlesetEditedContactId = (contactID) => {
    setEditedContactId(contactID);
  };

  const handleCloseEditModal = () => {
    setEditedContactId(null);
  };

  const handleCloseDetailModal = () => {
    setDetailedContactId(null);
  };

  const handleProcessContact = (contactID, index) => {
    let statusID =
      CONTACT_STATUS[STATUSES.indexOf(contacts[index].status) + 1].id;
    let status = STATUSES[STATUSES.indexOf(contacts[index].status) + 1];

    Axios.put(
      `https://bookstoreprojectdut.azurewebsites.net/api/contacts/${contactID}`,
      { status: statusID }
    ).then((res) => {
      let newContacts = [...contacts];
      newContacts[index].status = status;
      onSetContacts(newContacts);
    });
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover dataTable">
        <tr className="tr-header">
          <th
            onClick={() => {
              onSort("contactID");
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
              onSort("message");
            }}
          >
            Nội dung
          </th>
          <th
            onClick={() => {
              onSort("date");
            }}
          >
            Ngày gửi
          </th>
          <th
            onClick={() => {
              onSort("status");
            }}
          >
            Trạng thái
          </th>

          <th>Action</th>
        </tr>

        <tbody>
          {contacts.map((contact, index) => (
            <tr className="tr-body">
              <td>{contact.contactID}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.date).toLocaleDateString("en-GB")}</td>
              <td>
                <span
                  className={`badge ${
                    CONTACT_STATUS.find(
                      (status) => status.status === contact.status
                    )?.color
                  }`}
                >
                  {contact.status}
                </span>
              </td>
              <td>
                {contact.status !== "Đã xử lí" && (
                  <>
                    <button
                      className="icon-button"
                      onClick={() =>
                        handleProcessContact(contact.contactID, index)
                      }
                    >
                      {check}
                    </button>
                    {"   "}
                  </>
                )}
                {contact.status !== "Đã xử lí" ? (
                  <button
                    className="icon-button"
                    onClick={() => handlesetEditedContactId(contact.contactID)}
                  >
                    {edit}
                  </button>
                ) : (
                  <button
                    className="icon-button"
                    onClick={() => setDetailedContactId(contact.contactID)}
                  >
                    {view}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(editedContactId) && (
        <EditContactModal
          show={Boolean(editedContactId)}
          contactId={editedContactId}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
        />
      )}

      {Boolean(detailedContactId) && (
        <ContactDetailModal
          show={Boolean(detailedContactId)}
          contactId={detailedContactId}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default ContactTable;
