import { Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";

const Setting = () => {
  return (
    <WrapperSetting>
      <Row>
        <Col md={4}>
          <h4>Thanh toán</h4>
          <div>
            Cung cấp dịch vụ khách hàng tốt hơn bằng cách thiết lập phương thức thanh toán trực
            tuyến đơn giản.
          </div>
        </Col>

        <Col md={8}>
          <div className="container-payment-method">
            <img src="/paypal_logo_icon_170865.png" alt="paypal" className="icon-method" />

            <div>
              <ul>
                <li>
                  Giúp thúc đẩy chuyển đổi bằng cách cung cấp cho khách hàng trải nghiệm thanh toán
                  liền mạch mà không cần thiết lập hoặc phí hàng tháng
                </li>
                <li>
                  Một hệ thống thanh toán tích hợp duy nhất đảm bảo bạn luôn được cập nhật các
                  phương thức thanh toán mới nhất
                </li>
                <li>
                  Chấp nhận thẻ tín dụng/thẻ ghi nợ chính và các phương thức thanh toán địa phương
                  thay thế thông qua ví PayPal
                </li>
              </ul>
            </div>

            <Button variant="success">Kết nối với PayPal</Button>
          </div>
        </Col>
      </Row>
    </WrapperSetting>
  );
};

export default Setting;

const WrapperSetting = styled.div`
  .container-payment-method {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 4px;

    .icon-method {
      height: 60px;
    }
  }
`;
