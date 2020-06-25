import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import Modal from "../../../components/Modal";
import ErrorFocus from "../../../components/ErrorFocus";
import TextInput from "../../../components/TextInput";

import OrderInvoice from "./OrderInvoice";

import loading from "../../../assets/images/loading.gif";

import Axios from "../../../Instance";

import { toast } from "react-toastify";

import { ORDER_STATUS } from "../../../constants";

const STATUSES = ORDER_STATUS.map((status) => status.status);

const EditOrderModal = (props) => {
  const { show, orderId, onClose, onEdit } = props;

  const [editedOrder, setEditedOrder] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://bookstoreprojectdut.azurewebsites.net/api/orders/${orderId}`
    ).then((res) => {
      setEditedOrder(res.data);
    });
  }, []);

  const handleSubmit = (data, actions) => {
    setIsLoading(true);
    const newStatus = STATUSES[STATUSES.indexOf(editedOrder.status) + 1];
    Axios.put(
      `https://bookstoreprojectdut.azurewebsites.net/api/orders/${orderId}`,
      { status: newStatus }
    )
      .then((res) => {
        console.log(res.status);
        actions.setSubmitting(false);
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success("Edit đơn hàng thành công!");
        setEditedOrder({ ...editedOrder, status: newStatus });
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        setIsLoading(false);
        actions.setSubmitting(false);
      });
  };

  return (
    <Modal show={show} maxWidth="910px">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Chỉnh sửa đơn hàng
        </h5>
        <button
          className="close"
          onClick={() => {
            onClose();
            if (isSubmitted) onEdit();
          }}
        >
          <span>×</span>
        </button>
      </div>

      {editedOrder ? (
        <Formik
          enableReinitialize={true}
          initialValues={editedOrder}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              setFieldValue,
            } = props;

            return (
              <Form>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <Field
                        type="text"
                        name="orderID"
                        component={TextInput}
                        className="form-control"
                        label="Id"
                        disabled
                      />
                      <Field
                        type="text"
                        name="email"
                        component={TextInput}
                        className="form-control"
                        label="Email"
                        disabled
                      />

                      <Field
                        type="text"
                        name="nameOfRecipient"
                        component={TextInput}
                        className="form-control"
                        label="Tên người nhận"
                        disabled
                      />
                      <Field
                        type="text"
                        name="phone"
                        component={TextInput}
                        className="form-control"
                        label="Số điện thoại"
                        disabled
                      />
                      <div className="form-group">
                        <label>
                          <b>Địa chỉ</b>
                        </label>
                        <textarea className="form-control" disabled>
                          {editedOrder.address}
                        </textarea>
                      </div>
                      <div className="form-group">
                        <label>
                          <b>Ghi chú</b>
                        </label>
                        <textarea className="form-control" disabled>
                          {editedOrder.note}
                        </textarea>
                      </div>
                      <div className="form-group">
                        <label>
                          <b>Ghi chú</b>
                        </label>
                        <input
                          className="form-control"
                          value={new Date(editedOrder.date).toLocaleDateString(
                            "en-GB"
                          )}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-7">
                      <div className="flex justify-content-between mb-3 pr-3">
                        <label className="mb-0">
                          <b>Chi tiết đơn hàng</b>
                        </label>
                        <span
                          className={`badge ${
                            ORDER_STATUS.find(
                              (status) => status.status === editedOrder.status
                            )?.color
                          }`}
                        >
                          {editedOrder.status}
                        </span>
                      </div>
                      <OrderInvoice order={editedOrder} />
                    </div>
                  </div>

                  <ErrorFocus />
                </div>
                <div className="modal-footer">
                  <img
                    style={{
                      display: isLoading ? "inline" : "none",
                      marginRight: "1rem",
                    }}
                    src={loading}
                    width="6%"
                  />

                  {editedOrder.status !== "Đã hủy" &&
                    editedOrder.status !== "Hoàn thành" && (
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={isSubmitting}
                      >
                        {
                          ORDER_STATUS.find(
                            (status) => status.status === editedOrder.status
                          ).nextStep
                        }
                      </button>
                    )}

                  {editedOrder.status !== "Đã hủy" &&
                    editedOrder.status !== "Hoàn thành" && (
                      <button className="btn btn-danger">Hủy</button>
                    )}
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      onClose();
                      if (isSubmitted) onEdit();
                    }}
                    disabled={isSubmitting}
                  >
                    Đóng
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <img style={{ margin: "20px auto" }} src={loading} width="10%" />
      )}
    </Modal>
  );
};

export default EditOrderModal;
