import React, { useState } from "react";

import utils from "./../utils/utils";

import ClientDetails from "./clientDetails";
import OrderDetails from "./orderDetails";
import ContentBox from "./contentBox";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

const TabDetails = ({ order }) => {
  return (
    <>
      <Row>
        <Col md={12} lg={4}>
          <ContentBox title="Status zamówienia">
            <div className="main-order-details">
              <strong>Status zamówienia:</strong>
              {order.status}
            </div>
            <div className="main-order-details">
              <strong>Metoda płatności:</strong>
              {/* {paymentTranslate(order.paymentType)} */}
              {order.paymentType}
            </div>
          </ContentBox>
        </Col>
        <Col md={12} lg={8}>
          <ContentBox title="Terminy">
            <div className="main-order-details">
              <strong>Zamówione złożone:</strong>{" "}
              {utils.dateNormalize(order.placed, true)}
            </div>

            <div className="main-order-details">
              <strong>Przewidywany termin wysyłki:</strong>{" "}
              {utils.calculateWorkDays(order.placed, order.duration)}
            </div>
          </ContentBox>
        </Col>
      </Row>
      <OrderDetails order={order} />
      <ClientDetails client={order.client} />
      <ContentBox title="Komentarze i historia">
        <ul>
          {order.history.map((el, i) => {
            return (
              <li key={i}>
                <Badge variant="primary">
                  {utils.dateNormalize(el.date, true)}
                </Badge>{" "}
                <span>{el.comment}</span>
              </li>
            );
          })}
        </ul>
      </ContentBox>
    </>
  );
};

export default TabDetails;
