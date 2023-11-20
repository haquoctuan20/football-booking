import { useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import styled from "styled-components";

const Profile = () => {
  const [key, setKey] = useState("home");

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
            <div>ten ten ten</div>
            <div>info...</div>
          </Col>

          <Col md={4}>
            <div>info...</div>
          </Col>

          <Col>
            <Button>Button</Button>
            <Button>Button</Button>
          </Col>
        </Row>
      </div>

      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k as string)}
        className="mb-3 tabs-list"
      >
        <Tab eventKey="home" title="Home">
          Tab content for Home
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>
        <Tab eventKey="contact" title="Contact">
          Tab content for Contact
        </Tab>
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
