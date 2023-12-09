import { useEffect } from "react";
import { useAccountStore } from "../store/useAccountStore";
import { Button } from "react-bootstrap";
import { ToastOptions, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoFootball } from "react-icons/io5";

const configNotification: ToastOptions = {
  position: "top-right",
  autoClose: 15000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const WsNotification = () => {
  const { account } = useAccountStore();
  const navigate = useNavigate();

  const handelOnMessageCMD10 = (message: any) => {
    toast(
      <>
        <div className="d-flex">
          <div className="pe-2">
            <IoFootball className="fs-4" />
          </div>

          <div className="flex-fill">
            <div className="fs-6" style={{ color: "black" }}>
              {message?.message}
            </div>

            <div className="mt-3 text-end">
              <Button
                onClick={() => {
                  navigate("/notification");
                }}
                variant="light"
                size="sm"
              >
                Xem thêm
              </Button>
            </div>
          </div>
        </div>
      </>,
      configNotification
    );
  };

  useEffect(() => {
    const ws = new WebSocket(
      `${import.meta.env.VITE_BASE_URL_WS}/ws-endpoint?access_token=${account.accessToken}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.cmd) {
        case 10:
          handelOnMessageCMD10(message.params);
          break;

        default:
          console.log("Message ws");
          break;
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.accessToken, account.id]);

  if (account.id === "" || !account.accessToken) {
    return;
  }

  return <></>;
};

export default WsNotification;
