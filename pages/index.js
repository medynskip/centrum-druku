import Layout from "../components/layout";
import LinkButton from "../components/linkButton";
import ServiceCard from "../components/serviceCard";
import CoopStep from "../components/coopStep";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import services from "../data/services";
import steps from "../data/steps";

export default function Home() {
  return (
    <>
      <Layout title="Internetowa drukarnia i agencja reklamowa">
        <header>
          <Container className="header">
            <h1>
              INTERNETOWA
              <br /> AGENCJA
              <br /> REKLAMOWA
            </h1>
            <div className="catchphrase">
              <span>
                Od <mark className="sea">pomysłu</mark>
              </span>
              <span>
                przez <mark className="red">projekt</mark>
              </span>
              <span>
                do <mark className="blue">realizacji</mark>
              </span>
            </div>
            <div className="action-invite">
              Poznaj nasze:
              <div>
                <LinkButton to="/uslugi/" text="usługi" varinat="primary" />
                <LinkButton to="/produkty/" text="produkty" variant="success" />
              </div>
            </div>
            <div className="social">
              <a href="#">
                <img src="/images/facebook_ico.png" alt="Facebook" />
              </a>
              <a href="#">
                <img src="/images/instagram_ico.png" alt="Instagram" />
              </a>
              <a href="#">
                <img src="/images/twitter_ico.png" alt="Twitter" />
              </a>
            </div>
          </Container>
        </header>

        <section className="we-offer">
          <Container>
            <h3>Co możemy dla Ciebie zrobić?</h3>
            <Row noGutters xs={1} md={2} lg={3}>
              {services.map((service, index) => {
                return <ServiceCard key={index} service={service} />;
              })}
            </Row>
          </Container>
        </section>

        <section className="co-op">
          <Container>
            <h3>Jak wygląda współpraca?</h3>
            <Row noGutters xs={1} md={1} lg={1}>
              {steps.map((step, index) => {
                return <CoopStep key={index} step={step} />;
              })}
            </Row>
          </Container>
        </section>

        <section className="talk-to-us">
          <Container>
            <h3>Daj nam się zaskoczyć</h3>
            <Row noGutters xs={1} md={2} lg={2}>
              <Col lg={4} xs={{ order: 2 }} md={{ order: 1 }}>
                <span>JESTEŚMY</span>
                <br />
                <span>GOTOWI NA KAŻDE</span>
                <br />
                <span>WYZWANIE</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut{" "}
                </p>
                <Button>portfolio</Button>
              </Col>

              <Col lg={8} xs={{ order: 1 }} md={{ order: 2 }}>
                <img
                  src="/images/kreatywny_zespol.jpg"
                  alt="Gotowi na każde wyzwanie!"
                />
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}
