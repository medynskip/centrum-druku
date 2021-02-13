import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const ProductNew = ({ addProduct }) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 3) {
      alert("Nazwa musi mieć przynajmniej 3 znaki");
    } else {
      const newProduct = {
        name: name,
        parameters: [],
        prices: [],
        active: false,
        icon: "",
        duration: "1",
        descriptionShort: "",
        descriptionLong: "",
      };
      addProduct(newProduct);
      setName("");
    }
  };

  return (
    <Form className="top-margin" onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Podaj nazwę produktu"
          aria-label="Podaj nazwę produktu"
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

export default ProductNew;
