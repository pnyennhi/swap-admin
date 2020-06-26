import React, { useState, useRef, useEffect } from "react";
import DashboardItem from "./components/DashboardItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { calendar } from "../../components/svg/icon";
import loading from "../../assets/images/loading.gif";

import Axios from "../../Instance";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState([]);
  const calendarIcon = useRef();

  useEffect(() => {
    (async () => {
      const data = [];
      setIsLoading(true);
      const userReq = await Axios.get(
        `https://bookstoreprojectdut.azurewebsites.net/api/applicationuser/statistic/all`
      );
      const subcriberReq = await Axios.get(
        `https://bookstoreprojectdut.azurewebsites.net/api/subcribers/statistic/all`
      );
      const orderReq = await Axios.get(
        `https://bookstoreprojectdut.azurewebsites.net/api/orders/statistic/all`
      );

      if (!userReq.error && !subcriberReq.error && !orderReq.error) {
        const user = {
          type: "user",
          title: "Total Users",
          total: userReq.data.userCount,
          background:
            "linear-gradient(to right, rgb(103, 115, 255), rgb(93, 204, 185))",
        };
        const subscriber = {
          type: "subscriber",
          title: "Total Subscribers",
          total: subcriberReq.data.subcirberCount,
          background:
            "linear-gradient(to right, rgb(188, 228, 66), rgb(255, 204, 44))",
        };
        const order = {
          type: "order",
          title: "Total Orders",
          total: orderReq.data.orderCount,
          background:
            "linear-gradient(to right, rgb(255, 168, 117), rgb(251, 72, 72))",
        };

        setData([user, subscriber, order]);
      } else {
        setHasError(true);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <nav class="page-breadcrumb flex justify-content-between">
        <h5>DASHBOARD</h5>
        <div class="input-group date datepicker dashboard-date mr-2 mb-2 mb-md-0  d-xl-flex">
          <span
            class="input-group-addon bg-transparent"
            onClick={() => {
              calendarIcon.current.setOpen(true);
            }}
          >
            {calendar}
          </span>
          <DatePicker
            className="form-control"
            dateFormat="dd/MM/yyyy"
            popperPlacement="top-left"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            ref={calendarIcon}
          />
        </div>
      </nav>

      {isLoading ? (
        <img src={loading} width="50px" className="loading" />
      ) : hasError ? (
        <p>abc</p>
      ) : (
        <div class="row">
          <div class="col-12 col-xl-12 stretch-card">
            <div class="row flex-grow">
              {data.map((item) => (
                <DashboardItem
                  key={item.title}
                  type={item.type}
                  title={item.title}
                  total={item.total}
                  background={item.background}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
