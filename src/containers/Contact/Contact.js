import React, { useState, useEffect } from "react";

import ContactTable from "./components/ContactTable";
import ContactToolbar from "./components/ContactToolbar";
// import DeleteContactModal from "./components/DeleteContactModal";
// import AddContactModal from "./components/AddContactModal";
import Pagination from "../../components/Pagination";

import { add } from "../../components/svg/icon";
import loading from "../../assets/images/loading.gif";

import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [deletedContact, setDeletedContact] = useState(null);
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
    //call API get when filters change (get contact list)
    handleGetBook();
  }, [filters]);

  const handleGetBook = () => {
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
    axios
      .get(
        `https://bookstoreprojectdut.azurewebsites.net/api/contacts?${query}`
      )
      .then((res) => {
        setContacts(res.data.items);
        setTotalRows(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
      });
  };

  const handleSetDeletedBook = (id) => {
    setDeletedContact(id);
  };

  const handleCloseDeleteModal = () => {
    setDeletedContact(null);
    setShowDeleteModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleDeleteContact = (ids) => {
    //delete contact API
    //id is an array
    const deletedAPIs = ids.map((id) => {
      return axios.delete(
        `https://bookstoreprojectdut.azurewebsites.net/api/contacts/${id}`
      );
    });
    Promise.all(deletedAPIs)
      .then((res) => {
        toast.success("Delete thanh cong");
        setSelectedContacts([]);
        setDeletedContact(null);
        setShowDeleteModal(false);
        handleGetBook();
      })
      .catch((err) => {
        toast.error("Fail");
        setSelectedContacts([]);
        setDeletedContact(null);
        setShowDeleteModal(false);
      });

    // setDeletedContact(null);
    // setShowDeleteModal(false);
    // handleDeleteBooks(ids);
  };

  const handleSelectOneContact = (e, id) => {
    const selectedIndex = selectedContacts.indexOf(id);
    let newSelectedBooks = [...selectedContacts];
    console.log(newSelectedBooks);

    if (selectedIndex === -1) {
      newSelectedBooks.push(id);
    } else {
      newSelectedBooks.splice(selectedIndex, 1);
    }
    setSelectedContacts(newSelectedBooks);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked)
      setSelectedContacts(contacts.map((contact) => contact.contactID));
    else setSelectedContacts([]);
  };

  const handleSearchContacts = () => {
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
      <nav class="page-breadcrumb flex align-items-center justify-content-between">
        <h5>QUẢN LÝ THỂ LOẠI</h5>
      </nav>

      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <ContactToolbar
                selectedLength={selectedContacts.length}
                onSearch={handleSearchContacts}
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
                  <ContactTable
                    contacts={contacts}
                    selectedContacts={selectedContacts}
                    onDelete={handleSetDeletedBook}
                    onSelect={handleSelectOneContact}
                    onSelectAll={handleSelectAll}
                    onSort={handleSort}
                    onEdit={handleGetBook}
                    onSetContacts={setContacts}
                  />

                  <Pagination
                    totalRows={totalRows}
                    page={filters.page}
                    pageSize={filters.pageSize}
                    onChange={handleChangePage}
                  />
                </>
              )}

              {/* {(Boolean(deletedContact) || showDeleteModal) && (
                <DeleteContactModal
                  show={Boolean(deletedContact) || showDeleteModal}
                  contactIds={
                    showDeleteModal ? selectedContacts : [deletedContact]
                  }
                  onClose={handleCloseDeleteModal}
                  onDelete={handleDeleteContact}
                />
              )}

              {showAddModal && (
                <AddContactModal
                  show={showAddModal}
                  onClose={handleCloseAddModal}
                  onAdd={handleGetBook}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
