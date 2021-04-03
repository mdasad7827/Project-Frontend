import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Row,
  Col,
  NavLink,
} from "reactstrap";
import { loginState, setLogin } from "./store/user";

const Header = (props) => {
  const history = useHistory();
  const userState = useSelector(loginState);
  const dispatch = useDispatch();
  console.log(userState);

  const [loggedIn, setLoggedIn] = useState(userState);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(userState);
  }, [userState]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setLogin(false));
    history.push("/login");
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Row
      style={{
        position: "sticky",
        top: 0,
        zIndex: 2,
        fontSize: "1.5rem",
        backgroundColor: "#333",
        opacity: ".7",
        marginBottom: "10px",
      }}
    >
      <Col>
        <Navbar color="transparent" dark expand="md">
          <Link
            to="/"
            style={{
              fontFamily: "Pacifico, cursive",
            }}
            className="navbar-brand"
          >
            Library Management System
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            {loggedIn ? (
              <Nav className="ml-auto" navbar>
                <Link to="/cart" className="nav-link">
                  <NavItem>Cart</NavItem>
                </Link>
                <NavLink
                  style={{ cursor: "pointer" }}
                  onClick={logoutHandler}
                  className="nav-link"
                >
                  <NavItem>Logout</NavItem>
                </NavLink>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <Link to="/login" className="nav-link">
                  <NavItem>Login</NavItem>
                </Link>
                <Link to="/register" className="nav-link">
                  <NavItem>Register</NavItem>
                </Link>
              </Nav>
            )}
          </Collapse>
        </Navbar>
      </Col>
    </Row>
  );
};

export default Header;
