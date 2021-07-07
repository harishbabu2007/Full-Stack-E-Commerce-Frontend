import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [searchData, SetSearchData] = useState("");

  const FormSubmitHandler = (e) => {
    e.preventDefault();
    if (searchData) {
      window.location = "/search/" + searchData;
    }
  };

  useEffect(() => {
    const check_is_auth = async () => {
      await axios.get("/api/react/check_is_auth?key=no2$gold").then((res) => {
        setIsAuth(res.data?.auth);
      });
    };
    check_is_auth();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          OnlineShopping
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll navbar__ul-navbar">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">
                Home
              </Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={FormSubmitHandler}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                SetSearchData(e.target.value);
              }}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
          {!isAuth ? (
            <div>
              <a
                href="https://onlineshoppingbackendharish.pythonanywhere.com/login"
                className="btn btn-warning log-in"
              >
                Log In
              </a>
              <a
                href="https://onlineshoppingbackendharish.pythonanywhere.com/register"
                className="btn btn-warning sign-up"
              >
                Sign Up
              </a>
            </div>
          ) : (
            <div className="navbar__cart_holder">
              <a
                href="https://onlineshoppingbackendharish.pythonanywhere.com/logout"
                className="btn btn-danger log-in"
              >
                Log Out
              </a>
              <div className="navbar__cart">
                <Link to="/view/action/cart" className="btn btn-warning">
                  <i class="fas fa-shopping-cart"></i>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
