import { useEffect, useState } from "react";
import styled from "styled-components";
import { NotificationService } from "../../datasource/Notification";
import CardNotification from "./CardNotification";
import useNotification from "../../hooks/useNotification";
import SkeletonRow from "../../components/SkeletonRow";
import { Button } from "react-bootstrap";
import LoadingComponent from "../../components/LoadingComponent";
import { useNotificationStore } from "../../store/useNotificationStore";

const Notifications = () => {
  const { handleMessageError } = useNotification();
  const { resetCount } = useNotificationStore();

  const [notifications, setNotifications] = useState<any>([]);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingReadAll, setLoadingReadAll] = useState(false);

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
      setLoadingReadAll(true);
      await NotificationService.readAllNotification();
      resetCount();
      handleGetAllNotification();
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingReadAll(false);
    }
  };

  useEffect(() => {
    handleGetAllNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperNotifications>
      {loadingReadAll && <LoadingComponent />}

      <div className="text-end mb-2">
        <Button size="sm" variant="outline-secondary" onClick={handleReadAll}>
          Đánh dấu đã đọc tất cả
        </Button>
      </div>

      {loadingFetch ? (
        <>
          <SkeletonRow className="my-2" />
          <SkeletonRow className="my-5" />
          <SkeletonRow className="my-5" />
        </>
      ) : (
        <>
          {notifications.map((noti: any, index: number) => (
            <CardNotification key={index} data={noti} />
          ))}
        </>
      )}
    </WrapperNotifications>
  );
};

export default Notifications;

const WrapperNotifications = styled.div`
  margin-top: 20px;
`;
