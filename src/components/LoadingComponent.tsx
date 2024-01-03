import styled from "styled-components";

import SoccerBall from "../assets/soccer_ball2.png";

const LoadingComponent = () => {
  return (
    <WrapperLoadingComponent>
      <img className="image-loading" src={SoccerBall} alt="loading" />
      <div className="fs-5">Đang tải...</div>
    </WrapperLoadingComponent>
  );
};

export default LoadingComponent;

const WrapperLoadingComponent = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #9191914a;
  backdrop-filter: blur(4px);
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .image-loading {
    width: 50px;
    height: 50px;

    animation: spin 2s linear infinite;
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
