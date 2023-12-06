import { useEffect, useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import BookingManagement from "./BookingManagement";

import { faker } from "@faker-js/faker";
import { AiTwotoneSchedule } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { UserService } from "../../datasource/User";
import { useAccountStore } from "../../store/useAccountStore";
import useNotification from "../../hooks/useNotification";
import SkeletonRow from "../../components/SkeletonRow";

interface TabsProfile {
  eventKey: string;
  component: JSX.Element;
  title: JSX.Element | string;
}

export const TabsProfile: TabsProfile[] = [
  {
    eventKey: "team",
    title: (
      <>
        <FaPeopleGroup className="fs-5" /> Thông tin đội bóng
      </>
    ),
    component: <>Thông tin đội bóng</>,
  },
  {
    eventKey: "my-booking",
    title: (
      <>
        <AiTwotoneSchedule className="fs-5" /> Lịch của tôi
      </>
    ),
    component: <BookingManagement />,
  },
];

const Profile = () => {
  const { account } = useAccountStore();
  const { id } = useParams();
  const { handleMessageError } = useNotification();

  const [user, setUser] = useState<any>();
  const [loadingFetchUser, setLoadingFetchUser] = useState(false);

  const [key, setKey] = useState(TabsProfile[0].eventKey);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeTabs = (key: string) => {
    setKey(key);
    setSearchParams({ tab: key });
  };

  const handleGetInforUser = async (id: string) => {
    try {
      setLoadingFetchUser(true);
      const { data } = await UserService.getInfoUserById(id);
      setUser(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetchUser(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    handleGetInforUser(id);
  }, [id]);

  useEffect(() => {
    const tabQuery = searchParams.get("tab");

    if (!tabQuery) {
      setSearchParams({ tab: TabsProfile[0].eventKey });
      return;
    }

    const tabCorrect = TabsProfile.find((tab: TabsProfile) => tab.eventKey === tabQuery);

    if (tabCorrect) {
      setKey(tabCorrect.eventKey);
    } else {
      setSearchParams({ tab: TabsProfile[0].eventKey });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <WrapperProfile>
      <div className="profile-nav mt-3 p-3">
        {loadingFetchUser ? (
          <>
            <SkeletonRow />
          </>
        ) : (
          <Row>
            <Col md={2} className="d-flex justify-content-center">
              <img
                className="avatar"
                src="https://fastly.picsum.photos/id/271/600/600.jpg?hmac=oQxkoh7h_eeQYZdscWjW2y_uLJ7EAGSSyp5PkehioBk"
              />
            </Col>

            <Col md={4}>
              <p>Tên: {user?.username}</p>
              <p>Email: {user?.email}</p>
              <p>SDT: {user?.phone}</p>
            </Col>

            <Col md={4}>
              {/* <p>Tuổi tác</p>
            <p>Giới tính</p>
            <p>Đội bóng</p> */}
            </Col>

            <Col className="d-flex justify-content-center align-items-center">
              {id && id === account.id && (
                <Button variant="secondary">
                  <AiTwotoneSchedule className="fs-5" /> Chỉnh sửa
                </Button>
              )}
            </Col>
          </Row>
        )}
      </div>

      <Tabs
        activeKey={key}
        onSelect={(k) => handleChangeTabs(k as string)}
        className="mb-3 tabs-list"
      >
        {TabsProfile.map((tab: TabsProfile, index: number) => (
          <Tab key={index} eventKey={tab.eventKey} title={tab.title}>
            {tab.component}
          </Tab>
        ))}
      </Tabs>
    </WrapperProfile>
  );
};

export default Profile;

const WrapperProfile = styled.div`
  .profile-nav {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    .avatar {
      width: 150px;
      height: 150px;
      object-fit: fill;
      border-radius: 16px;
    }
  }

  .tabs-list {
    background: #e4e4e4;
    border-width: 0px;

    button.nav-link {
      border: none;
      border-radius: unset;
      color: #000;
    }

    button.nav-link.active {
      background: transparent;
      border: none;
      border-radius: unset;
      border-bottom: 3px solid #198754;
      color: #198754;
    }
  }
`;
