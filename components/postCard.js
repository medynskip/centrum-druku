import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import Link from "next/link";

const PostCard = (props) => {
  const shorthand = props.post.content.replace(/(<([^>]+)>)/gi, "");
  const date = new Date(props.post.added);
  const displayDate = `${date.getDate()} / ${
    date.getMonth() + 1
  } / ${date.getFullYear()} g: ${date.getHours()}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;
  // const url = `/blog/${props.post.title}`;
  const url = `/blog/${props.post._id}`;

  return (
    <Col className="post-card">
      <div className="post-img">
        <img src={props.post.image} />
      </div>
      <h2>{props.post.title}</h2>
      <Badge variant="warning">{displayDate}</Badge>
      <p>{shorthand.substring(0, 400) + " (...)"}</p>
      <Link className="black-link" href={url}>
        <a>Czytaj dalej...</a>
      </Link>
    </Col>
  );
};

export default PostCard;
