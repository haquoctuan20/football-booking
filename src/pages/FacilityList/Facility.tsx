import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

const Facility = () => {
  return (
    <WrapperFacility>
      <Row>
        <Col md={4}>anh</Col>
        <Col md={8}>title</Col>
      </Row>
    </WrapperFacility>
  );
};

export default Facility;

const WrapperFacility = styled.div`
  height: 180px;
  width: 100%;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;
