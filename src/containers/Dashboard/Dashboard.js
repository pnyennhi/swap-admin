import React, { useState, useRef, useEffect } from "react";
import DashboardItem from "./components/DashboardItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { calendar } from "../../components/svg/icon";
import loading from "../../assets/images/loading.gif";

import Axios from "../../Instance";

const Dashboard = () => {
  const [date, setDate] = useState({ from: null, to: new Date() });

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState([
    { type: "order", count: null },
    { type: "completed", count: null },
    { type: "total", count: null },
    { type: "user", count: null },
    { type: "subscriber", count: null },
  ]);
  const calendarIcon = useRef();

  useEffect(() => {
    (async () => {
      if (date.from && date.to) {
        const formatedDate = {
          from: date.from.toLocaleDateString("en-GB"),
          to: date.to.toLocaleDateString("en-GB"),
        };
        const query = `from=${formatedDate.from}&to=${formatedDate.to}`;
        getDataFromApi(
          `https://bookstoreprojectdut.azurewebsites.net/api/applicationuser/statistic/all?${query}`
        );
        getDataFromApi(
          `https://bookstoreprojectdut.azurewebsites.net/api/subcribers/statistic/all?${query}`
        );
        getDataFromApi(
          `https://bookstoreprojectdut.azurewebsites.net/api/orders/statistic/all?${query}`
        );
        getDataFromApi(
          `https://bookstoreprojectdut.azurewebsites.net/api/orders/statistic/completed?${query}`
        );
        getDataFromApi(
          `https://bookstoreprojectdut.azurewebsites.net/api/orders/statistic/total?${query}`
        );
      }
    })();
  }, [date]);

  useEffect(() => {
    const data = [];

    getDataFromApi(
      `https://bookstoreprojectdut.azurewebsites.net/api/applicationuser/statistic/all`
    );
    getDataFromApi(
      `https://bookstoreprojectdut.azurewebsites.net/api/subcribers/statistic/all`
    );
    getDataFromApi(
      `https://bookstoreprojectdut.azurewebsites.net/api/orders/statistic/all`
    );
    getDataFromApi(
      `https://bookstoreprojectdut.azurewebsites.net/api/orders/statistic/completed`
    );
    getDataFromApi(
      `https://bookstoreprojectdut.azurewebsites.net/api/orders/statistic/total`
    );
  }, []);

  const getDataFromApi = (api) => {
    setIsLoading(true);
    Axios.get(api)
      .then((res) => {
        const resData = res.data;
        const key = Object.keys(resData)[0];
        const type = key.substring(0, key.indexOf("Count"));
        const types = data.map((item) => item.type);
        const newData = [...data];
        newData[types.indexOf(type)].count = resData[key];
        setData(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        setHasError(true);
        setIsLoading(false);
      });
  };

  return (
    <>
      <nav className="page-breadcrumb flex justify-content-between">
        <h5>DASHBOARD</h5>
        <div className="flex jusify-content-end">
          <div className="input-group date datepicker dashboard-date mr-2 mb-2 mb-md-0  d-xl-flex">
            <span
              className="input-group-addon bg-transparent"
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
              selected={date.from}
              onChange={(selectedDate) =>
                setDate({ ...date, from: selectedDate })
              }
              ref={calendarIcon}
            />
          </div>
          <div className="input-group date datepicker dashboard-date mr-2 mb-2 mb-md-0  d-xl-flex">
            <span
              className="input-group-addon bg-transparent"
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
              selected={date.to}
              onChange={(selectedDate) =>
                setDate({ ...date, to: selectedDate })
              }
              ref={calendarIcon}
            />
          </div>
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
                  key={item.title}
                  type={item.type}
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
