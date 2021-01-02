import Col from "react-bootstrap/Col";

const CoopStep = ({ step }) => {
  return (
    <Col>
      <div className={"co-op-step " + step.after}>
        <div>
          <span>{step.id}</span>
          <h4>{step.title}</h4>
        </div>
        <p>{step.text}</p>
      </div>
    </Col>
  );
};

export default CoopStep;
