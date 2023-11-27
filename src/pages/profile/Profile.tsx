import { useEffect, useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import BookingManagement from "./BookingManagement";

import { FaPeopleGroup } from "react-icons/fa6";
import { AiTwotoneSchedule } from "react-icons/ai";

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
  {
    eventKey: "home",
    title: "Home",
    component: <>Tab content for Home</>,
  },
  {
    eventKey: "Contact",
    title: "Contact",
    component: <>Tab content for Contact</>,
  },
  {
    eventKey: "About",
    title: "About",
    component: <>Tab content for About</>,
  },
];

const Profile = () => {
  const [key, setKey] = useState(TabsProfile[0].eventKey);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const tabQuery = searchParams.get("tab");

    if (!tabQuery) {
      setSearchParams({ tab: TabsProfile[0].eventKey });
      return;
    }

    const tabCorrect = TabsProfile.find(
      (tab: TabsProfile) => tab.eventKey === tabQuery
    );

    if (tabCorrect) {
      setKey(tabCorrect.eventKey);
    } else {
      setSearchParams({ tab: TabsProfile[0].eventKey });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleChangeTabs = (key: string) => {
    setKey(key);
    setSearchParams({ tab: key });
  };

  return (
    <WrapperProfile>
      <div className="profile-nav mt-3 p-3">
        <Row>
          <Col md={2} className="d-flex justify-content-center">
            <img
              className="avatar"
              src="https://fastly.picsum.photos/id/271/600/600.jpg?hmac=oQxkoh7h_eeQYZdscWjW2y_uLJ7EAGSSyp5PkehioBk"
            />
          </Col>

          <Col md={3}>
            <p>Username</p>
            <p>Email</p>
            <p>SDT</p>
          </Col>

          <Col md={4}>
            <p>Tuổi tác</p>
            <p>Giới tính</p>
            <p>Đội bóng</p>
          </Col>

          <Col>
            <Button>Button</Button>
            <Button>Button</Button>
          </Col>
        </Row>
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
