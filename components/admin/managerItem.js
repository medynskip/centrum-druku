import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

const ManagerItem = ({ item, handleFolder, handleFile }) => {
  return (
    <div
      onClick={item.type == "directory" ? handleFolder : handleFile}
      className="file-item"
      data-path={`${item.path}/${item.name}`}
      data-parent={`${item.path}`}
    >
      <img
        data-path={`${item.path}/${item.name}`}
        data-parent={`${item.path}`}
        src={
          item.type == "directory" ? "/images/folder.png" : "/images/jpg.png"
        }
      />
      <br />
      {item.name}
    </div>
  );
};

export default ManagerItem;
