import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { initPage, updatePage } from "./../../../redux/actions/pageActions";

import Link from "next/link";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

import AdminLayout from "./../../../components/admin/adminLayout";
import PageForm from "./../../../components/admin/pageForm";

const PostEdit = ({ id, page, initPage, updatePage }) => {
  useEffect(() => {
    initPage(id);
  }, []);

  const sendToStore = (update) => {
    updatePage({
      ...page,
      ...update,
    });
  };

  if (page.loading)
    return (
      <AdminLayout>
        <Spinner />
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <Container>
        <h1>Konfiguruj podstronę</h1>
        <PageForm page={page} sendToStore={sendToStore} />
      </Container>
    </AdminLayout>
  );
};

const mapStateToProps = (state) => ({
  page: { ...state.page },
});

const mapDispatchToProps = (dispatch) => {
  return {
    updatePage: (page) => dispatch(updatePage(page)),
    initPage: (id) => dispatch(initPage(id)),
  };
};

export async function getServerSideProps({ params }) {
  const id = params.page;
  return { props: { id } };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
