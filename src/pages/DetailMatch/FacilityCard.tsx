import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkeletonRow from "../../components/SkeletonRow";
import { IFacility } from "../../constants/facility";
import { FacilityService } from "../../datasource/Factility";
import useNotification from "../../hooks/useNotification";

interface FacilityCardProps {
  facilityId: null | string;
}

const FacilityCard = ({ facilityId }: FacilityCardProps) => {
  const { handleMessageError } = useNotification();

  const [loading, setLoading] = useState(false);
  const [facility, setFacility] = useState<IFacility>();

  const handleGetAllFacility = async () => {
    try {
      setLoading(true);

      if (!facilityId) {
        return;
      }

      const { data } = await FacilityService.getFacilityById(facilityId);
      setFacility(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!facilityId) {
      return;
    }

    handleGetAllFacility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilityId]);

  if (!facilityId) {
    return <></>;
  }

  return (
    <div className="h-100 border rounded p-2">
      <h5 className="text-center">
        <strong>Cơ sở</strong>
      </h5>

      {loading ? (
        <>
          <SkeletonRow />
        </>
      ) : (
        <>
          <h6>{facility?.name}</h6>

          <div>
            <strong>Địa chỉ: </strong>
            <span>
              {facility?.address.number}, {facility?.address.street}, {facility?.address.ward},{" "}
              {facility?.address.city}
            </span>
          </div>

          <div>
            <strong>Số sân: </strong> {facility?.numOfFields}
          </div>

          <div>
            {facility?.rating ? (
              <div>
                <strong>Đánh giá: </strong> {facility?.rating}
                <span
                  style={{
                    fontSize: 16,
                    color: "gold",
                  }}
                >
                  &#9733; {/* Dấu sao Unicode */}
                </span>
              </div>
            ) : (
              <>
                <strong>Đánh giá: </strong>
                <span>Chưa có đánh giá</span>
              </>
            )}
          </div>

          <div className="mt-4 d-flex flex-column align-items-start">
            <Link to={`/profile/${facility?.ownerId}?tab=team`} className="d-block">
              Chủ sân
            </Link>

            <Link to={`/booking/${facility?.id}`} className="d-block">
              Xem sân | Đặt sân
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FacilityCard;
