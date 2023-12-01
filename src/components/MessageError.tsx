import styled from "styled-components";

interface MessageErrorProps {
  msg: string | undefined | null;
  className?: string;
}

const MessageError = ({ msg, className = "" }: MessageErrorProps) => {
  return (
    <WrapperMessageError className={className}>
      {msg ? msg : ""}
    </WrapperMessageError>
  );
};

export default MessageError;

const WrapperMessageError = styled.div`
  color: red;
`;
