import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  Button,
  Row,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Col,
} from "reactstrap";
import { loginState } from "../store/user";
import classnames from "classnames";

export default function Cart() {
  const userState = useSelector(loginState);
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    if (!userState) history.push("/");
  }, [userState, history]);

  const [cartArr, setCartArr] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!userState) return;
    fetch("http://localhost:8080/api/user/cart", {
      method: "GET",
      headers: {
        "auth-token": token,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((resp) => setCartArr([...resp.books]));
  }, []);
  return (
    <Row
      style={{
        width: "75%",
        margin: "20px auto",
      }}
    >
      <Col>
        <Nav tabs style={{ zIndex: "1" }}>
          <NavItem>
            <NavLink
              style={{
                cursor: "pointer",
                color: "white",
                backgroundColor: "gray",
              }}
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Cart
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{
                cursor: "pointer",
                color: "white",
                backgroundColor: "gray",
              }}
              className={classnames({
                active: activeTab === "2",
              })}
              onClick={() => {
                toggle("2");
              }}
            >
              Issued Books
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col>
                <Table
                  dark
                  style={{
                    zIndex: "1",
                    opacity: ".8",
                  }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Book Name</th>
                      <th>ISBN</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartArr.map((book, idx) => (
                      <tr key={idx}>
                        <th scope="row">{idx + 1}</th>
                        <td>{book.title}</td>
                        <td>{book.ISBN}</td>
                        <td>{book.quantity}</td>
                      </tr>
                    ))}
                    {cartArr.length !== 0 ? (
                      <tr>
                        <td colSpan="4" align="center">
                          <Button color="success">Issue Books</Button>
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                <Table
                  dark
                  style={{
                    zIndex: "1",
                    opacity: ".8",
                  }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Book Name</th>
                      <th>ISBN</th>
                      <th>Quantity</th>
                      <th>Return Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartArr.map((book, idx) => (
                      <tr key={idx}>
                        <th scope="row">{idx + 1}</th>
                        <td>{book.title}</td>
                        <td>{book.ISBN}</td>
                        <td>{book.quantity}</td>
                        <td>{book.quantity}</td>
                      </tr>
                    ))}
                    {cartArr.length !== 0 ? (
                      <tr>
                        <td colSpan="5" align="center">
                          <Button color="success">Return Books</Button>
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  );
}
