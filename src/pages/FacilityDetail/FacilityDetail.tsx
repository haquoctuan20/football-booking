import { Carousel } from "react-bootstrap";
import styled from "styled-components";

const FacilityDetail = () => {
  return (
    <WrapperFacilityDetail className="mt-3">
      <Carousel className="preview-carousel">
        <Carousel.Item>
          <img
            src="https://fastly.picsum.photos/id/846/900/600.jpg?hmac=w1NIEeLSinPzYzdjfmlxxhhUNEyZhvLczxrYYrX-nIw"
            alt="san bong"
            className="preview-facility"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="https://fastly.picsum.photos/id/846/900/600.jpg?hmac=w1NIEeLSinPzYzdjfmlxxhhUNEyZhvLczxrYYrX-nIw"
            alt="san bong"
            className="preview-facility"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="https://fastly.picsum.photos/id/846/900/600.jpg?hmac=w1NIEeLSinPzYzdjfmlxxhhUNEyZhvLczxrYYrX-nIw"
            alt="san bong"
            className="preview-facility"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="mt-5">Thong tin san bong</div>
    </WrapperFacilityDetail>
  );
};

export default FacilityDetail;

const WrapperFacilityDetail = styled.div`
  .preview-carousel {
    width: 100%;
    height: 500px;
  }

  .preview-facility {
    width: 100%;
    height: 500px;
  }
`;
