import { useEffect, useState } from "react";
import styled from "styled-components";
import { NotificationService } from "../../datasource/Notification";
import CardNotification from "./CardNotification";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any>([]);

  const handleGetAllNotification = async () => {
    try {
      const { data } = await NotificationService.getAllNotification();
      setNotifications(data);
    } catch (error) {
      console.log("🚀 -> handleGetAllNotification -> error:", error);
    }
  };

  useEffect(() => {
    handleGetAllNotification();
  }, []);

  return (
    <WrapperNotifications>
      {notifications.map((noti: any, index: number) => (
        <CardNotification key={index} data={noti} />
      ))}

      {/* <CardNotification /> */}
    </WrapperNotifications>
  );
};

export default Notifications;

const WrapperNotifications = styled.div`
  margin-top: 12px;
`;
