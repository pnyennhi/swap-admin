import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./assets/css/style.css";

import Login from "./containers/Login/Login";
import Layout from "./containers/Layout/Layout";
import Book from "./containers/Book/Book";

function App() {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser);

  const handleLog = (user) => {
    setUser(user);
  };

  if (localStorage.getItem("user")) {
    return (
      <Router>
        <Layout onLogout={handleLog}>
          <Route path="/book" component={Book} />
          <Redirect exact from="/" to="/book" />
        </Layout>
      </Router>
    );
  } else {
    return (
      <Router>
        <Route
          exact
          path="/login"
          render={() => <Login onLogin={handleLog} />}
        />
        <Redirect exact from="/" to="/login" />
      </Router>
    );
  }
}

export default App;
