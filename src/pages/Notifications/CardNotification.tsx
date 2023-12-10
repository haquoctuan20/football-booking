import { Button, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { GiCheckMark } from "react-icons/gi";
import { RiFootballFill } from "react-icons/ri";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import useNotification from "../../hooks/useNotification";
import { NotificationService } from "../../datasource/Notification";
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

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<INotification>(data);

  const { decreaseCount, increaseCount } = useNotificationStore();

  const handleReadNotification = async () => {
    try {
      setLoading(true);
      await NotificationService.readOneNotification(notification.id);
      setNotification({ ...notification, isRead: true });
      decreaseCount();
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNotification(data);
  }, [data]);

  return (
    <WrapperCardNotification>
      <div className="d-flex flex-fill">
        <div className="px-3">
          <RiFootballFill className="fs-2" />
        </div>
        <div className="flex-fill fs-5 d-flex flex-column justify-content-between">
          <div className="fs-5">{notification.message}</div>

          <div className="d-flex justify-content-between align-items-end">
            <div className="time-notification">
              <span>Cho nay thoi gian thong bao</span>

              {notification.isRead && (
                <span style={{ color: "#198754" }}>
                  <IoCheckmarkDoneSharp className="mx-2" />
                  Đã xem
                </span>
              )}
            </div>

            <div>
              <Button size="sm" variant="outline-secondary" onClick={increaseCount}>
                Test thêm thông báo
              </Button>
              <Button size="sm" variant="outline-secondary" onClick={decreaseCount}>
                Test trừ thông báo
              </Button>
              <Button size="sm" variant="outline-secondary">
                action 3
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="action">
        <Button disabled={notification.isRead} variant="light" onClick={handleReadNotification}>
          {loading ? <Spinner animation="border" size="sm" /> : <GiCheckMark />}
        </Button>
      </div>
    </WrapperCardNotification>
  );
};

export default CardNotification;

const WrapperCardNotification = styled.div`
  height: 120px;
  border-bottom: 1px solid #c3c3c3;
  padding: 8px;

  display: flex;
  justify-content: space-between;

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
