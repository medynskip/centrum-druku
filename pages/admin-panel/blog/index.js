import Link from "next/link";
import { useRouter } from "next/router";

import AdminLayout from "./../../../components/admin/adminLayout";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";

import PostRow from "./../../../components/admin/postRow";
import PostNew from "./../../../components/admin/postNew";

const PostsList = ({ posts }) => {
  const router = useRouter();

  const addPost = (post) => {
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/blog/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(() => {
      router.replace(router.asPath);
    });
  };

  const deletePost = (postID) => {
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/blog/delete/${postID}`, {
      method: "DELETE",
    }).then(() => {
      router.replace(router.asPath);
    });
  };

  return (
    <AdminLayout>
      <Container>
        <h3>Wpisy na blogu</h3>
        <ListGroup>
          {posts.length > 0 ? (
            posts.map((post) => {
              return (
                <PostRow key={post._id} post={post} deletePost={deletePost} />
              );
            })
          ) : (
            <Alert variant="warning">
              Nie dodałeś jeszcze żadnych wpisów na blogu!
            </Alert>
          )}
        </ListGroup>
        <PostNew addPost={addPost} />

        {/* <Button variant="success" onClick={handleClick}>
          Dodaj nowy wpis
        </Button> */}
      </Container>
    </AdminLayout>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_LINK}/blog/get`);
  const posts = await res.json();

  // Pass data to the page via props
  return { props: { posts } };
}

export default PostsList;
