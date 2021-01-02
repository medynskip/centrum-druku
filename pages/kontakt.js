import Head from "next/head";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ContactForm from "../components/contactForm";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Kontakt() {
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
                width={window.innerWidth}
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

      <Footer />
    </>
  );
}

export default Kontakt;
