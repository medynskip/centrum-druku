import React from "react";

import Layout from "../../components/layout";

import ProductOther from "../../components/productOther";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import Link from "next/link";

import utils from "../../utils/utils";

function Product({ product, allProducts, pages }) {
  // const [selected, setSelected] = useState({})
  const nameSlug = utils.slugify(product.name);

  return (
    <>
      <Layout
        title={`${product.name} - druk najwyższej jakości`}
        products={allProducts}
        pages={pages}
      >
        <section className="print">
          <Container>
            <Row className="shop-item-header">
              <div>
                <h2>
                  <img src={product.icon} />
                  {product.name}
                </h2>
                <Link href="/produkty">
                  <a>
                    <Button variant="outline-primary">Powrót do listy</Button>
                  </a>
                </Link>
              </div>
            </Row>
            <p>
              Pariatur aliqua velit proident quis deserunt. Culpa minim ipsum
              cupidatat enim adipisicing Lorem Lorem irure ex voluptate et. Quis
              dolore quis irure laboris pariatur. Consectetur dolor irure
              nostrud sit ipsum ad magna qui nisi excepteur sunt non dolore. Do
              do id do ex duis sit cupidatat amet enim et aute elit. Voluptate
              sunt enim amet ipsum ipsum officia proident id ipsum. In nisi
              officia veniam reprehenderit sit officia enim qui reprehenderit
              exercitation consectetur sint dolore ipsum.
            </p>
            <p>
              Tempor Lorem velit consectetur sunt. Sint nostrud laboris velit
              laboris velit adipisicing commodo adipisicing irure. Est fugiat ea
              dolore ex ea et. Deserunt magna qui labore in tempor commodo
              excepteur. Anim minim eiusmod quis laboris enim pariatur proident
              deserunt deserunt ad esse laborum do.
            </p>
            <p>
              Duis consectetur sint proident adipisicing deserunt voluptate enim
              aute qui dolor. Cillum irure laboris id reprehenderit
              reprehenderit non. Ipsum tempor eiusmod deserunt laboris amet
              velit in incididunt officia quis.
            </p>
            <div className="go-to-order">
              <Link href={`/zamowienie/${nameSlug}`}>
                <a>
                  <Button>Zamów {product.name}</Button>
                </a>
              </Link>
            </div>

            <ProductOther products={allProducts} />
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://api.piotrmedynski.pl/product/get/active");
  const products = await res.json();
  const paths = products.map((product) => {
    // if (product.active) {
    const nameSlug = utils.slugify(product.name);
    return `/produkty/${nameSlug}`;
    // }
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const pagesQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/page/get/active`
  );
  const pages = await pagesQuery.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/product/get/active`
  );
  const allProducts = await res.json();
  let product;
  allProducts.map((single) => {
    const nameSlug = utils.slugify(single.name);
    if (nameSlug == params.product) {
      product = { ...single };
    }
  });
  return { props: { product, allProducts, pages } };
}

export default Product;
