import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Button from "react-bootstrap/Button";

const Summary = (props) => {
  const history = useRouter();
  const handleClick = () => {
    history.push("/zamowienie/");
  };

  return (
    <div className="shop-module">
      <span className="top">3</span>
      <h4>Potwiedź parametry</h4>
      <p>Produkt: {props.order.name}</p>
      <p>Czas realizacji: {props.order.duration} dni robocze</p>
      <p>Nakład: {props.order.amount} szt.</p>
      <p>Wybrane parametry:</p>
      <ul>
        {props.order.parameters.map((el, i) => {
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
          {(props.order.price * props.order.multiplier).toFixed(0)},00 zł netto
        </span>
        <br />
        <span className="brutto">
          {(props.order.price * props.order.multiplier * 1.23).toFixed(2)} zł
          brutto
        </span>
      </p>
      <Button onClick={handleClick}>Zamów</Button>
    </div>
  );
};

export default Summary;
