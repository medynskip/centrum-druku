import React, { useEffect, useState } from "react";

import Link from "next/link";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import BottomBar from "./bottomBar";

const PostForm = ({ post, sendToStore }) => {
  const [values, setPost] = useState({
    title: post.title,
    author: post.author,
    image: post.image,
    modified: false,
  });

  const [active, setActive] = useState(post.active);
  const [text, setText] = useState(post.content);

  const handleChange = (e) => {
    setPost({
      ...values,
      [e.target.name]: e.target.value,
      modified: true,
    });
  };

  const activate = () => {
    setActive((prev) => !prev);
    sendToStore({
      active: !active,
    });
    //   update({ active: !active });
  };

  //   const handleActive = (e) => {
  //     setPost({
  //       ...post,
  //       active: e.target.checked,
  //     });
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendToStore({
      ...values,
      active: active,
      content: text,
    });
    setPost({
      ...values,
      modified: false,
    });
  };

  return (
    <>
      <Form>
        <Button
          onClick={activate}
          variant={active ? "danger" : "success"}
          size="sm"
        >
          {active ? "Wyłącz wpis" : "Aktywuj wpis"}
        </Button>
        <Form.Group>
          <Form.Label>Tytuł wpisu *</Form.Label>
          <Form.Control
            name="title"
            onChange={handleChange}
            placeholder=""
            value={values.title}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Autor *</Form.Label>
          <Form.Control
            name="author"
            onChange={handleChange}
            placeholder=""
            value={values.author}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Podaj link do zdjęcia *</Form.Label>
          <Form.Control
            name="image"
            onChange={handleChange}
            placeholder="Podaj poprawny link obrazu..."
            value={values.image}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Treść wpisu </Form.Label>
          <ReactQuill onChange={setText} theme="snow" value={text} />
        </Form.Group>
      </Form>
      <BottomBar
        exit="/admin-panel/blog"
        handleSubmit={handleSubmit}
        modified={values.modified}
      />

      {/* <Navbar fixed="bottom" bg="dark" expand="lg">
        <Container>
          <Link href="/admin-panel/blog">
            <a>
              <Button variant="warning">Wyjdz</Button>
            </a>
          </Link>
          <Button
            variant={status.modified ? "success" : "primary"}
            onClick={handleSubmit}
            disabled={status.modified ? false : true}
          >
            {status.modified ? "Zapisz" : "Aktualne"}
          </Button>
        </Container>
      </Navbar> */}

      {/* <Link href="/admin-panel/blog/">
        <a>
          <Button variant="danger">Zamknij</Button>
        </a>
      </Link>
      <Button onClick={handleSubmit}>Zapisz</Button> */}
    </>
  );
};

export default PostForm;
