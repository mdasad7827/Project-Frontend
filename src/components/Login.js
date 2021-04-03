import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";
import { loginState, setLogin, setUserDetails } from "../store/user";

const Login = (props) => {
  const userState = useSelector(loginState);
  const history = useHistory();
  useEffect(() => {
    if (userState) history.push("/");
  }, [userState, history]);

  const dispatch = useDispatch();
  const [error, setError] = useState(undefined);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (form.email.trim() === "" || form.password.trim() === "") {
      setError("Please fill out the required fields");
      return;
    }
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((r) => {
        // console.log(r);
        if (r.auth) {
          localStorage.setItem("token", r.token);
          console.log("in if", r);
          dispatch(setLogin(true));
          console.log("after dispatch setLogin");
          dispatch(setUserDetails(r.details));
        } else {
          setError(r.err);
        }
      })
      .catch((e) => setError(e.message));
  };
  return (
    <Row className="mt-5">
      <Col md="5" className="ml-auto ">
        <Card inverse style={{ backgroundColor: "#333", opacity: ".9" }}>
          <CardBody>
            <CardTitle tag="h5">Log In</CardTitle>
            <Form onSubmit={submitHandler}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={changeHandler}
                  value={form.email}
                />
              </FormGroup>
              <FormGroup className="position-relative">
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={changeHandler}
                  value={form.password}
                />
              </FormGroup>
              {error ? <h6 style={{ color: "red" }}>{error}</h6> : null}

              <FormGroup className="pt-2">
                <Button
                  color="primary"
                  className="w-100"
                  type="submit"
                  onClick={submitHandler}
                >
                  Log In
                </Button>
              </FormGroup>
            </Form>
            <h5 className="mt-4">
              Don't have an account? <Link to="/register">Register here.</Link>
            </h5>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
