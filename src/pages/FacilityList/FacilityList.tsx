import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import PaginationComponent from "../../components/PaginationComponent";
import SkeletonRow from "../../components/SkeletonRow";
import { IFacility } from "../../constants/facility";
import { FacilityService } from "../../datasource/Factility";
import useNotification from "../../hooks/useNotification";
import { useAccountStore } from "../../store/useAccountStore";
import Facility from "./Facility";
import { DEFAULT_LIMIT } from "../../constants/constants";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

const schema = yup.object({
  name: yup.string(),
  city: yup.string(),
  ward: yup.string(),
});

const initFilter = {
  name: "",
  city: "",
  ward: "",
};

const FacilityList = () => {
  const { register, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      city: "",
      ward: "",
    },
  });

  const {
    account: { accessToken },
  } = useAccountStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const { handleMessageError } = useNotification();

  const [loading, setLoading] = useState(false);
  const [facilities, setFacilities] = useState<IFacility[]>([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleGetAllFacility = async (params: any) => {
    try {
      setLoading(true);

      const {
        data: { data, total },
      } = await FacilityService.getAllFacilityFilter(params);
      setTotal(total);
      setFacilities(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params: any) => {
    console.log("🚀 -> handleSearch -> params:", params);
    const searchObj: any = {
      page: 1,
    };

    for (const key in params) {
      const value = params[key];
      if (value !== null && value !== undefined) {
        if (typeof value === "string" && value.trim() !== "") {
          searchObj[key] = value;
        }

        if (typeof value !== "string") {
          searchObj[key] = value;
        }
      }
    }

    // const parsed = queryString.parse(location.search);
    // setSearchParams({ ...parsed, ...searchObj });
    setSearchParams(searchObj);
  };

  const handleSetQuery = (key: "page", value: any) => {
    const parsed = queryString.parse(location.search);

    setSearchParams({ ...parsed, [key]: value.toString() });
  };

  const handleResetFilter = () => {
    // reset({ ...initFilter });
    setSearchParams({ page: "1" });
  };

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const pageSearch = searchParams.get("page");

    if (!pageSearch || !Number.isInteger(Number(pageSearch))) {
      setSearchParams({ page: "1" });
      setPage(1);
      return;
    }

    setPage(Number(pageSearch));

    const parsed = queryString.parse(location.search);

    setValue("name", parsed?.name ? parsed?.name.toString() : "");
    setValue("city", parsed.city ? parsed?.city.toString() : "");
    setValue("ward", parsed.ward ? parsed?.ward.toString() : "");

    delete parsed.page;

    const params = {
      ...parsed,
      limit: DEFAULT_LIMIT,
      skip: (Number(pageSearch) - 1) * DEFAULT_LIMIT,
    };

    handleGetAllFacility(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, searchParams]);

  if (!accessToken) {
    return (
      <WrapperFacilityList className="mt-3">
        Vui lòng đăng nhập để sử dụng tính năng này
      </WrapperFacilityList>
    );
  }

  return (
    <WrapperFacilityList className="mt-3">
      <Row>
        <Col md={4}>
          <Form.Label htmlFor="search" className="">
            Tên sân
          </Form.Label>
          <Form.Control type="text" id="search" {...register("name")} />

          <Form.Label htmlFor="city" className="mt-2">
            Thành phố
          </Form.Label>
          <Form.Control type="text" id="city" {...register("city")} />

          <Form.Label htmlFor="ward" className="mt-2">
            Phường
          </Form.Label>
          <Form.Control type="text" id="ward" {...register("ward")} />

          <div className="mt-4 d-flex justify-content-around">
            <Button size="sm" type="reset" variant="secondary" onClick={handleResetFilter}>
              Đặt lại
            </Button>

            <Button size="sm" variant="success" onClick={handleSubmit(handleSearch)}>
              Tìm kiếm
            </Button>
          </div>
        </Col>

        <Col md={8}>
          <Form.Label htmlFor="search">Có {total} kết quả</Form.Label>
          {/* list facility */}

          {loading ? (
            <>
              <SkeletonRow className=" mb-5" />
              <SkeletonRow className="mb-5" />
              <SkeletonRow className="mb-5" />
              <SkeletonRow className="mb-5" />
              <SkeletonRow className="mb-5" />
              <SkeletonRow />
            </>
          ) : (
            <div className="">
              {facilities.map((fac: IFacility, index: number) => (
                <Facility key={index} {...fac} />
              ))}
            </div>
          )}
        </Col>
      </Row>
      <div className="mt-2 mb-5">
        <PaginationComponent
          activePage={page}
          total={total}
          perPage={DEFAULT_LIMIT}
          onClick={(page: number) => {
            handleSetQuery("page", page);
          }}
        />
      </div>
    </WrapperFacilityList>
  );
};

export default FacilityList;

const WrapperFacilityList = styled.div``;
