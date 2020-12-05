import React, { useState, useRef, useEffect } from "react";
import DashboardItem from "./components/DashboardItem";
import { DatePicker } from "antd";

import loading from "../../assets/images/loading.gif";

import Axios from "../../Instance";

const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [date, setDate] = useState({ from: null, to: new Date() });

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/dashboard")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setHasError("Đã có lỗi xảy ra");
      });
  }, []);

  const handleChangeCalendar = (moment, stringDate) => {
    Axios.get(
      `http://localhost:3001/dashboard?fromDate=${stringDate[0]}&toDate=${stringDate[1]}`
    )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setHasError("Đã có lỗi xảy ra");
      });
  };

  return (
    <>
      <nav className="page-breadcrumb flex justify-content-between">
        <h5>DASHBOARD</h5>
        <div className="flex jusify-content-end">
          <RangePicker onChange={handleChangeCalendar} />
        </div>
      </nav>

      {isLoading ? (
        <img src={loading} width="50px" className="loading" />
      ) : hasError ? (
        <p>abc</p>
      ) : (
        <div className="row">
          <div className="col-12 col-xl-12 stretch-card">
            <div className="row flex-grow justify-content-center">
              {data.map((item) => (
                <DashboardItem
                  key={item.key}
                  title={item.title}
                  type={item.key}
                  total={item.count}
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
