import { Button, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const MainLayout = () => {
  return (
    <WrapperMainLayout>
      <WrapperNav className="">
        <Container>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <Link to="/" className="nav-item">
                FB LOGO
              </Link>

              <Link to="/" className="nav-item">
                Title
              </Link>

              <Link to="/" className="nav-item">
                Title
              </Link>
            </div>

            <Link to="/login">
              <Button className="button-login" variant="danger">
                Login
              </Button>
            </Link>
          </div>
        </Container>
      </WrapperNav>

      <div className="main-content">
        <Outlet />
      </div>
    </WrapperMainLayout>
  );
};

export default MainLayout;

const WrapperNav = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  height: 60px;
  background-color: #1c1c1c;
  color: #fff;

  position: fixed;
  top: 0;
  width: 100%;

  a {
    color: #fff;
    font-weight: 600;
  }

  .nav-item {
    display: block;
    height: 40px;
    padding: 10px 20px;
  }

  .button-login {
    border: none;
    border-radius: 0px;
    height: 60px;
    padding: 0px 30px;
  }
`;

const WrapperMainLayout = styled.div`
  .main-content {
    margin-top: 60px;
    width: 100%;
    min-height: calc(100vh - 60px);
    height: calc(100vh - 60px);
  }
`;
