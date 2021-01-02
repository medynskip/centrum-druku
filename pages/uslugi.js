import Head from "next/head";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ServiceCard from "../components/serviceCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import services from "../data/services";

export default function Home() {
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
      <section className="we-offer top-section">
        <Container>
          <h3>Co możemy dla Ciebie zrobić?</h3>
          <Row noGutters>
            <p>
              Esse irure Lorem irure est nisi duis est eiusmod aliqua non qui
              culpa tempor. Est officia duis sit eiusmod mollit. Ut labore
              cillum commodo ut velit duis elit. Esse exercitation reprehenderit
              nisi mollit magna non excepteur dolor irure et tempor
              reprehenderit esse sit. Adipisicing non aute et et voluptate
              occaecat est fugiat irure sit in.
            </p>
          </Row>
          <Row noGutters xs={1} md={2} lg={3}>
            {services.map((service, index) => {
              return <ServiceCard key={index} service={service} />;
            })}
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}
