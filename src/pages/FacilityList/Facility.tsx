import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IFacility } from "../../constants/facility";
import THUMB_FACILITY from "../../assets/san-bong.png";

interface FacilityProps extends IFacility {}

const Facility = (props: FacilityProps) => {
  return (
    <WrapperFacility>
      <Row className="h-100">
        <Col md={4} className="h-100 d-flex align-items-center">
          <img src={THUMB_FACILITY} alt="san bong" className="img-facility" />
        </Col>
        <Col md={8} className="ps-0 h-100 d-flex flex-column justify-content-between">
          <div className="facility-info px-2">
            <Link to={`/booking/${props.id}`} className="facility-name">
              {props?.name}
            </Link>
            <div>
              <strong>Địa chỉ: </strong> {props?.address?.number} {props?.address?.street},{" "}
              {props?.address?.ward}, {props?.address?.city}
            </div>
            <div>
              <strong>Số sân: </strong> {props?.numOfFields}
            </div>

            {props?.rating ? (
              <div>
                <strong>Đánh giá: </strong> {props?.rating}
                <span
                  style={{
                    fontSize: 16,
                    color: "gold",
                  }}
                >
                  &#9733; {/* Dấu sao Unicode */}
                </span>
              </div>
            ) : (
              <>
                <strong>Đánh giá: </strong>
                <span>Chưa có đánh giá</span>
              </>
            )}

            {/* <div>
              <strong>Giá tham khảo: </strong> <span className="price">400.000₫ - 900.000₫ </span>/
              Trận
            </div> */}
          </div>

          <div className="d-flex justify-content-between px-2">
            <Link to={`/profile/${props?.ownerId}?tab=team`} className="d-block">
              Chủ sân
            </Link>

            <Link to={`/booking/${props.id}`} className="d-block">
              <Button size="sm" variant="outline-success">
                Xem sân | Đặt sân
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </WrapperFacility>
  );
};

export default Facility;

const WrapperFacility = styled.div`
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
    /* height: 100%; */
    border-radius: 8px;
  }

  .facility-info {
    height: 150px;
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
