import { Container, Form } from "react-bootstrap";
import styled from "styled-components";

const FacilityPage = () => {
  return (
    <WrapperFacilityPage>
      <Container>
        <Form.Group className="mb-3">
          <Form.Label>Tên sân</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control as="textarea" rows={2} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Loại sân</Form.Label>
          <Form.Check type="checkbox" id={`check-api-checkbox`}>
            <Form.Check.Input type="checkbox" />
            <Form.Check.Label>5 x 5</Form.Check.Label>
          </Form.Check>
        </Form.Group>
      </Container>
    </WrapperFacilityPage>
  );
};

export default FacilityPage;

const WrapperFacilityPage = styled.div``;
