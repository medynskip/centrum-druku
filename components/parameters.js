//React
import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";

const Parameters = ({ parameters, sendToStore }) => {
  const [selected, setSelected] = useState([]);
  const [multiplier, setMultiplier] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    const x = [];
    const y = [];
    parameters.map((el, i) => {
      x.push({
        name: el.fieldName,
        value: el.fieldValues[0].name,
      });
      y.push(el.fieldValues[0].multiplier);
    });
    setSelected([...x]);
    setMultiplier([...y]);
    sendToStore({ parameters: [...x], multiplier: y.reduce((a, b) => a * b) });
  };

  const handleChange = (e) => {
    var id = e.nativeEvent.target.selectedIndex;
    const x = [...selected];
    const y = [...multiplier];
    x[e.target.name] = {
      ...x[e.target.name],
      value: e.nativeEvent.target[id].text,
    };
    y[e.target.name] = parseFloat(e.target.value);
    setSelected([...x]);
    setMultiplier([...y]);
    sendToStore({ parameters: [...x], multiplier: y.reduce((a, b) => a * b) });
  };

  return (
    <div className="shop-module">
      <span className="top">1</span>
      <h4>Wybierz cechy druku</h4>
      <Form>
        {parameters.map((parameter, i) => {
          return (
            <Form.Group key={i}>
              <Form.Label>{parameter.fieldName}</Form.Label>
              <Form.Control onChange={handleChange} name={i} as="select">
                {parameter.fieldValues.map((value, i) => {
                  return (
                    <option key={i} value={value.multiplier}>
                      {value.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          );
        })}
      </Form>
    </div>
  );
};

export default Parameters;
