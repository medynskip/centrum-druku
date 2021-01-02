import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";

const LinkButton = (props) => {
  let history = useHistory();
  const handleClick = () => {
    history.push(props.to);
  };
  return (
    <Button onClick={handleClick} variant={props.variant}>
      {props.text}
    </Button>
  );
};

export default LinkButton;
