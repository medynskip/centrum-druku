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

const AddNewProduct = (props) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (name.length < 3) {
    //   alert("Nazwa musi mieć przynajmniej 3 znaki");
    // } else {
    //   const newProduct = {
    //     name: name,
    //     parameters: [],
    //     prices: [],
    //     active: false,
    //     icon: "",
    //     duration: "",
    //     description: "",
    //   };
    //   props.addProduct(newProduct);
    //   setName("");
    // }
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

const EditBtn = (props) => {
  //   const history = useHistory();
  const editProduct = () => {
    // const url = `/admin/produkty/edytuj/${props.name}/${props.id}`;
    // history.push(url);
  };
  return (
    <Button variant="primary" size="sm" onClick={editProduct}>
      edit
    </Button>
  );
};

const DeleteBtn = (props) => {
  const deleteProduct = () => {
    // const approve = confirm("Potwierdź usunięcie produktu");
    // if (approve) {
    //   props.delete(props.id);
    // }
  };
  return (
    <Button variant="danger" size="sm" onClick={deleteProduct}>
      Delete
    </Button>
  );
};

const SingleProduct = ({ product, deleteOne }) => {
  const variant = (a) => {
    return a > 0 ? "success" : "secondary";
  };

  const active = (a) => {
    return a == true ? (
      <Badge variant="success">AKTYWNY</Badge>
    ) : (
      <Badge variant="warning">NIEAKTYWNY</Badge>
    );
  };

  return (
    <ListGroup.Item>
      <div className="space-between">
        <div>
          <h4>{product.name}</h4>
          {active(product.active)}
          <span> | </span>
          <Badge variant={variant(product.parameters.length)}>
            Parametry: {product.parameters.length}
          </Badge>
          <Badge variant={variant(product.prices.length)}>
            Ceny: {product.prices.length}
          </Badge>
        </div>
        <div>
          <EditBtn id={product._id} name={product.name} />
          <DeleteBtn id={product._id} deleteOne={deleteOne} />
        </div>
      </div>
    </ListGroup.Item>
  );
};

const ProductsList = ({ products }) => {
  const deleteOne = (id) => {
    // props.deleteProduct(id);
    // props.getAllProducts();
  };

  return (
    <>
      <Navbar fixed="left" className="admin-nav">
        <Container>
          <Navbar.Brand href="/admin-panel/">
            CentrumDruku Admin Panel
          </Navbar.Brand>
          {/* <Nav className="mr-auto"> */}
          <Navbar.Collapse className="justify-content-end">
            <Link href="/admin-panel/produkty">
              <a>PRODUKTY</a>
            </Link>
            <Link href="/admin-panel/zamowienia">
              <a>ZAMÓWIENIA</a>
            </Link>
            <Link href="/admin-panel/blog">
              <a>BLOG</a>
            </Link>
          </Navbar.Collapse>
          {/* </Nav> */}
        </Container>
      </Navbar>
      <Container>
        <h3>Produkty</h3>
        <ListGroup>
          {products.length > 0 ? (
            products.map((singleProduct) => {
              return (
                <SingleProduct
                  key={singleProduct._id}
                  product={singleProduct}
                  deleteOne={deleteOne}
                />
              );
            })
          ) : (
            <Alert variant="warning">
              Nie skonfigurowałeś żadnych produktów!
            </Alert>
          )}
        </ListGroup>
        <AddNewProduct />
      </Container>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://api.piotrmedynski.pl/product/get`);
  const products = await res.json();

  // Pass data to the page via props
  return { props: { products } };
}

export default ProductsList;
