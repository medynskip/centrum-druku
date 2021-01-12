// import { useHistory } from "react-router-dom";
import Link from "next/link";

import Button from "react-bootstrap/Button";

const LinkButton = (props) => {
  return (
    <Link href={props.to}>
      <a>
        <Button variant={props.variant}>{props.text}</Button>
      </a>
    </Link>
  );
};

export default LinkButton;
