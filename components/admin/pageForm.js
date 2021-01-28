import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BottomBar from "./bottomBar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ImageSelector from "./imageSelector";

const PageForm = ({ page, sendToStore }) => {
  const [show, setShow] = useState(false);

  const [values, setPage] = useState({
    title: page.title,
    linkName: page.linkName,
    author: page.author,
    image: page.image,
    modified: false,
  });

  const [active, setActive] = useState(page.active);
  const [text, setText] = useState(page.content);

  useEffect(() => {
    console.log("tu", page);
  });

  const handleChange = (e) => {
    setPage({
      ...values,
      [e.target.name]: e.target.value,
      modified: true,
    });
  };

  const handleQuillChange = () => {
    setPage({
      ...values,
      modified: true,
    });
  };

  const setFilePath = (path) => {
    setPage({
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
    setPage({
      ...values,
      modified: false,
    });
  };

  return (
    <>
      <Form>
        <Button
          className="mb-3"
          onClick={activate}
          variant={active ? "danger" : "success"}
          size="sm"
        >
          {active ? "Wyłącz wpis" : "Aktywuj wpis"}
        </Button>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Tytuł wpisu *</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name="title"
            onChange={handleChange}
            placeholder=""
            value={values.title}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Link *</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name="linkName"
            onChange={handleChange}
            placeholder=""
            value={values.linkName}
            required
          />
        </InputGroup>

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
          <ReactQuill
            onFocus={handleQuillChange}
            onChange={setText}
            theme="snow"
            value={text}
          />
          {/* <ReactQuill onChange={setText} theme="snow" value={text} /> */}
        </Form.Group>
      </Form>

      <ImageSelector show={show} setShow={setShow} setFilePath={setFilePath} />

      <BottomBar
        exit="/admin-panel/strony"
        handleSubmit={handleSubmit}
        modified={values.modified}
      />
    </>
  );
};

export default PageForm;
