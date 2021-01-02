import Head from "next/head";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ProductCard from "../components/productCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Druk({ products }) {
  return (
    <>
      <Head>
        <title>Centrum Druku - Twoja drukarnia internetowa</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Navbar />

      <section className="print top-section">
        <Container>
          <h3>Co możemy dla Ciebie wydrukować?</h3>
          <div>
            <p>
              Integer at libero consectetur, scelerisque sem sit amet, dignissim
              ipsum. Sed semper iaculis consectetur. Curabitur pharetra libero
              lectus, ut imperdiet enim mollis ac. Donec arcu turpis, rutrum id
              molestie iaculis, vulputate eu lacus. Vestibulum quis ullamcorper
              magna. Sed vitae varius enim, sollicitudin vulputate dolor.
              Suspendisse fermentum tortor non nisi auctor, nec porttitor nunc
              elementum.
            </p>
          </div>
          <Row noGutters xs={2} md={4} lg={4}>
            {products.map((product, i) => {
              // return <div key={i}>{product.name}</div>
              if (product.active) {
                return <ProductCard key={product._id} product={product} />;
              }
            })}
          </Row>
          <Row noGutters xs={2} md={4} lg={4}>
            {products.map((product, i) => {
              // return <div key={i}>{product.name}</div>
              if (product.active) {
                return <ProductCard key={product._id} product={product} />;
              }
            })}
          </Row>
          <Row noGutters xs={2} md={4} lg={4}>
            {products.map((product, i) => {
              // return <div key={i}>{product.name}</div>
              if (product.active) {
                return <ProductCard key={product._id} product={product} />;
              }
            })}
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://centrum-druku-api.herokuapp.com/api/product/get"
  );
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}

export default Druk;
