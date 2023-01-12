import React from "react";
import "../../css/navbar.css";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand mx-auto" href="/">
            CRUD
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex justify-content-center">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Usuarios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/roles">
                  Roles
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
