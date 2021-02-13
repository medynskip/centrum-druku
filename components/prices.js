//React
import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";

const Prices = ({ prices, multiplier, priceToStore }) => {
  const [active, setActive] = useState(0);

  const handleClick = (e) => {
    setActive(e.currentTarget.getAttribute("data-key"));
    priceToStore({
      price: parseInt(e.currentTarget.getAttribute("data-price")),
      volume: parseInt(e.currentTarget.getAttribute("data-amount")),
      value: (
        parseInt(e.currentTarget.getAttribute("data-price")) * multiplier
      ).toFixed(0),
    });
  };

  return (
    <div className="shop-module">
      <span className="top">2</span>
      <h4>Wybierz nakład</h4>
      <Table>
        <thead>
          <tr>
            <th>Nakład</th>
            <th>Cena netto</th>
          </tr>
          {prices.map((price, i) => {
            return (
              <tr
                className={active == i ? "item selected" : "item"}
                key={i}
                data-key={i}
                data-amount={price.amount}
                data-price={price.price}
                onClick={handleClick}
              >
                <td name={i}>{price.amount}</td>
                <td name={i}>{(price.price * multiplier).toFixed(0)},00 zł</td>
              </tr>
            );
          })}
        </thead>
      </Table>
    </div>
  );
};

export default Prices;
