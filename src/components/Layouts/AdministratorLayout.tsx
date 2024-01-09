import { Link, Outlet, matchPath, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useNavigationStore } from "../../store/useNavigationStore";
import { useEffect, useState } from "react";
import { RouteTitle, RouteTitleAttribute } from "../../constants/routeTitle";
import { useAccountStore } from "../../store/useAccountStore";
import useStatusAccount from "../../hooks/useStatusAccount";

const AdministratorLayout = () => {
  const { title, setTitle } = useNavigationStore();
  const { fetchingUser } = useAccountStore();
  const { isOwner } = useStatusAccount();
  const navigate = useNavigate();

  const [routeActive, setRouteActive] = useState<RouteTitleAttribute | null>(null);

  const location = useLocation();

  const checkMatchUrl = () => {
    const match = RouteTitle.find((route: RouteTitleAttribute) => {
      const isMatch = matchPath(route.path, location.pathname);

      if (isMatch) {
        return isMatch;
      }
    });

    if (match) {
      setTitle(match.title);
      setRouteActive(match);
    }
  };

  useEffect(() => {
    checkMatchUrl();
    fetchingUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!isOwner) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwner]);

  if (!isOwner) return <></>;

  return (
    <WrapperAdministratorLayout>
      <div className="nav-admin bg-dark text-white">
        <Link to="/" className="text-white width-200">
          Trở về trang chủ
        </Link>

        <div>
          <div className="fw-bold">{title}</div>
        </div>
      </div>

      <div className="admin-main-content ">
        <div className="left-side bg-secondary">
          <ul className="nav flex-column">
            {RouteTitle.map((route: RouteTitleAttribute, index: number) => {
              if (route.isMenu) {
                return (
                  <li
                    className={`nav-item ${
                      routeActive && routeActive.parent === route.parent ? "active" : ""
                    }`}
                    key={index}
                  >
                    <Link className="nav-link text-white" to={route.path}>
                      {route.title}
                    </Link>
                  </li>
                );
              }
            })}
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
    min-width: 200px;
  }

  .right-side {
    flex: 1;
    overflow: auto;
  }

  .nav-item {
    &:hover {
      background-color: #198754;
    }
  }

  .active {
    background-color: #198754;
  }
`;
