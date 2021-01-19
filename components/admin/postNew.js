import Link from "next/link";

import { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";

const PostNew = ({ addPost }) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 3) {
      alert("Tytuł musi mieć przynajmniej 3 znaki");
    } else {
      addPost({
        title: name,
        content: "",
        author: "Admin",
        image: "brak",
        active: false,
      });
      setName("");
    }
  };

  return (
    <Form className="top-margin" onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Podaj tytuł posta"
          aria-label="Podaj tytuł posta"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={name}
        />
        <InputGroup.Append>
          <Button type="submit" variant="outline-success">
            Dodaj
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default PostNew;
