import React, { useState } from "react";
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

export default function Register() {
  const history = useHistory();
  const [error, setError] = useState(undefined);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      form.name === "" ||
      form.email === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      setError("Please fill out the required fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Confirm password mismatch");
      return;
    }
    fetch("http://localhost:8080/api/user/signup", {
      method: "POST",
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return { success: true };
        return res.json();
      })
      .then((r) => {
        console.log(r);
        if (r.success) {
          console.log("in success", r);
          history.push("/login");
        } else {
          setError(r.err);
        }
      })
      .catch((e) => setError(e.message));
  };
  return (
    <Row className="mt-4">
      <Col md="5" className="ml-auto ">
        <Card inverse style={{ backgroundColor: "#333", opacity: ".9" }}>
          <CardBody>
            <CardTitle tag="h5">Register</CardTitle>
            <Form onSubmit={submitHandler}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  onChange={changeHandler}
                  value={form.name}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={changeHandler}
                  value={form.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={changeHandler}
                  value={form.password}
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={changeHandler}
                  value={form.confirmPassword}
                />
              </FormGroup>
              {error ? <h6 style={{ color: "red" }}>{error}</h6> : null}
              <FormGroup>
                <Button
                  color="primary"
                  className="w-100"
                  onClick={submitHandler}
                  type="submit"
                >
                  Register
                </Button>
              </FormGroup>
            </Form>
            <h5 className="mt-4">
              Already have an account? <Link to="/login">Login here.</Link>
            </h5>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
