import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import Book from "./Book";
import Cart from "./Cart";

export default function Books() {
  const [booksArr, setBooksArr] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/books")
      .then((r) => r.json())
      .then((arr) => setBooksArr(arr))
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <Row>
        {booksArr.map((book, idx) => {
          return <Book key={idx} book={book} idx={idx} />;
        })}
      </Row>
    </>
  );
}
