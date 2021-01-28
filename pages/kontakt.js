import Layout from "../components/layout";
import ContactForm from "../components/contactForm";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Kontakt({ products, pages }) {
  return (
    <>
      <Layout
        title="Skontaktuj się z nami - Centrum Druku Online"
        products={products}
        pages={pages}
      >
        <section className="contact-us top-section">
          <Container>
            <h3>Odezwij się, porozmawiajmy!</h3>
            <Row noGutters xs={1} md={2} lg={2}>
              <Col xs={{ order: 1 }}>
                <img
                  src="/images/formularz-kontaktowy.jpg"
                  alt="Skontaktuj się z nami!"
                />
              </Col>
              <Col xs={{ order: 2 }}>
                <ContactForm />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="google-map">
          <Container>
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  width={process.browser ? window.innerWidth : null}
                  height="500"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=eiffel%20tower&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                ></iframe>
              </div>
            </div>
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const productsQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/product/get/active`
  );
  const products = await productsQuery.json();

  const pagesQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/page/get/active`
  );
  const pages = await pagesQuery.json();

  return {
    props: {
      products,
      pages,
    },
  };
}

export default Kontakt;
