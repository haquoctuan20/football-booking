import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
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
        <Col
          md={8}
          className="ps-0 h-100 d-flex flex-column justify-content-between"
        >
          <div>
            <Link to={"/booking/123id123"} className="facility-name">
              Sân bóng 123
            </Link>
            <div>
              <strong>Địa chỉ: </strong> Đường Tân Mai - Tân Mai, Quận Hoàng
              Mai, Hà Nội
            </div>
            <div>
              <strong>Giá tham khảo: </strong>{" "}
              <span className="price">400.000₫ - 900.000₫ </span>/ Trận
            </div>
          </div>

          <Link to={"/booking/123id123"}>
            <Button size="sm" variant="outline-success">
              Xem chi tiết | Đặt sân
            </Button>
          </Link>
        </Col>
      </Row>
    </WrapperFacility>
  );
};

export default Facility;

const WrapperFacility = styled.div`
  height: 200px;
  width: 100%;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
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
    font-weight: bold;
    font-size: 20px;
    color: #000;

    &:hover {
      color: #198754;
    }
  }

  .price {
    font-weight: bold;
    color: #f90303;
  }
`;
