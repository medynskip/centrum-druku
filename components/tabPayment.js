import React, { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import Button from "react-bootstrap/Button";

import ContentBox from "./contentBox";

const TabPayment = ({ order, updateClient }) => {
  const router = useRouter();
  const startPayment = () => {
    const query = {
      notifyUrl: `${process.env.NEXT_PUBLIC_API_LINK}/payment/test`,
      customerIp: "127.0.0.1",
      merchantPosId: "402972",
      description: "Centrum Druku",
      currencyCode: "PLN",
      totalAmount: `${order.value * 123}`,
      extOrderId: order._id,
      continueUrl: `${process.env.NEXT_PUBLIC_SELF}/zamowienie/szczegoly?id=${order._id}&email=${order.client.email}`,
      buyer: {
        email: order.client.email,
        phone: order.client.phone,
        firstName: order.client.firstName,
        lastName: order.client.lastName,
        language: "pl",
      },
      products: [
        {
          name: `${order.product} - ${order.volume} sztuk`,
          unitPrice: `${order.value * 123}`,
          quantity: "1",
        },
      ],
    };

    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/payment/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateInvoice = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_LINK}/order/update/invoice/${order._id}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    )
      .then((res) => res.json())
      .then((data) => updateClient(data))
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadFile = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_LINK}/order/invoice/download/${order._id}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `pro-forma.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ContentBox title="Szczegóły płatności">
        Dane np data płatości, sposób płatności, kwoty
      </ContentBox>
      <ContentBox title="Dostępne akcje">
        {order.payment == "UNDEFINED" ? (
          <Button onClick={startPayment}>Opłać w systemie PayU</Button>
        ) : (
          <Button disabled>Płatność rozpoczęta</Button>
        )}
        {order.invoice ? (
          <Button onClick={downloadFile}>Pobierz Fakturę PRO-Forma</Button>
        ) : (
          <Button onClick={generateInvoice}>Wygeneruj fakturę Pro-Forma</Button>
        )}
      </ContentBox>
    </>
  );
};

export default TabPayment;
