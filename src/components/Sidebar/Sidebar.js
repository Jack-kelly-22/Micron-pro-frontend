/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, Button } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import { is_logged_in, signOut } from "functions/LocalStorageHelper";
import logo from "logo.svg";
import PerfectScrollbar from "perfect-scrollbar";
import Login from "views/Login";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const login_route = {route:"/admin/login",name: "Login",
    component: Login,
    layout: "/admin",
}
  const [logged_in, setLogged_in] = useState(false);
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a className="simple-text logo-mini">
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a className="simple-text logo-normal">Micron Pro</a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
          <NavItem className="ml-auto mr-auto" style={{ width: "90%" }}>
            {logged_in ? (
              <Button
                style={{ width: "90%" }}
                onClick={
                  () => {
                    signOut();
                    setLogged_in(false);
                  }
                  // clear_user();
                }
              >
                Log out
              </Button>
            ) : (
              <NavLink to={login_route.layout + login_route.path}>
                <Button style={{ width: "90%" }}>Sign in</Button>
              </NavLink>
            )}
          </NavItem>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
