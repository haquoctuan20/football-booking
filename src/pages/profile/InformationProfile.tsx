import { useParams } from "react-router-dom";
import WriteComment from "../../components/WriteComment/WriteComment";
import { useAccountStore } from "../../store/useAccountStore";
import { useEffect, useState } from "react";
import { IComment } from "../../constants/facility";
import { UserService } from "../../datasource/User";
import useNotification from "../../hooks/useNotification";
import SkeletonRow from "../../components/SkeletonRow";
import CommentsView from "../../components/WriteComment/CommentsView";
import { Form } from "react-bootstrap";

const InformationProfile = () => {
  const { id } = useParams();
  const { account } = useAccountStore();
  const { handleMessageError } = useNotification();

  const [loadingFetchUser, setLoadingFetchUser] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [rate, setRate] = useState(null);

  const handleGetInforUser = async (id: string) => {
    try {
      setLoadingFetchUser(true);
      const { data } = await UserService.getInfoUserById(id);
      if (data.comments) {
        setComments(data.comments);
        setRate(data.rating);
      }
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetchUser(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    handleGetInforUser(id);
  }, [id]);

  return (
    <div>
      {loadingFetchUser ? (
        <>
          <SkeletonRow className="my-2" />
          <SkeletonRow className="my-5" />
        </>
      ) : (
        <>
          <div>Thông tin</div>
          <br />

          <div>Thông tin đội bóng</div>
          <br />

          <div>
            <Form.Label>Đánh giá: </Form.Label>{" "}
            {rate && (
              <>
                <span>{rate}</span>
                <span
                  style={{
                    fontSize: 26,
                    color: "gold",
                  }}
                >
                  &#9733; {/* Dấu sao Unicode */}
                </span>
              </>
            )}
          </div>

          <div>
            {comments.length === 0 && <>Chưa có đánh giá nào</>}

            {comments.map((c: IComment, index: number) => (
              <CommentsView key={index} data={c} />
            ))}
          </div>

          {id && id !== account.id && (
            <WriteComment targetId={id} targetType="user" callback={() => handleGetInforUser(id)} />
          )}
        </>
      )}
    </div>
  );
};

export default InformationProfile;
