import styled from "styled-components";

export const WrapperAuth = styled.div`
  height: 100%;
  background: linear-gradient(to bottom, #0f1921, #030303);
  color: #fff;

  .container-auth {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-side {
    width: 50%;
    background-image: url("/football-stadium-night-generative-ai.jpg");
    background-size: cover;
    background-position: center;
    height: 100%;
  }

  .right-side {
    width: 50%;
    padding: 0px 30px;
  }

  .auth-error {
    color: red;
  }

  .title-auth {
    font-size: 40px;
    text-align: center;
    padding: 20px 0px;
  }

  .label-auth {
    padding-bottom: 5px;
  }
`;
