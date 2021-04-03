import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input,
  ModalHeader,
} from "reactstrap";
import { useSelector } from "react-redux";
import { loginState } from "../store/user";

export default function Book({ book }) {
  const { title, ISBN, author, category, cover, stock, idx } = book;
  const userState = useSelector(loginState);
  const [modal, setModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(userState);
  const [numBooks, setNumBooks] = useState(1);
  const [cartError, setCartError] = useState(undefined);

  useEffect(() => {
    setLoggedIn(userState);
  }, [userState]);

  const increment = () => {
    if (numBooks === 5) {
      setCartError("Cannot add more than 5 books");
    } else if (numBooks === stock) {
      setCartError("Out of stock!");
    } else {
      setNumBooks(Number(numBooks) + 1);
      setCartError(undefined);
    }
  };
  const decrement = () => {
    if (numBooks === 1) {
      return;
    } else {
      setNumBooks(Number(numBooks) - 1);
      setCartError(undefined);
    }
  };

  const addToCart = () => {
    console.log("add to Cart");
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/books/addtocart", {
      method: "POST",
      body: JSON.stringify({ ISBN, quantity: numBooks }),
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((r) => {
        if (r.ok) {
          return toggle();
        }
        setCartError(r.message);
      })
      .catch((e) => console.log(e));
  };

  const toggle = () => {
    setModal(!modal);
    setCartError(undefined);
    setNumBooks(1);
  };

  return (
    <Col className="mb-3 mt-3">
      <Card
        style={{
          width: "180px",
          backgroundColor: "#fff",
          opacity: ".9",
          color: "black",
        }}
      >
        <Button
          id={`PopoverFocus${idx}`}
          type="button"
          style={{
            margin: "0",
            padding: "0",
          }}
        >
          <CardImg
            top
            style={{ width: "100%", height: "240px" }}
            src={
              cover
                ? cover
                : "https://static01.nyt.com/images/2019/12/22/books/review/22BestCovers-Dorfman-02/22BestCovers-Dorfman-02-mobileMasterAt3x.jpg"
            }
            alt="Card image cap"
          />
        </Button>
        <CardBody style={{ padding: "5px 10px" }}>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Author: {author}
          </CardSubtitle>
          <CardText>
            ISBN: {ISBN}
            <br />
            Category: {category}
            <br />
            Stock: {stock}
          </CardText>
        </CardBody>
        <Button color="success" style={{ width: "100%" }} onClick={toggle}>
          Add to Cart
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          {loggedIn ? (
            <ModalHeader
              style={{
                backgroundColor: "#333",
                opacity: ".9",
                color: "#fff",
              }}
            >
              {title}
            </ModalHeader>
          ) : null}
          <ModalBody
            style={{ backgroundColor: "#333", opacity: ".9", color: "#fff" }}
          >
            {loggedIn ? (
              <>
                Set number of books
                <InputGroup style={{ width: "120px" }}>
                  <InputGroupAddon addonType="prepend">
                    <Button onClick={decrement}>-</Button>
                  </InputGroupAddon>
                  <Input
                    readOnly
                    placeholder="Set number of books"
                    type="number"
                    value={numBooks}
                    min="1"
                  />
                  <InputGroupAddon addonType="append">
                    <Button onClick={increment}>+</Button>
                  </InputGroupAddon>
                </InputGroup>
                {cartError ? (
                  <p style={{ marginTop: "10px", color: "red" }}>{cartError}</p>
                ) : null}
              </>
            ) : (
              "You must login first to add the books in the cart."
            )}
          </ModalBody>
          <ModalFooter style={{ backgroundColor: "#333", opacity: ".9" }}>
            {loggedIn ? (
              <Button color="primary" onClick={addToCart}>
                Add
              </Button>
            ) : (
              <Link to="/login">
                <Button color="primary" onClick={toggle}>
                  Login
                </Button>{" "}
              </Link>
            )}

            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Card>
    </Col>
  );
}
