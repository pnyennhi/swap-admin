import React from "react";
// import subscriber from "../../../assets/images/subscribe.svg";
// import user from "../../../assets/images/user.svg";
// import order from "../../../assets/images/order.svg";
// import compltes from "../../../assets/images/order1.svg";
import { DASHBOARD } from "../../../constants";

const DashboardItem = (props) => {
  const { type, total, title } = props;

  const config = DASHBOARD.find((item) => item.type === type);

  return (
    <div className="col-md-3 grid-margin stretch-card">
      <div
        className="card"
        style={{ backgroundImage: config.background, borderRadius: "10px" }}
      >
        <div className="card-body d-flex align-items-center">
          <div className="row">
            <div
              className="align-items-center col-6 col-md-7 flex flex-column justify-content-center"
              style={{ color: "white" }}
            >
              <h2 className="mb-2" style={{ fontSize: "1.75rem" }}>
                {new Number(total).toLocaleString("vi-VI")}
              </h2>
              <h5>{title}</h5>
            </div>
            <div className="col-6 col-md-5">
              <div id="apexChart1" className="mt-md-3 mt-xl-0">
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
