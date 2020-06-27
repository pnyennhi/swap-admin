import React from "react";
// import subscriber from "../../../assets/images/subscribe.svg";
// import user from "../../../assets/images/user.svg";
// import order from "../../../assets/images/order.svg";
// import compltes from "../../../assets/images/order1.svg";
import { DASHBOARD } from "../../../constants";

const DashboardItem = (props) => {
  const { type, total } = props;

  const config = DASHBOARD.find((item) => item.type === type);

  return (
    <div class="col-md-4 grid-margin stretch-card">
      <div
        class="card"
        style={{ backgroundImage: config.background, borderRadius: "10px" }}
      >
        <div class="card-body">
          <div class="row">
            <div
              class="align-items-center col-6 col-md-7 flex flex-column justify-content-center"
              style={{ color: "white" }}
            >
              <h2 class="mb-2" style={{ fontSize: "1.75rem" }}>
                {new Number(total).toLocaleString("vi-VI")}
              </h2>
              <h5>{config.title}</h5>
            </div>
            <div class="col-6 col-md-5">
              <div id="apexChart1" class="mt-md-3 mt-xl-0">
                <img
                  src={require("../../../assets/images/" + type + ".svg")}
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
