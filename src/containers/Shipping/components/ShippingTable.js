import React, { useState } from "react";
import { edit, del, shipping } from "../../../components/svg/icon";
import EditShippingModal from "./EditShippingModal";
import ShippingDetailModal from "./ShippingDetailModal";

const ShippingTable = (props) => {
  const { shippings, onSort, onEdit } = props;

  const [editedDistrictID, setEditedDistrictID] = useState(null);
  const [detailedDistrictID, setDetailedDistrictID] = useState(null);

  const handlesetEditedBookId = (id) => {
    setEditedDistrictID(id);
  };

  const handleCloseEditModal = () => {
    setEditedDistrictID(null);
  };

  const handleCloseDetailModal = () => {
    setDetailedDistrictID(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover dataTable">
        <tr className="tr-header">
          <th
            onClick={() => {
              onSort("id");
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              onSort("name");
            }}
          >
            Phương thức vận chuyển
          </th>
          <th
            onClick={() => {
              onSort("baseFee");
            }}
          >
            Phí tiêu chuẩn
          </th>
          <th
            onClick={() => {
              onSort("feePerUnit");
            }}
          >
            Phí / kg
          </th>
          <th
            onClick={() => {
              onSort("minForFree");
            }}
          >
            Miễn phí tối thiểu
          </th>
          <th
            onClick={() => {
              onSort("");
            }}
          >
            Thời gian
          </th>

          <th>Action</th>
        </tr>

        <tbody>
          {shippings.map((shipping) => (
            <tr className="tr-body" key={shipping.id}>
              <td>{shipping.id}</td>
              <td>
                <a
                  onClick={() => {
                    setDetailedDistrictID(shipping.id);
                  }}
                >
                  {shipping.name}
                </a>
              </td>
              <td>{shipping.baseFee}</td>
              <td>{shipping.feePerUnit}</td>
              <td>{shipping.minForFree}</td>
              <td>
                {shipping.minTime} - {shipping.maxTime} ngày
              </td>
              <td>
                <button
                  className="icon-button"
                  onClick={() => handlesetEditedBookId(shipping.id)}
                >
                  {edit}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {Boolean(editedDistrictID) && (
        <EditShippingModal
          show={Boolean(editedDistrictID)}
          districtID={editedDistrictID}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
        />
      )}

      {Boolean(detailedDistrictID) && (
        <ShippingDetailModal
          show={Boolean(detailedDistrictID)}
          districtID={detailedDistrictID}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default ShippingTable;
