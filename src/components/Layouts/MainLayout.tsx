import { useEffect } from "react";
import { Badge, Button, Container, Dropdown } from "react-bootstrap";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AccountServices } from "../../datasource/Account";
import { Account, useAccountStore } from "../../store/useAccountStore";
import { useNotificationStore } from "../../store/useNotificationStore";
import Footer from "../Footer";
import NotificationDropdown from "../NotificationDropdown";

const MainLayout = () => {
  const { account, resetAccount, setAccount } = useAccountStore();
  const { count } = useNotificationStore();

  const handleLogout = () => {
    resetAccount();
    AccountServices.logout();
  };

  const handleGetInfoUser = async () => {
    try {
      const { data: user } = await AccountServices.getInfoUser();

      const userData: Account = {
        age: user.age,
        email: user.email,
        gender: user.gender,
        id: user.id,
        image: user.image,
        roles: user.roles,
        username: user.username,
        status: user.status,
        accessToken: account.accessToken,
        name: user.name,
        phone: user.phone,
        birthDate: user.birthDate,
      };

      setAccount(userData);
    } catch (error) {
      console.log("🚀  -> error:", error);
    }
  };

  useEffect(() => {
    handleGetInfoUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperMainLayout>
      <WrapperNav className="">
        <Container>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <Link to="/" className="nav-item">
                FB LOGO
              </Link>

              <Link to="/facilities-list" className="nav-item">
                Tìm sân
              </Link>

              <Link to="/matching-request" className="nav-item">
                Tìm đối
              </Link>
            </div>

            <div className="button-setting d-flex align-items-center">
              {account.id && (
                <div className="me-1 ">
                  <NotificationDropdown />
                </div>
              )}

              {account.id ? (
                <>
                  <Dropdown className=" dropdown-setting" autoClose="inside">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {/* <BsMenuButtonWideFill className="fs-5 me-2" />  */}
                      {account.name ? account.name : account.username}
                    </Dropdown.Toggle>

                    <Dropdown.Menu align={"end"}>
                      <Dropdown.Item className="px-0">
                        <Link className="px-3 py-1 dropdown-item" to={`/profile/${account.id}`}>
                          <ImProfile className="fs-5 me-2" /> Trang cá nhân
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item className="px-0">
                        <Link className="px-3 py-1 dropdown-item" to={`/administrator`}>
                          <MdManageAccounts className=" fs-5 me-2" /> Trang quản lý
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item className="px-0">
                        <Link className="px-3 py-1 dropdown-item" to={`/notifications`}>
                          <FaBell className=" fs-5 me-2" /> Thông báo{" "}
                          {count > 0 && (
                            <Badge className="ms-1" bg="danger">
                              {count}
                            </Badge>
                          )}
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Divider />

                      <Dropdown.Item onClick={handleLogout}>
                        <IoLogOut className="fs-5 me-2" /> Đăng xuất
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                // <Button className="h-100" variant="danger">
                //   {account.email}
                // </Button>
                <Link to="/login">
                  <Button className="h-100" variant="danger">
                    <IoLogIn className="fs-5" /> Đăng nhập
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </WrapperNav>

      <div className="main-content">
        <Outlet />
      </div>

      <Footer></Footer>
    </WrapperMainLayout>
  );
};

export default MainLayout;

const WrapperNav = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  height: 60px;
  background-color: #1c1c1c;
  color: #fff;

  position: fixed;
  top: 0;
  width: 100%;

  z-index: 1;

  .nav-item {
    display: block;
    height: 40px;
    padding: 10px 20px;
    color: #fff;
    font-weight: 500;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #23ce7e;
    }
  }

  .button-setting {
    height: 60px;
    padding: 0px 30px;

    button {
      border: none;
      //border-radius: 0px;
    }
  }

  .dropdown-setting {
    color: #000;
  }

  .dropdown-item {
    height: 40px;
    color: #000;
    display: flex;
    align-items: center;
  }
`;

const WrapperMainLayout = styled.div`
  min-height: 100vh;

  .main-content {
    margin-top: 60px;
    width: 100%;
    /* height: calc(100vh - 60px); */
    min-height: calc(100vh - 60px);
    /* height: fit-content; */
  }
`;
