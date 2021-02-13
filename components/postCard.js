import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import Link from "next/link";
import Image from "next/image";

import utils from "../utils/utils";

const PostCard = (props) => {
  const displayDate = utils.dateNormalize(props.post.added);
  const preview = utils.txtPreview(props.post.content, 400);
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
      <p>{preview}</p>
      <Link href={url}>
        <a className="black-link">Czytaj dalej...</a>
      </Link>
    </Col>
  );
};

export default PostCard;
