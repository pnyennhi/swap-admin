import React, { useState, useEffect } from "react";

import CategoryTable from "./components/CategoryTable";
import CategoryToolbar from "./components/CategoryToolbar";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import AddCategoryModal from "./components/AddCategoryModal";
import Pagination from "../../components/Pagination";

import { add } from "../../components/svg/icon";
import loading from "../../assets/images/loading.gif";

import Axios from "../../Instance";
import queryString from "query-string";
import { toast } from "react-toastify";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [deletedCategory, setDeletedCategory] = useState(null);
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
    //call API get when filters change (get category list)
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
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/categories?${query}`
    )
      .then((res) => {
        setCategories(res.data.items);
        setTotalRows(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
      });
  };

  const handleSetDeletedBook = (id) => {
    setDeletedCategory(id);
  };

  const handleCloseDeleteModal = () => {
    setDeletedCategory(null);
    setShowDeleteModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleDeleteCategory = (ids) => {
    //delete category API
    //id is an array
    const deletedAPIs = ids.map((id) => {
      return Axios.delete(
        `https://bookstoreprojectdut.azurewebsites.net/api/categories/${id}`
      );
    });
    Promise.all(deletedAPIs)
      .then((res) => {
        toast.success("Delete thanh cong");
        setSelectedCategories([]);
        setDeletedCategory(null);
        setShowDeleteModal(false);
        handleGetBook();
      })
      .catch((err) => {
        toast.error("Fail");
        setSelectedCategories([]);
        setDeletedCategory(null);
        setShowDeleteModal(false);
      });

    // setDeletedCategory(null);
    // setShowDeleteModal(false);
    // handleDeleteBooks(ids);
  };

  const handleSelectOneCategory = (e, id) => {
    const selectedIndex = selectedCategories.indexOf(id);
    let newSelectedBooks = [...selectedCategories];
    console.log(newSelectedBooks);

    if (selectedIndex === -1) {
      newSelectedBooks.push(id);
    } else {
      newSelectedBooks.splice(selectedIndex, 1);
    }
    setSelectedCategories(newSelectedBooks);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked)
      setSelectedCategories(categories.map((category) => category.categoryID));
    else setSelectedCategories([]);
  };

  const handleSearchCategories = () => {
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
        <h5>QUẢN LÝ THỂ LOẠI</h5>
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
              <CategoryToolbar
                selectedLength={selectedCategories.length}
                onSearch={handleSearchCategories}
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
                  <CategoryTable
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onDelete={handleSetDeletedBook}
                    onSelect={handleSelectOneCategory}
                    onSelectAll={handleSelectAll}
                    onSort={handleSort}
                    onEdit={handleGetBook}
                  />

                  <Pagination
                    totalRows={totalRows}
                    page={filters.page}
                    pageSize={filters.pageSize}
                    onChange={handleChangePage}
                  />
                </>
              )}

              {(Boolean(deletedCategory) || showDeleteModal) && (
                <DeleteCategoryModal
                  show={Boolean(deletedCategory) || showDeleteModal}
                  categoryIds={
                    showDeleteModal ? selectedCategories : [deletedCategory]
                  }
                  onClose={handleCloseDeleteModal}
                  onDelete={handleDeleteCategory}
                />
              )}

              {showAddModal && (
                <AddCategoryModal
                  show={showAddModal}
                  onClose={handleCloseAddModal}
                  onAdd={handleGetBook}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
