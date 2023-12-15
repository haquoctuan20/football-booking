import { useEffect, useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiFootballFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NotificationService } from "../datasource/Notification";
import useNotification from "../hooks/useNotification";
import { useNotificationStore } from "../store/useNotificationStore";
import SkeletonRow from "./SkeletonRow";

const NotificationDropdown = () => {
  const { handleMessageError } = useNotification();
  const { resetCount, count, decreaseCount } = useNotificationStore();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [notifications, setNotifications] = useState<any>([]);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };

  const handleGetAllNotification = async () => {
    try {
      setLoadingFetch(true);
      const { data } = await NotificationService.getAllNotification();
      setNotifications(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetch(false);
    }
  };

  const handleReadAll = async () => {
    try {
      setLoadingFetch(true);
      await NotificationService.readAllNotification();
      resetCount();
      handleGetAllNotification();
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetch(false);
    }
  };

  const handleReadNotification = async (noti: any) => {
    try {
      if (noti.type === "BOOKING") {
        navigate(`/profile/${noti.fromUserId}?tab=team`);
      }

      await NotificationService.readOneNotification(noti.id);
      decreaseCount();
    } catch (error) {
      handleMessageError(error);
    }
  };

  useEffect(() => {
    if (!show) {
      return;
    }
    handleGetAllNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <WrapperNotificationDropdown>
      <div className="cursor-pointer" onClick={handleToggle}>
        <FaBell className="fs-5" />
        {count > 0 && <Badge bg="danger">{count}</Badge>}
      </div>
      <Dropdown show={show}>
        <Dropdown.Menu align={"end"} className="px-2">
          <div className="d-flex justify-content-between mb-1 header-wrapper-noti">
            <div className="fw-bold">Thông báo</div>

            <div className="cursor-pointer btn-read-all" onClick={handleReadAll}>
              <IoCheckmarkDoneSharp /> Đánh dấu đã đọc tất cả
            </div>
          </div>

          {loadingFetch ? (
            <>
              <SkeletonRow className="my-2" />
            </>
          ) : (
            <div className="list-noti">
              {notifications.map((noti: any, index: number) => (
                <div
                  className={noti.isRead ? "noti" : "noti unread"}
                  key={index}
                  onClick={() => handleReadNotification(noti)}
                >
                  <div className="pe-2">
                    <RiFootballFill className="" />
                  </div>
                  <div>{noti?.message}</div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center footer-wrapper-noti">
            <Link to={"/notifications"} onClick={handleToggle}>
              Xem tất cả
            </Link>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </WrapperNotificationDropdown>
  );
};

export default NotificationDropdown;

const WrapperNotificationDropdown = styled.div`
  margin-right: 4px;

  .dropdown-menu {
    width: 400px;
    transform: translate(-120px, 10px);
  }

  .list-noti {
    max-height: 400px;
    overflow: auto;
  }

  .noti {
    cursor: pointer;
    height: 60px;
    border-radius: 8px;
    padding: 4px;
    display: flex;
    align-items: flex-start;
    margin-bottom: 2px;

    &:hover {
      background-color: #f1f1f1;
    }
  }

  .unread {
    background-color: #ccffe0;
  }

  .btn-read-all {
    &:hover {
      color: #198754;
    }
  }

  .header-wrapper-noti {
    border-bottom: 1px solid #ccc;
  }

  .footer-wrapper-noti {
    border-top: 1px solid #ccc;
  }
`;
