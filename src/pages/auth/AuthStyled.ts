import styled from "styled-components";

export const WrapperAuth = styled.div`
  height: 100%;

  .container-auth {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-side {
    width: 50%;
  }

  .right-side {
    width: 50%;
  }

  .auth-error {
    color: red;
  }
`;
