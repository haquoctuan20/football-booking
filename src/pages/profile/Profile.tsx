import { useEffect, useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import BookingManagement from "./BookingManagement";

import { AiTwotoneSchedule } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";
import { FaPhoneAlt, FaTransgender } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoCalendarNumber, IoMailSharp, IoPerson } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { TbNumbers } from "react-icons/tb";
import SkeletonRow from "../../components/SkeletonRow";
import { UserService } from "../../datasource/User";
import useNotification from "../../hooks/useNotification";
import { useAccountStore } from "../../store/useAccountStore";
import InformationProfile from "./InformationProfile";
import MatchingRequestManagement from "./MatchingRequestManagement";
import UpdateProfile from "./UpdateProfile";

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
        <FaPeopleGroup className="fs-5" /> Thông tin - Đội bóng
      </>
    ),
    component: <InformationProfile />,
  },
];

export const TabsProfileManage: TabsProfile[] = [
  {
    eventKey: "my-booking",
    title: (
      <>
        <AiTwotoneSchedule className="fs-5" /> Lịch trận bóng
      </>
    ),
    component: <BookingManagement />,
  },
  {
    eventKey: "my-matching-request",
    title: (
      <>
        <BsFillStarFill className="fs-5" /> Lịch sử bắt đối
      </>
    ),
    component: <MatchingRequestManagement />,
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

  const [openEdit, setOpenEdit] = useState(false);

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

  const handleCallBackUpdate = () => {
    setOpenEdit(false);
    if (!id) return;
    handleGetInforUser(id);
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    handleGetInforUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const tabQuery = searchParams.get("tab");

    if (!tabQuery) {
      setSearchParams({ tab: TabsProfile[0].eventKey });
      return;
    }

    const allTabs = [...TabsProfile, ...TabsProfileManage];

    const tabCorrect = allTabs.find((tab: TabsProfile) => tab.eventKey === tabQuery);

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
              {user?.image ? (
                <>
                  <img className="avatar" src={user?.image} />
                </>
              ) : (
                <img
                  className="avatar"
                  src="https://fastly.picsum.photos/id/271/600/600.jpg?hmac=oQxkoh7h_eeQYZdscWjW2y_uLJ7EAGSSyp5PkehioBk"
                />
              )}
            </Col>

            <Col md={4}>
              <div className="d-flex align-items-center mb-2">
                <IoPerson className="me-2 fs-5" />{" "}
                <div className="fs-5 fw-bold me-2">{user?.name}</div>
              </div>

              <div className="d-flex align-items-center mb-2">
                <IoMailSharp className="me-2 fs-5" />
                <div>{user?.email}</div>
              </div>

              <div className="d-flex align-items-center mb-2">
                <FaPhoneAlt className="me-2 fs-5" />
                <div>
                  {user?.phone ? user?.phone : <span className="fst-italic">Chưa cập nhật</span>}
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="d-flex align-items-center mb-2">
                <FaTransgender className="me-2 fs-5" />
                <div>
                  {user?.gender ? user?.gender : <span className="fst-italic">Chưa cập nhật</span>}
                </div>
              </div>

              <div className="d-flex align-items-center mb-2">
                <TbNumbers className="me-2 fs-5" />
                <div>
                  {user?.age ? user?.age : <span className="fst-italic">Chưa cập nhật</span>}
                </div>
              </div>

              <div className="d-flex align-items-center mb-2">
                <IoCalendarNumber className="me-2 fs-5" />
                <div>
                  {user?.birthDate ? (
                    user?.birthDate
                  ) : (
                    <span className="fst-italic">Chưa cập nhật</span>
                  )}
                </div>
              </div>
            </Col>

            <Col className="d-flex justify-content-center align-items-center">
              {id && id === account.id && (
                <Button variant="secondary" onClick={() => setOpenEdit(!openEdit)}>
                  <MdEditDocument className="fs-5" /> {openEdit ? "Hủy" : "Cập nhật"}
                </Button>
              )}
            </Col>
          </Row>
        )}

        {openEdit && <UpdateProfile callbackSuccess={handleCallBackUpdate} />}
      </div>

      <Tabs
        activeKey={key}
        onSelect={(k) => handleChangeTabs(k as string)}
        className="mb-3 tabs-list"
      >
        {TabsProfile.map((tab: TabsProfile) => (
          <Tab key={tab.eventKey} eventKey={tab.eventKey} title={tab.title}>
            {tab.component}
          </Tab>
        ))}

        {id === account.id &&
          TabsProfileManage.map((tab: TabsProfile) => (
            <Tab key={tab.eventKey} eventKey={tab.eventKey} title={tab.title}>
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
