import React, { useState } from "react";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BottomBar from "./bottomBar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ImageSelector from "./imageSelector";

const PostForm = ({ post, sendToStore }) => {
  const [show, setShow] = useState(false);

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

  const setFilePath = (path) => {
    setPost({
      ...values,
      image: path,
      modified: true,
    });
  };

  const activate = () => {
    setActive((prev) => !prev);
    sendToStore({
      active: !active,
    });
  };

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
          <InputGroup className="mb-3">
            <FormControl
              name="image"
              value={values.image}
              placeholder="Podaj link obrazu..."
              aria-label="Link obrazka"
              aria-describedby="basic-addon2"
              readOnly
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={() => setShow(true)}>
                Wybierz
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Treść wpisu </Form.Label>
          <ReactQuill onChange={setText} theme="snow" value={text} />
        </Form.Group>
      </Form>

      <ImageSelector show={show} setShow={setShow} setFilePath={setFilePath} />

      <BottomBar
        exit="/admin-panel/blog"
        handleSubmit={handleSubmit}
        modified={values.modified}
      />
    </>
  );
};

export default PostForm;
