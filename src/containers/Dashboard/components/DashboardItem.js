import React from "react";
import subscriber from "../../../assets/images/subscribe.svg";
import user from "../../../assets/images/user.svg";
import order from "../../../assets/images/order.svg";

const DashboardItem = (props) => {
  const { type, title, total, background } = props;
  return (
    <div class="col-md-4 grid-margin stretch-card">
      <div
        class="card"
        style={{ backgroundImage: background, borderRadius: "10px" }}
      >
        <div class="card-body">
          <div class="row">
            <div
              class="align-items-center col-6 col-md-7 flex flex-column justify-content-center"
              style={{ color: "white" }}
            >
              <h2 class="mb-2">{total}</h2>
              <h5>{title}</h5>
            </div>
            <div class="col-6 col-md-5">
              <div id="apexChart1" class="mt-md-3 mt-xl-0">
                <img
                  src={
                    type === "user"
                      ? user
                      : type === "subscriber"
                      ? subscriber
                      : order
                  }
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardItem;
