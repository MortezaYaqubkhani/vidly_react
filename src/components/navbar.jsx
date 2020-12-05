import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import Customers from './customers';
import LoginForm from './loginForm';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav">
          <NavLink className="nav-link nav-item" to="/movies">
            Movies
          </NavLink>

          <NavLink className="nav-link nav-item" to="/rentals">
            Rentals
          </NavLink>

          <NavLink className="nav-link nav-item" to="/customers">
            Customers
          </NavLink>

          <NavLink className="nav-link nav-item" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
