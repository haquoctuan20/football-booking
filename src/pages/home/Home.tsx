import { Col, Container, Row } from "react-bootstrap";
import { TbSearchOff } from "react-icons/tb";
import styled from "styled-components";

import ConvenientImage from "../../assets/Convenient.png";
import QualityImage from "../../assets/quality.png";
import CheckoutImage from "../../assets/checkout.png";
import ImgHeroBanner from "../../assets/soccer-players-action-professional-stadium.jpg";

const HomePage = () => {
  return (
    <WrapperHomePage>
      <div className="super-banner">
        <section className="step-banner p-2">
          <Container className="d-flex justify-content-center align-items-center">
            <TbSearchOff className="fs-2" />
            <div>Tìm kiến sân bóng</div>

            <TbSearchOff className="fs-4 mx-4" />

            <TbSearchOff className="fs-2" />
            <div>Đặt lịch trực tuyến</div>

            <TbSearchOff className="fs-4 mx-4" />

            <TbSearchOff className="fs-2" />
            <div>Tận hưởng trận bóng của bạn</div>
          </Container>
        </section>
        <Container></Container>
      </div>

      <Container className="content-process">
        <div className="fs-3 fw-bold text-center">
          Khám phá trải nghiệm đặt sân bóng hiện đại và thuận tiện
        </div>
        <Row className="align-items-center">
          <Col md={5}>
            <img src={ConvenientImage} alt="thumbnail" className="img-landing-info" />
          </Col>

          <Col md={7}>
            <div>
              <TbSearchOff className="fs-1" />
            </div>
            <div className="fs-4 fw-bold">Tiện Lợi</div>

            <div className="divider__short my-2"></div>

            <div>
              Dễ dàng và nhanh chóng, chỉ cần vài cú click, bạn sẽ có ngay sân bóng ưng ý cho trận
              đấu tuyệt vời. Không còn lo lắng về việc tìm sân - trải nghiệm đặt sân tại đây là sự
              thuận lợi tuyệt vời.
            </div>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col md={7}>
            <div>
              <TbSearchOff className="fs-1" />
            </div>
            <div className="fs-4 fw-bold">Hiện Đại</div>

            <div className="divider__short my-2"></div>

            <div>
              Trải nghiệm sân bóng tuyệt vời với hệ thống sân đạt chuẩn và tiện nghi hiện đại. Sân
              có đèn, cỏ tự nhiên, và các tiện ích như phòng thay đồ, quầy bar sẽ làm cho mỗi trận
              đấu trở nên đặc biệt. Thả mình vào không gian chơi bóng tuyệt vời, chúng tôi lo lắng
              về mọi chi tiết.
            </div>
          </Col>

          <Col md={5}>
            <img src={QualityImage} alt="thumbnail" className="img-landing-info" />
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col md={5}>
            <img src={CheckoutImage} alt="thumbnail" className="img-landing-info" />
          </Col>

          <Col md={7}>
            <div>
              <TbSearchOff className="fs-1" />
            </div>
            <div className="fs-4 fw-bold">Đặt Sân</div>

            <div className="divider__short my-2"></div>

            <div>
              Đặt sân ngay và hưởng ưu đãi đặc biệt! Ưu đãi giảm giá và quà tặng hấp dẫn đang chờ
              đợi bạn. Đừng bỏ lỡ cơ hội được trải nghiệm sân bóng tốt nhất với nhóm bạn. Đăng ký
              ngay để nhận những quyền lợi độc quyền chỉ có tại trang web của chúng tôi!
            </div>
          </Col>
        </Row>
      </Container>
    </WrapperHomePage>
  );
};

export default HomePage;

const WrapperHomePage = styled.div`
  .super-banner {
    width: 100%;
    height: 600px;
    background-image: url(${ImgHeroBanner});
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    margin-bottom: 30px;
  }

  .step-banner {
    background-color: #2f285a;
    font-weight: 400;
    color: #fff;

    width: 100%;
    height: 50px;
  }

  .divider__short {
    border-top: 4px solid #56e07b;
    width: 100px;
  }

  .img-landing-info {
    max-width: 100%;
    height: auto;
  }
`;
