import React, { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import utils from "./../utils/utils";

import Button from "react-bootstrap/Button";

import ContentBox from "./contentBox";

const TabPayment = ({ order, updateClient }) => {
  const paymentTranslate = (test) => {
    switch (test) {
      case "UNDEFINED":
        return "Niezdefiniowana";
      case "NEW":
        return "Rozpoczęta";
      case "PENDING":
        return "Oczekująca";
      case "CANCELED":
        return "Anulowana";
      case "COMPLETED":
        return "Opłacone";
    }
  };

  const router = useRouter();
  const startPayment = () => {
    const query = {
      notifyUrl: `${process.env.NEXT_PUBLIC_API_LINK}/payment/update-status/${order._id}`,
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

    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/payment/create/${order._id}`, {
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
      `${process.env.NEXT_PUBLIC_API_LINK}/order/update/temp-invoice/${order._id}`,
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
      `${process.env.NEXT_PUBLIC_API_LINK}/order/temp-invoice/download/${order._id}`
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
        <ul>
          <li>
            <strong>Zamówienie złożone:</strong>
            <span>{utils.dateNormalize(order.placed, false)}</span>
          </li>
          <li>
            <strong>Wybrana metoda płatności:</strong>
            <span>{order.paymentType}</span>
          </li>
          <li>
            <strong>Status płatności:</strong>
            <span>{paymentTranslate(order.paymentStatus)}</span>
          </li>
          <li>
            <strong>Data rozpoczęcia płatności:</strong>
            <span>
              {order.paymentStarted
                ? utils.dateNormalize(order.paymentStarted, false)
                : "---"}
            </span>
          </li>
          <li>
            <strong>Data księgowania płatności:</strong>
            <span>
              {order.paymentCompleted
                ? utils.dateNormalize(order.paymentCompleted, false)
                : "---"}
            </span>
          </li>
        </ul>
      </ContentBox>
      <ContentBox title="Dostępne akcje">
        {order.paymentStatus == "UNDEFINED" ? (
          <Button onClick={startPayment}>Opłać w systemie PayU</Button>
        ) : (
          <Button disabled>Płatność rozpoczęta</Button>
        )}
        <div className="hr-sect">LUB</div>
        {order.invoiceTemp ? (
          <>
            <Button onClick={downloadFile}>Pobierz Fakturę PRO-Forma</Button>
            {/* <Button onClick={generateInvoice}>Odśwież</Button> */}
          </>
        ) : (
          <Button onClick={generateInvoice}>Wygeneruj fakturę Pro-Forma</Button>
        )}
      </ContentBox>
    </>
  );
};

export default TabPayment;
