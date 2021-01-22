import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Button from "react-bootstrap/Button";

const Summary = ({ order, sendToStore }) => {
  const history = useRouter();

  const handleClick = () => {
    sendToStore({
      ...order,
      value: (order.price * order.multiplier).toFixed(0),
    });
    history.push("/zamowienie/nowe");
  };

  useEffect(() => {
    console.log("effect", order);
  }, []);
  return (
    <div className="shop-module">
      <span className="top">3</span>
      <h4>Potwiedź parametry</h4>
      <p>Produkt: {order.product}</p>
      <p>Czas realizacji: {order.duration} dni robocze</p>
      <p>Nakład: {order.volume} szt.</p>
      <p>Wybrane parametry:</p>
      <ul>
        {console.log("summery", order)}
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
      <Button onClick={handleClick} variant="success">
        Zamów
      </Button>
    </div>
  );
};

export default Summary;
