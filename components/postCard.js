import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import Link from "next/link";
import Image from "next/image";

import utils from "../utils/utils";

const PostCard = (props) => {
  const displayDate = utils.dateNormalize(props.post.added);
  const preview = utils.txtPreview(props.post.content, 400);

  // const shorthand = props.post.content.replace(/(<([^>]+)>)/gi, "");
  // const date = new Date(props.post.added);
  // const displayDate = `${date.getDate()} / ${
  //   date.getMonth() + 1
  // } / ${date.getFullYear()} g: ${date.getHours()}:${(
  //   "0" + date.getMinutes()
  // ).slice(-2)}`;

  const titleSlug = utils.slugify(props.post.title);

  const url = `/blog/${titleSlug}`;

  return (
    <Col className="post-card">
      <div className="post-img">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_LINK}/${props.post.image}`}
          layout="fill"
        />
      </div>
      <h2>{props.post.title}</h2>
      <Badge variant="warning">{displayDate}</Badge>
      <p>
        {preview}
        {/* shorthand.substring(0, 400) + " (...)" */}
      </p>
      <Link className="black-link" href={url}>
        <a>Czytaj dalej...</a>
      </Link>
    </Col>
  );
};

export default PostCard;
