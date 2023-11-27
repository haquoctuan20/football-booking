import { Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import Facility from "./Facility";
import PaginationComponent from "../../components/PaginationComponent";

const FacilityList = () => {
  return (
    <WrapperFacilityList className="mt-3">
      <Row>
        <Col md={4}>Bộ lọc</Col>

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
      </Row>

      <div className="mt-2 mb-5">
        <PaginationComponent
          activePage={1}
          total={123}
          perPage={10}
          onClick={(page: number) => {
            console.log("page: ", page);
          }}
        />
      </div>
    </WrapperFacilityList>
  );
};

export default FacilityList;

const WrapperFacilityList = styled.div``;
