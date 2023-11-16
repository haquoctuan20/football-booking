import styled from "styled-components";

export const WrapperAuth = styled.div`
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

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
