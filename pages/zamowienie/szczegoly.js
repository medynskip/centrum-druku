import { connect } from "react-redux";
import {
  updateClient,
  submitClient,
  cancelClient,
  getClient,
} from "../../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import Loading from "../../components/loading";
import Layout from "../../components/layout";
import NoOrder from "../../components/noOrder";
import OrderMain from "../../components/orderMain";

const Szczegoly = ({
  order,
  cancelClient,
  updateClient,
  getClient,
  products,
  pages,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!order._id && router.query.id && router.query.email) {
      getClient(router.query.id, router.query.email);
    }
  }, [order, router.query]);

  const refresh = () => {
    getClient(order._id, order.client.email);
  };

  const cancel = () => {
    cancelClient(order);
  };

  if (!order._id && order.submitting) {
    return <Loading products={products} pages={pages} />;
  }

  return (
    <>
      {!order._id ? (
        <NoOrder products={products} pages={pages} />
      ) : (
        <Layout title="Szczegóły zamówienia" products={products} pages={pages}>
          <OrderMain
            order={order}
            cancel={cancel}
            refresh={refresh}
            updateClient={updateClient}
          />
        </Layout>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  order: { ...state.client },
});

const mapDispatchToProps = {
  cancelClient: (order) => cancelClient(order),
  updateClient: (order) => updateClient(order),
  getClient: (order_id, email) => getClient(order_id, email),
};

export async function getStaticProps() {
  const productsQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/product/get/active`
  );
  const products = await productsQuery.json();

  const pagesQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/page/get/active`
  );
  const pages = await pagesQuery.json();

  return {
    props: {
      products,
      pages,
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Szczegoly);
