import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const AdministratorLayout = () => {
  return (
    <WrapperAdministratorLayout>
      <div className="nav-admin bg-dark text-white">
        <Link to="/" className="text-white">
          Trở về trang chủ
        </Link>
      </div>

      <div className="admin-main-content ">
        <div className="left-side bg-secondary">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link text-white" to="facility">
                Quản lý sân
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="#">
                123 123 123 123
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="#">
                123 123 123 123
              </Link>
            </li>
          </ul>
        </div>

        <div className="right-side p-2">
          <Outlet />
        </div>
      </div>
    </WrapperAdministratorLayout>
  );
};

export default AdministratorLayout;

const WrapperAdministratorLayout = styled.div`
  height: 100vh;

  .nav-admin {
    height: 50px;
    color: #fff;
    padding: 8px;

    display: flex;
    align-items: center;
  }

  .admin-main-content {
    height: calc(100vh - 50px);

    display: flex;
  }

  .left-side {
    width: 200px;
  }

  .nav-item {
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #198754;
    }
  }
`;
