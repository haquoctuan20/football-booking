import { useState } from "react";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useNotification from "../../hooks/useNotification";
import { BookingService } from "../../datasource/Booking";

const schema = yup
  .object({
    body: yup.string().required("Bạn chưa để lại đánh giá").trim(),
  })
  .required();

interface WriteCommentProps {
  targetId: string;
  targetType: "user" | "facility";
  callback?: (param?: any) => void;
}

const WriteComment = ({ targetId, targetType, callback }: WriteCommentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { handleMessageError, messageSuccess } = useNotification();

  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSendComment = async (data: any) => {
    try {
      setLoading(true);

      const params = {
        targetId,
        targetType,
        rating,
        body: data.body,
      };

      const { data: dataRs } = await BookingService.sendComment(params);

      if (callback) {
        callback();
      }

      messageSuccess("Đã gửi bình luận");
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <WrapperWriteComment>
      <div className="fs-5 mb-1">Bình luận</div>

      <FloatingLabel label="Chia sẻ trải nghiệm của bạn">
        <Form.Control {...register("body")} as="textarea" style={{ height: "100px" }} />
        <p className="form-error">{errors.body?.message}</p>
      </FloatingLabel>

      <div className="d-flex justify-content-between my-2">
        <div>
          <span className="fs-6">Đánh giá: </span>

          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              style={{
                cursor: "pointer",
                fontSize: 30,
                color: star <= rating ? "gold" : "gray",
              }}
            >
              &#9733; {/* Dấu sao Unicode */}
            </span>
          ))}
        </div>
        <Button
          disabled={loading}
          size="sm"
          variant="success"
          onClick={handleSubmit(handleSendComment)}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Đang gửi
            </>
          ) : (
            "Gửi đánh giá"
          )}
        </Button>
      </div>
    </WrapperWriteComment>
  );
};

export default WriteComment;

const WrapperWriteComment = styled.div`
  margin-bottom: 50px;
`;
