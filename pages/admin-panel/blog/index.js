import Link from "next/link";

import AdminLayout from "./../../../components/adminLayout";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";

const EditBtn = (props) => {
  //   const history = useHistory();
  const editProduct = () => {
    // const url = `/admin/blog/edytuj/${props.id}`;
    // history.push(url);
  };
  return (
    <Button variant="primary" size="sm" onClick={editProduct}>
      edit
    </Button>
  );
};

const DeleteBtn = (props) => {
  const deleteThis = () => {
    const approve = confirm("Potwierdź usunięcie produktu");
    if (approve) {
      props.deletePost();
    }
  };
  return (
    <Button variant="danger" size="sm" onClick={deleteThis}>
      Delete
    </Button>
  );
};

const SinglePost = ({ post, deletePost }) => {
  //   const history = useHistory();
  const date = new Date(post.added);

  const variant = (a) => {
    // return <Badge variant={variant(post.active)}></Badge>
    return (
      <Badge variant={a ? "success" : "secondary"}>
        {" "}
        {a ? "aktywny" : "nieaktywny"}
      </Badge>
    );
  };

  const deletePasser = () => {
    // deletePost(post._id);
  };

  return (
    <ListGroup.Item>
      <div className="space-between">
        <div>
          <h5>{post.title}</h5>
          {variant(post.active)}
          <Badge variant="primary">
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} g:{" "}
            {date.getHours()}:{date.getMinutes()}
          </Badge>
        </div>
        <div>
          <EditBtn id={post._id} />
          <DeleteBtn deletePost={deletePasser} />
        </div>
      </div>
    </ListGroup.Item>
  );
};

const PostsList = ({ posts }) => {
  //   const history = useHistory();

  //   useEffect(() => {
  //     props.getAllPosts();
  //   }, []);

  const deletePost = () => {
    // props.deletePost(id);
    // props.getAllPosts();
  };

  const handleClick = () => {
    // history.push("/admin/blog/nowy/");
  };

  return (
    <AdminLayout>
      <Container>
        <h3>Wpisy na blogu</h3>
        <ListGroup>
          {posts.length > 0 ? (
            posts.map((post) => {
              return (
                <SinglePost
                  key={post._id}
                  post={post}
                  deletePost={deletePost}
                />
              );
            })
          ) : (
            <Alert variant="warning">
              Nie dodałeś jeszcze żadnych wpisów na blogu!
            </Alert>
          )}
        </ListGroup>
        <Button variant="success" onClick={handleClick}>
          Dodaj nowy wpis
        </Button>
      </Container>
    </AdminLayout>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://api.piotrmedynski.pl/blog/get`);
  const posts = await res.json();

  // Pass data to the page via props
  return { props: { posts } };
}

export default PostsList;
