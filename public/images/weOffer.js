//React
import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const services = [
  {
    title: "Analiza i doradztwo",
    text:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut ",
    image: "analiza.png",
  },
  {
    title: "Projektowanie graficzne",
    text:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut ",
    image: "projektowanie.png",
  },
  {
    title: "Druk wielkoformatowy",
    text:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut ",
    image: "wielkiformat.png",
  },
  {
    title: "Proof cyfrowy",
    text:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut ",
    image: "proof.png",
  },
  {
    title: "Druk offsetowy",
    text:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut ",
    image: "offset.png",
  },
  {
    title: "Dystrybucja i montaz",
    text:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut ",
    image: "dystrybucja.png",
  },
];

const ServiceCard = ({ service }) => {
  return (
    <Col>
      <div className="service-card">
        <img src={"/images/" + service.image} /> <br />
        <h4>{service.title}</h4>
        <p>{service.text}</p>
      </div>
    </Col>
  );
};

const WeOffer = () => {
  return (
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
  );
};

export default WeOffer;
