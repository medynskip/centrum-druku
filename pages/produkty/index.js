import Layout from "../../components/layout";
import ProductCard from "../../components/productCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Druk({ products, pages }) {
  return (
    <>
      <Layout title="Wydruki i produkty" products={products} pages={pages}>
        <section className="print top-section">
          <Container>
            <h3>Co możemy dla Ciebie wydrukować?</h3>
            <div>
              <p>
                Integer at libero consectetur, scelerisque sem sit amet,
                dignissim ipsum. Sed semper iaculis consectetur. Curabitur
                pharetra libero lectus, ut imperdiet enim mollis ac. Donec arcu
                turpis, rutrum id molestie iaculis, vulputate eu lacus.
                Vestibulum quis ullamcorper magna. Sed vitae varius enim,
                sollicitudin vulputate dolor. Suspendisse fermentum tortor non
                nisi auctor, nec porttitor nunc elementum.
              </p>
            </div>
            <Row noGutters xs={2} md={4} lg={4}>
              {products.map((product, i) => {
                if (product.active) {
                  return <ProductCard key={product._id} product={product} />;
                }
              })}
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/product/get/active`
  );
  const products = await res.json();

  const pagesQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/page/get/active`
  );
  const pages = await pagesQuery.json();

  return {
    props: {
      products,
      pages,
    },
    revalidate: 1,
  };
}

export default Druk;
