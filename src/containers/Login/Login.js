import React, { useState, useRef } from "react";
import axios from "axios";

import { updateUser } from "../../redux/actions/user";

import bgSrc from "../../assets/images/background.jpg";
import loading from "../../assets/images/loading.gif";

const Login = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    email: "admin",
    firstName: "Nguyen Van",
    lastName: "Admin",
  };

  const form = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    form.current.reportValidity();
    if (form.current.checkValidity()) {
      // if (email === "admin" && password === "123") {
      //   setError(null);
      //   localStorage.setItem(
      //     "TOKEN_AUTH",
      //     `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiY3VvbmduZ3V5ZW4iLCJFbWFpbCI6ImN1b25nbmd1eWVuQGdtYWlsLmNvbSIsIlVzZXJJRCI6IjkzMDczZGU1LWJmMGItNDk3Mi05Yjk0LWI5MDExYTU0ZWEzZSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTU5Mjc0OTk4MSwiZXhwIjoxNTkzMzQ5OTgxLCJpYXQiOjE1OTI3NDk5ODF9.2sNE6k_CLq-6QhaBBmAytXIZxw6Q2h6H08-n90XDwGk`
      //   );
      //   props.onLogin(user);
      // } else setError("Your email or password is incorrect");
      setIsLoading(true);
      axios
        .post(
          `https://bookstoreprojectdut.azurewebsites.net/api/applicationuser/login`,
          { email: email, password: password }
        )
        .then((response) => {
          let token = response.data.token;
          axios
            .get(`https://bookstoreprojectdut.azurewebsites.net/api/admins`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then((res) => {
              if (res.data.role === "Admin") {
                setError(null);
                localStorage.setItem("TOKEN_AUTH", response.data.token);
                setIsLoading(false);

                updateUser(res.data);
              } else {
                setError("Email hoặc mật khẩu không chính xác");
                setIsLoading(false);
              }
            })
            .catch((err) => {
              if (err.response.status === 403)
                setError("Bạn không có quyền truy cập");
              else setError("Đã có lỗi xảy ra");
              setIsLoading(false);
            });
        })
        .catch((err) => {
          setError(err.response.data.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="main-wrapper">
      <div
        className="page-wrapper full-page"
        style={{
          background: `url("${bgSrc}") no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div className="page-content d-flex align-items-center justify-content-center">
          <div className="row w-100 mx-0 auth-page">
            <div className="col-sm-8 col-md-6 col-lg-6 col-xl-4 mx-auto">
              <div className="card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="auth-form-wrapper px-4 py-5">
                      <div className="text-center">
                        <a href="" className="noble-ui-logo d-block mb-2">
                          ADMIN <span>website</span>
                        </a>
                      </div>
                      <form className="forms-sample" ref={form}>
                        <div className="form-group">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="text-muted"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => {
                              setEmail(e.target.value.trim());
                            }}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="text-muted"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <p
                          style={{
                            color: "red",
                            display: error ? "block" : "none",
                          }}
                        >
                          {error}
                        </p>
                        <div className="mt-3 text-center">
                          <button
                            onClick={(e) => handleLogin(e)}
                            className="btn btn-primary mr-2 mb-2 mb-md-0 text-white"
                            disabled={isLoading}
                          >
                            LOGIN
                          </button>
                        </div>
                      </form>
                      <div className="mt-3 text-center">
                        <button
                          onClick={() => {
                            setEmail(`cuongnguyen@gmail.com`);
                            setPassword(`cuongnguyen123`);
                          }}
                          className="btn btn-secondary"
                        >
                          Auto Complete
                        </button>
                      </div>
                      {isLoading ? (
                        <div className="mt-3 text-center">
                          <img src={loading} width="35px" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
