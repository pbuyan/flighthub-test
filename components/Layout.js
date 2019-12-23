import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import People from "../pages/People";
import About from "../pages/About";

const Layout = class extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/people" component={People} />
          <Route exact path="/about" component={About} />
        </div>
      </Router>
    );
  }
};

export default Layout;
