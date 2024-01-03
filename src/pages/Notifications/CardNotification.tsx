import { useEffect, useState } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiFootballFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NotificationService } from "../../datasource/Notification";
import useNotification from "../../hooks/useNotification";
import { useNotificationStore } from "../../store/useNotificationStore";

export interface INotification {
  detailId: string;
  fromUserId: string;
  id: string;
  isRead: boolean;
  message: string;
  timeStamp: null | string;
  toUserId: string;
  type: string;
}

interface CardNotificationProps {
  data: INotification;
}

const CardNotification = ({ data }: CardNotificationProps) => {
  const { handleMessageError } = useNotification();
  const navigate = useNavigate();

  const [notification, setNotification] = useState<INotification>(data);

  const { decreaseNotification } = useNotificationStore();

  const handleReadNotification = async () => {
    try {
      await NotificationService.readOneNotification(notification.id);
      setNotification({ ...notification, isRead: true });
      decreaseNotification(data);

      handleNavigate();
    } catch (error) {
      handleMessageError(error);
    }
  };

  const handleNavigate = () => {
    if (data.type === "BOOKING") {
      navigate(`/profile/${data.fromUserId}?tab=team`);
    }
  };

  useEffect(() => {
    setNotification(data);
  }, [data]);

  return (
    <WrapperCardNotification
      className={`${notification.isRead ? "" : "unread"}`}
      onClick={handleReadNotification}
    >
      <div className="d-flex flex-fill">
        <div className="px-3">
          <RiFootballFill className="fs-2" />
        </div>
        <div className="flex-fill fs-5 d-flex flex-column justify-content-between">
          <div className="fs-5">{notification.message}</div>

          <div className="d-flex justify-content-between align-items-end">
            <div className="time-notification">
              {/* <span>Cho nay thoi gian thong bao</span> */}

              {notification.isRead && (
                <span style={{ color: "#198754" }}>
                  <IoCheckmarkDoneSharp className="mx-2" />
                  Đã xem
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="action">
        <Button disabled={notification.isRead} variant="light" onClick={handleReadNotification}>
          {loading ? <Spinner animation="border" size="sm" /> : <GiCheckMark />}
        </Button>
      </div> */}
    </WrapperCardNotification>
  );
};

export default CardNotification;

const WrapperCardNotification = styled.div`
  height: 120px;
  border-bottom: 1px solid #c3c3c3;
  padding: 8px;
  margin-bottom: 4px;
  cursor: pointer;

  display: flex;
  justify-content: space-between;

  &.unread {
    background-color: #dcfae9ac;
  }

  &:hover {
    background-color: #ececec;
  }

  .action {
    width: 100px;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #198754;
    }
  }

  .time-notification {
    font-size: 14px;
  }
`;
