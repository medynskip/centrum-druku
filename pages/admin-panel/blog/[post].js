import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { initPost, updatePost } from "./../../../redux/actions/postActions";

import Link from "next/link";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

import AdminLayout from "./../../../components/admin/adminLayout";
import PostForm from "./../../../components/admin/postForm";

const PostEdit = ({ id, post, initPost, updatePost }) => {
  useEffect(() => {
    initPost(id);
  }, []);

  const sendToStore = (update) => {
    updatePost({
      ...post,
      ...update,
    });
  };

  // const data = {
  //   ...post,
  //   content: text,
  // };
  // !id ? props.addPost(data) : props.updatePost(id, data);
  // history.push("/admin/blog");
  //   };

  //   const handleExit = () => {
  //     history.push("/admin/blog");
  //   };

  if (post.loading)
    return (
      <AdminLayout>
        <Spinner />
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <Container>
        <h1>Wpis na blogu</h1>
        <PostForm post={post} sendToStore={sendToStore} />
      </Container>
    </AdminLayout>
  );
};

const mapStateToProps = (state) => ({
  post: { ...state.post },
});

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (post) => dispatch(updatePost(post)),
    initPost: (id) => dispatch(initPost(id)),
  };
};

export async function getServerSideProps({ params }) {
  const id = params.post;
  return { props: { id } };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
