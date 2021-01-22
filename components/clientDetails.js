import { useRouter } from "next/router";
import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";

const ClientDetails = ({ client }) => {
  return (
    <div className="parameters content-box">
      <h4>Dane zamawiającego</h4>
      <Row>
        <Col>
          <h5>Dane do faktury:</h5>
          <ul>
            <li>
              <span>Nazwa:</span> <span>{client.name}</span>
            </li>
            <li>
              <span>NIP:</span>{" "}
              <span>{client.nip ? client.nip : "Osoba prywatna"}</span>
            </li>
            <li>
              <span>Ulica</span> <span>{client.street}</span>
            </li>
            <li>
              <span>Miasto</span> <span>{client.city}</span>
            </li>
            <li>
              <span>Kod</span> <span>{client.postal}</span>
            </li>
            <li>
              <span>E-mail</span> <span>{client.email}</span>
            </li>
          </ul>
        </Col>
        <Col>
          <h5>Adres dostawy:</h5>
          <ul>
            <li>
              <span>Nazwa:</span> <span>{client.name}</span>
            </li>
            <li>
              <span>NIP:</span>{" "}
              <span>{client.nip ? client.nip : "Osoba prywatna"}</span>
            </li>
            <li>
              <span>Ulica</span> <span>{client.street}</span>
            </li>
            <li>
              <span>Miasto</span> <span>{client.city}</span>
            </li>
            <li>
              <span>Kod</span> <span>{client.postal}</span>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default ClientDetails;
