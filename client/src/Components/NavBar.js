import React, { useContext } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./register.css";

const NavBar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBAr = () => {
    return (
      <div>
        <Nav.Link href="/">
          <li className="nav-item nav-link">Home</li>
        </Nav.Link>
        <Nav.Link href="/login">
          <li className="nav-item nav-link">Login</li>
        </Nav.Link>
      </div>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <div>
        <Nav.Link href="/">
          <li className="nav-item nav-link">Home</li>
        </Nav.Link>
        <Nav.Link href="/map">
          <li className="nav-item nav-link">Map</li>
        </Nav.Link>
        <button
          type="button"
          className="btn btn-link nav-item nav-link"
          onClick={onClickLogoutHandler}>Logout
        </button>
      </div>
    );
  };
  return (
    <Navbar bg="light" expand="xlg">
      <Navbar.Brand href="#home">Mapp-App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!isAuthenticated ? unauthenticatedNavBAr() : authenticatedNavBar()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
