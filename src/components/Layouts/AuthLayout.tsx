/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from "react-bootstrap";
import styled from "styled-components";

import ImgAuth from "../../assets/football-stadium-night-generative-ai.jpg";

interface AuthLayoutProps {
  children: JSX.Element;
}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <WrapperAuthLayout>
      <Container className="container-auth">
        <div className="left-side"></div>

        <div className="right-side">{props.children}</div>
      </Container>
    </WrapperAuthLayout>
  );
};

export default AuthLayout;

const WrapperAuthLayout = styled.div`
  min-height: calc(100vh - 60px);
  background: linear-gradient(to bottom, #0f1921, #030303);
  color: #fff;

  .container-auth {
    min-height: calc(100vh - 60px);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-side {
    width: 50%;
    background-image: url(${ImgAuth});
    background-size: cover;
    background-position: center;
    min-height: calc(100vh - 60px);
  }

  .right-side {
    width: 50%;
    padding: 0px 30px;
  }
`;
