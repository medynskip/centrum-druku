// @refresh reset
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Button from "react-bootstrap/Button";

const Summary = ({ order }) => {
  const history = useRouter();

  const handleClick = () => {
    history.push("/zamowienie/nowe");
  };

  return (
    <div className="shop-module">
      <span className="top">3</span>
      <h4>Potwiedź parametry</h4>
      <p>Produkt: {order.product}</p>
      <p>Czas realizacji: {order.duration} dni robocze</p>
      <p>Nakład: {order.volume} szt.</p>
      <p>Wybrane parametry:</p>
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
      <p className="price">
        Cena:
        <br />
        <span className="netto">
          {(order.price * order.multiplier).toFixed(0)},00 zł netto
          {/* {order.value.toFixed(0)},00 zł netto */}
        </span>
        <br />
        <span className="brutto">
          {(order.price * order.multiplier * 1.23).toFixed(2)} zł
          {/* {(order.value * 1.23).toFixed(2)} zł brutto */}
        </span>
      </p>
      <Button onClick={handleClick}>Zamów</Button>
    </div>
  );
};

export default Summary;
