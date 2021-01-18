import React, { useEffect } from "react";

import { connect } from "react-redux";
import { updateOrder, initOrder } from "./../../../redux/actions/orderActions";

import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import AdminLayout from "./../../../components/admin/adminLayout";

import OrderForm from "./../../../components/admin/orderForm";

const OrderEdit = ({ id, order, initOrder, updateOrder }) => {
  useEffect(() => {
    initOrder(id);
  }, []);

  const sendToStore = (update) => {
    updateOrder({
      ...order,
      ...update,
    });
  };

  if (order.loading)
    return (
      <AdminLayout>
        <Spinner />
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <section className="single-order">
        <Container>
          <OrderForm order={order} sendToStore={sendToStore} />
        </Container>
      </section>
    </AdminLayout>
  );
};

const mapStateToProps = (state) => ({
  order: { ...state.order },
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrder: (order) => dispatch(updateOrder(order)),
    initOrder: (id) => dispatch(initOrder(id)),
  };
};

export async function getServerSideProps({ params }) {
  const id = params.zamowienie;
  return { props: { id } };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEdit);
