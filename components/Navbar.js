import React from "react";
import { Link } from "react-router-dom";

const Navbar = class extends React.Component {
  render() {
    return (
     
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <div className="container">
            <Link className="navbar-brand" to="/">
            <img src={require('../assets/img/star-wars-logo-png-transparent.png')} alt="Star Wars"/> 
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/people">
                  People
                </Link>
                <Link className="nav-item nav-link" to="/planets">
                  Planets
                </Link>
                <Link className="nav-item nav-link" to="/starships">
                  Starships
                </Link>
              </div>
            </div>
          </div>
        </nav>
    );
  }
};

export default Navbar;
