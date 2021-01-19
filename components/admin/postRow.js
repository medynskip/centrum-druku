import Link from "next/link";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";

const PostRow = ({ post, deletePost }) => {
  const date = new Date(post.added);

  const deletePasser = () => {
    const approve = confirm("Potwierdź usunięcie produktu");
    if (approve) {
      deletePost(post._id);
    }
  };

  return (
    <ListGroup.Item>
      <div className="space-between">
        <div>
          <h5>{post.title}</h5>
          <Badge variant={post.active ? "success" : "secondary"}>
            {" "}
            {post.active ? "aktywny" : "nieaktywny"}
          </Badge>
          <Badge variant="primary">
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} g:{" "}
            {date.getHours()}:{date.getMinutes()}
          </Badge>
        </div>
        <div>
          <Link href={`/admin-panel/blog/${post._id}`}>
            <a>
              <Button variant="primary" size="sm">
                edit
              </Button>
            </a>
          </Link>
          <Button variant="danger" size="sm" onClick={deletePasser}>
            Delete
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default PostRow;
