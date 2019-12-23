import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import People from "../pages/People";
import Planets from "../pages/Planets";
import Starships from "../pages/Starships";

const Layout = class extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/people" component={People} />
          <Route exact path="/planets" component={Planets} />
          <Route exact path="/starships" component={Starships} />
        </div>
      </Router>
    );
  }
};

export default Layout;
