import { useRouter } from "next/router";

import AdminLayout from "../../../components/admin/adminLayout";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

import ProductNew from "./../../../components/admin/productNew";
import ProductRow from "./../../../components/admin/productRow";

const ProductsList = ({ products }) => {
  const router = useRouter();

  const addProduct = (product) => {
    fetch("http://api.piotrmedynski.pl/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then(() => {
      router.replace(router.asPath);
    });
  };

  const deleteProduct = (productID) => {
    fetch(`http://api.piotrmedynski.pl/product/delete/${productID}`, {
      method: "DELETE",
    }).then(() => {
      router.replace(router.asPath);
    });
  };

  return (
    <AdminLayout>
      <Container>
        <h3>Produkty</h3>
        <ListGroup>
          {products.length > 0 ? (
            products.map((singleProduct) => {
              return (
                <ProductRow
                  key={singleProduct._id}
                  product={singleProduct}
                  deleteProduct={deleteProduct}
                />
              );
            })
          ) : (
            <Alert variant="warning">
              Nie skonfigurowałeś żadnych produktów!
            </Alert>
          )}
        </ListGroup>
        <ProductNew addProduct={addProduct} />
      </Container>
    </AdminLayout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://api.piotrmedynski.pl/product/get`);
  const products = await res.json();
  return { props: { products } };
}

export default ProductsList;
