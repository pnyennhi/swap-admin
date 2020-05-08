import React, { useState, useRef } from "react";

import bgSrc from "../../assets/images/background.jpg";

const Login = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const form = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    form.current.reportValidity();
    if (form.current.checkValidity()) {
      if (username === "admin" && password === "123") {
        setError(null);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: "admin",
            name: "Nguyen Van Admin",
          })
        );
        // window.location.assign("/login");
        props.onLogin({
          username: "admin",
          fisrtName: "Nguyen Van",
          lastName: "Admin",
        });
      } else setError("Your email or password is incorrect");
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
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Username"
                            onChange={(e) => {
                              setUsername(e.target.value.trim());
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
                            id="exampleInputPassword1"
                            autoComplete="current-password"
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
                          >
                            LOGIN
                          </button>
                        </div>
                      </form>
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
