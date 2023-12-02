import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import PaginationComponent from "../../components/PaginationComponent";
import SkeletonRow from "../../components/SkeletonRow";
import { IFacility } from "../../constants/facility";
import { FacilityService } from "../../datasource/Factility";
import useNotification from "../../hooks/useNotification";
import { useAccountStore } from "../../store/useAccountStore";
import Facility from "./Facility";

const FacilityList = () => {
  const {
    account: { accessToken },
  } = useAccountStore();
  const { handleMessageError } = useNotification();

  const [loading, setLoading] = useState(false);
  const [facilities, setFacilities] = useState<IFacility[]>([]);

  const handleGetAllFacility = async () => {
    try {
      setLoading(true);
      const { data } = await FacilityService.getAllFacility();
      setFacilities(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    handleGetAllFacility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <WrapperFacilityList className="mt-3">
      {accessToken ? (
        <>
          <Row>
            <Col md={4}>
              <Form.Label>Bộ lọc</Form.Label>
            </Col>

            <Col md={8}>
              <Form.Label htmlFor="search">Tìm kiếm</Form.Label>
              <Form.Control type="text" id="search" />
              {/* list facility */}

              {loading ? (
                <>
                  <SkeletonRow className="mt-4 mb-5" />
                  <SkeletonRow className="mb-5" />
                  <SkeletonRow className="mb-5" />
                  <SkeletonRow className="mb-5" />
                  <SkeletonRow className="mb-5" />
                  <SkeletonRow />
                </>
              ) : (
                <div className="mt-4">
                  {facilities.map((fac: IFacility, index: number) => (
                    <Facility key={index} {...fac} />
                  ))}
                </div>
              )}
            </Col>
          </Row>
          <div className="mt-2 mb-5">
            <PaginationComponent
              activePage={1}
              total={123}
              perPage={10}
              onClick={(page: number) => {
                console.log("page: ", page);
              }}
            />
          </div>
        </>
      ) : (
        <>Vui lòng đăng nhập để sử dụng tính năng này</>
      )}
    </WrapperFacilityList>
  );
};

export default FacilityList;

const WrapperFacilityList = styled.div``;
