import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const NavBar = props => {
  return (
    <div className="ui massive menu">
      <NavLink className="active item" to="/cocktails">
        Home
      </NavLink>
      <NavLink className="item" to="/cocktails/new">
        Create Cocktail
      </NavLink>
      <div className="right menu item ">
        <NavLink className="ui primary button" to="login">
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default withRouter(NavBar);
