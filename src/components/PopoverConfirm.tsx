import { useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

interface PopoverConfirmProps {
  children: JSX.Element;
  idPopover?: string;
  heading?: string;
  content: string;
  callbackConfirm?: () => void;

  cancelText?: string;
  okText?: string;
}

const PopoverConfirm = (props: PopoverConfirmProps) => {
  const {
    children,
    idPopover,
    heading = "Xác nhận",
    content,
    cancelText = "Trở lại",
    okText = "Đồng ý",
    callbackConfirm,
  } = props;

  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    setShow(false);

    if (callbackConfirm) {
      callbackConfirm();
    }
  };

  return (
    <OverlayTrigger
      trigger="click"
      key={"top"}
      placement={"top"}
      show={show}
      overlay={
        <Popover
          style={{ zIndex: 0 }}
          id={`popover-positioned-${uuidv4()}-${idPopover ? idPopover : ""}`}
        >
          <Popover.Header as="h3" className="px-2 py-1">
            {heading}
          </Popover.Header>

          <Popover.Body className="p-2">
            {content}

            <div className="d-flex justify-content-end mt-2">
              <Button
                size="sm"
                onClick={() => {
                  setShow(false);
                }}
                variant="secondary"
              >
                {cancelText}
              </Button>

              <Button
                size="sm"
                className="ms-1"
                variant="success"
                onClick={handleConfirm}
              >
                {okText}
              </Button>
            </div>
          </Popover.Body>
        </Popover>
      }
      onToggle={(nextShow: boolean) => {
        setShow(nextShow);
      }}
    >
      {children}
    </OverlayTrigger>
  );
};

export default PopoverConfirm;
