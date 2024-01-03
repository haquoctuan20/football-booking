import { Container } from "react-bootstrap";
import styled from "styled-components";

import BgPageLayout from "../../assets/bg-page-layout.jpg";

interface PageLayoutProps {
  title: string;
  children: JSX.Element;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <WrapperPageLayout>
      <div className="hero-title">
        <div className="title">{title}</div>
      </div>

      <Container>{children}</Container>
    </WrapperPageLayout>
  );
};

export default PageLayout;

const WrapperPageLayout = styled.div`
  .hero-title {
    height: 170px;
    width: 100%;
    background-image: url(${BgPageLayout});
    background-size: contain;
    background-position: center;

    display: flex;
    justify-content: center;
    align-items: center;

    .title {
      color: #fff;
      font-size: 50px;
      font-weight: 600;

      text-shadow: 2px 2px #000000;
    }
  }
`;
