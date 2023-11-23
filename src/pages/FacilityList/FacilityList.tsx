import { Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import Facility from "./Facility";

const FacilityList = () => {
  return (
    <WrapperFacilityList className="mt-3">
      <Row>
        <Col md={8}>
          <Form.Label htmlFor="search">Tìm kiếm</Form.Label>
          <Form.Control type="text" id="search" />
          {/* list facility */}

          <div className="mt-4">
            <Facility />

            <Facility />

            <Facility />
          </div>
        </Col>

        <Col md={4}>Bộ lọc</Col>
      </Row>
    </WrapperFacilityList>
  );
};

export default FacilityList;

const WrapperFacilityList = styled.div``;
