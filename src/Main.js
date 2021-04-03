import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";
import Books from "./components/Books";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./Header";
import { setLogin } from "./store/user";
import Video from "./Video";

export default function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/user/details", {
      method: "GET",
      headers: {
        "auth-token": token,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.auth) {
          dispatch(setLogin(true));
        }
      })
      .catch((e) => console.log(e));
  });
  return (
    <>
      <Router>
        <Container fluid>
          <Video />
          <Header />
          <Container>
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route exact path="/">
                <Books />
              </Route>
            </Switch>
          </Container>
        </Container>
      </Router>
    </>
  );
}
