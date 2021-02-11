import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Button from "react-bootstrap/Button";

const Summary = ({ order, sendToStore }) => {
  const history = useRouter();

  useEffect(() => {}, [order.value]);
  const handleClick = () => {
    sendToStore({
      ...order,
      value: (order.price * order.multiplier).toFixed(0),
    });
    history.push("/zamowienie/nowe");
  };

  return (
    <div className="shop-module">
      <span className="top">3</span>
      <h4>Potwiedź parametry</h4>
      <ul>
        <li>
          <strong>Produkt:</strong>
          <span> {order.product}</span>
        </li>
        <li>
          <strong>Czas realizacji:</strong>
          <span>{order.duration} dni robocze</span>
        </li>
        <li>
          <strong>Nakład:</strong>
          <span>{order.volume} szt.</span>
        </li>
      </ul>
      <div class="hr-sect">
        <strong>Wybrane parametry:</strong>
      </div>
      <ul>
        {order.parameters.map((el, i) => {
          return (
            <li key={i}>
              <span>{el.name}:</span>
              <span>{el.value}</span>
            </li>
          );
        })}
      </ul>
      <div class="hr-sect">
        <strong>Dostawa:</strong>
      </div>
      <ul>
        <li>
          <span>Przesyłka kurierska</span>
          <span>GRATIS</span>
        </li>
      </ul>

      <div class="hr-sect">
        <strong>Płatność:</strong>
      </div>
      <p className="price">
        <span className="netto">
          {(order.price * order.multiplier).toFixed(0)}.00 zł netto
        </span>
        <br />
        <span className="brutto">
          {((order.price * order.multiplier).toFixed(0) * 1.23).toFixed(2)} zł
          brutto
        </span>
      </p>
      <Button onClick={handleClick} variant="success">
        Zamów
      </Button>
    </div>
  );
};

export default Summary;
