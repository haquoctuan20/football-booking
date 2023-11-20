import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

const Facility = () => {
  return (
    <WrapperFacility>
      <Row className="h-100">
        <Col md={4} className="h-100 d-flex align-items-center">
          <img
            src="https://fastly.picsum.photos/id/658/600/600.jpg?hmac=vPUD4SgPwBnjxO_CWMx32AOw_UmmwBFGnzL_1VxfjYg"
            alt="san bong"
            className="img-facility"
          />
        </Col>
        <Col md={8} className="ps-0">
          <p className="facility-name">ten san bong</p>
          <p>dia chi</p>
          <p>gia thue</p>
          <p>danh gia</p>
        </Col>
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
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  color: #000;

  &:hover {
    border: 1px solid #23ce7e;
  }

  .img-facility {
    object-fit: fill;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  .facility-name {
    font-weight: 500;
  }
`;
