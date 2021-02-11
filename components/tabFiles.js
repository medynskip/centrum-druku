import React, { useState } from "react";

import Image from "next/image";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ContentBox from "./contentBox";

const TabFiles = ({ order, updateClient }) => {
  const [files, setFiles] = useState([]);

  const handleFile = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("order", order._id);
    for (var x = 0; x < files.length; x++) {
      formData.append("file", files[x]);
    }
    console.log("klik", files);
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/order/update/files`, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        updateClient(res);
      });
  };

  return (
    <>
      <ContentBox title="Pliki do zamówienia">
        {order.files.length > 0 ? (
          order.files.map((el, i) => {
            return (
              <div key={i} className="image-miniature">
                <Image
                  // layout="fill"
                  width={150}
                  height={100}
                  key={i}
                  src={`${process.env.NEXT_PUBLIC_API_LINK}/public/orders${el}`}
                />
              </div>
            );
          })
        ) : (
          <div>
            Brak plików. Wgraj pliki do wydruku korzystając z poniższego
            formularza.
          </div>
        )}
      </ContentBox>
      <ContentBox title="Wgraj pliki">
        <Form>
          <Form.Group className="form-group files">
            <Form.Control
              type="file"
              onChange={handleFile}
              className="form-control"
              multiple
            />
          </Form.Group>
          <Button
            onClick={handleSubmit}
            disabled={files.length > 0 ? false : true}
          >
            Wyślij pliki
          </Button>
        </Form>
      </ContentBox>
    </>
  );
};

export default TabFiles;
