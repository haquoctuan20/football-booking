import styled from "styled-components";
import { IComment } from "../../constants/facility";

interface CommentsViewProps {
  data: IComment;
}

const CommentsView = ({ data: { body, rating } }: CommentsViewProps) => {
  return (
    <WrapperCommentsView>
      <div className="d-flex justify-content-between align-items-center">
        <div className="fs-6 fw-bold">Người dùng</div>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: "pointer",
                fontSize: 26,
                color: star <= rating ? "gold" : "gray",
              }}
            >
              &#9733; {/* Dấu sao Unicode */}
            </span>
          ))}
        </div>
      </div>

      <div>{body}</div>
    </WrapperCommentsView>
  );
};

export default CommentsView;

const WrapperCommentsView = styled.div`
  padding: 8px;
  background-color: #f3f3f3;
  border-radius: 4px;
  margin: 6px 0px;
`;
