import vi from "date-fns/locale/vi";
import { useEffect, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
registerLocale("vi", vi);

// import required modules
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { v4 } from "uuid";
import * as yup from "yup";
import LoadingComponent from "../../components/LoadingComponent";
import SkeletonRow from "../../components/SkeletonRow";
import { IFacility } from "../../constants/facility";
import { BookingService } from "../../datasource/Booking";
import { FacilityService } from "../../datasource/Factility";
import useNotification from "../../hooks/useNotification";
import { useAccountStore } from "../../store/useAccountStore";
import { roundToNearestHalfHour } from "../../utils/dateTime";
import { formatCurrency } from "../../utils/number";
import WriteComment from "../../components/WriteComment/WriteComment";

const schema = yup
  .object({
    date: yup.date().required("Trường này bắt buộc nhập"),
  })
  .required();

const defaultValuesForm = {
  date: new Date(),
  startAtTime: roundToNearestHalfHour(new Date()),
  endAtTime: new Date(moment(roundToNearestHalfHour(new Date())).add(90, "minutes").toDate()),
};

const Booking = () => {
  const { setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValuesForm,
  });

  const date = watch("date");

  const {
    account: { accessToken, id: idUser },
  } = useAccountStore();
  const { handleMessageError, messageSuccess } = useNotification();

  const { id } = useParams();
  const navigate = useNavigate();

  const [facility, setFacility] = useState<IFacility>();
  const [loadingFetching, setLoadingFetching] = useState(false);

  const [fieldType, setFieldType] = useState<string | null>("5x5");

  const [prices, setPrices] = useState([]);
  const [loadingGetPrice, setLoadingGetPrice] = useState(false);

  const [fields, setFields] = useState([]);
  const [loadingFetchFields, setLoadingFetchFields] = useState(false);

  const [fieldSelect, setFieldSelect] = useState<any>(null);
  const [priceSelect, setPriceSelect] = useState<any>(null);

  const [loadingCreate, setLoadingCreate] = useState(false);

  const handleSelectFieldType = (value: any) => {
    setFieldType(value.target.value);
    setFieldSelect(null);
    setPriceSelect(null);
    setFields([]);
  };

  const handleClickSwiper = (price: any) => {
    if (priceSelect && price.id === priceSelect.id) {
      return;
    }

    setPriceSelect(price);
    setFieldSelect(null);

    const paramsGetAvailableFields = {
      facilityId: id,
      startAt: price?.startAt,
      endAt: price?.endAt,
      date: moment(date).format("yyyy-MM-DD"),
    };

    handleGetAvailableFields(paramsGetAvailableFields);
  };

  const handleSelectField = (field: any) => {
    console.log("🚀 - handleSelectField - field: ", field);
    setFieldSelect(field);
  };

  const handleGetFacilityById = async (id: string) => {
    try {
      setLoadingFetching(true);

      const { data } = await FacilityService.getFacilityById(id);
      setFacility(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetching(false);
    }
  };

  const handleChangeTime = (dateValue: Date | null, type: "date") => {
    if (!dateValue) {
      return;
    }

    setFieldSelect(null);
    setPriceSelect(null);

    setValue(type, dateValue);
  };

  const handleGetAvailableFields = async (params: any) => {
    try {
      setLoadingFetchFields(true);

      const { data } = await BookingService.getAvailableFields(params);
      const fieldsTmp = data.map((f: any) => ({ ...f, id: v4() }));
      setFields(fieldsTmp);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetchFields(false);
    }
  };

  const handleCreateBooking = async () => {
    try {
      setLoadingCreate(true);
      const params = {
        facilityId: id,
        fieldIndex: fieldSelect?.field?.index,
        startAt: priceSelect?.startAt,
        endAt: priceSelect?.endAt,
        date: moment(date).format("yyyy-MM-DD"),
      };

      const rs = await BookingService.createBooking(params);

      console.log("🚀 - handleCreateBooking - rs: ", rs);

      messageSuccess("Đặt sân thành công");

      navigate(`/profile/${idUser}?tab=my-booking`);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleGetPrice = async (params: any) => {
    try {
      setLoadingGetPrice(true);
      const { data } = await FacilityService.getPrice(params);
      setPrices(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingGetPrice(false);
    }
  };

  const handleAddComment = (params: any) => {};

  useEffect(() => {
    if (!fieldType || !id) {
      return;
    }

    const paramsGetPrice = {
      fieldType: fieldType,
      facilityId: id,
    };

    handleGetPrice(paramsGetPrice);
  }, [fieldType, id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    handleGetFacilityById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!accessToken) {
    return (
      <WrapperBooking className="mt-3">Vui lòng đăng nhập để sử dụng tính năng này</WrapperBooking>
    );
  }

  if (loadingFetching) {
    return (
      <WrapperBooking className="mt-3">
        <SkeletonRow className="mb-5" />
        <SkeletonRow className="mb-5" />
        <SkeletonRow className="mb-5" />
        <SkeletonRow className="mb-5" />
        <SkeletonRow className="mb-5" />
        <SkeletonRow className="" />
      </WrapperBooking>
    );
  }

  return (
    <WrapperBooking className="mt-3">
      {loadingCreate && <LoadingComponent />}

      <h2>{facility?.name}</h2>
      <p>
        {facility?.address.number}, {facility?.address.street}, {facility?.address.ward},{" "}
        {facility?.address.city}
      </p>

      <Link to={`/matching-request?facilityId=${facility?.id}`}>
        <p>Xem danh sách đối trong cơ sở</p>
      </Link>

      <hr />

      <h4>Đặt sân</h4>
      <Row>
        <Col lg={4}>
          <Form.Label>Loại sân</Form.Label>
          <Form.Select onChange={handleSelectFieldType} value={fieldType ? fieldType : ""}>
            <option value="5x5">5x5</option>
            <option value="7x7">7x7</option>
          </Form.Select>
        </Col>

        <Col lg={4}>
          <div>
            <Form.Label>Ngày</Form.Label>
          </div>
          <ReactDatePicker
            selected={date}
            locale="vi"
            dateFormat="dd/MM/yyyy"
            autoComplete="off"
            minDate={new Date()}
            onChange={(date) => {
              handleChangeTime(date, "date");
            }}
          />
        </Col>
      </Row>

      {loadingGetPrice ? (
        <>
          <SkeletonRow className="my-3" />
          <SkeletonRow className="" />
        </>
      ) : (
        <>
          <Form.Label className="mt-3">Chọn sân </Form.Label>

          {prices.length === 0 ? (
            <p>Không có sân nào trong khoảng thời gian này</p>
          ) : (
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="facility-swiper"
            >
              {prices.map((price: any, index: number) => (
                <SwiperSlide
                  className={`${price.id === priceSelect?.id ? "active" : ""}`}
                  key={index}
                  onClick={() => handleClickSwiper(price)}
                >
                  {/* <img src={field.image} className="img-swiper" alt="san bong" /> */}
                  <div>
                    <strong>#{index + 1}</strong>
                  </div>
                  <div>Giá: {formatCurrency(price?.amount)}</div>
                  <div>Giá đặc biệt: {formatCurrency(price?.specialAmount)}</div>
                  <div>
                    Thời gian: {price?.startAt?.hour}:
                    {price?.startAt?.minute === 0 ? "00" : price?.startAt?.minute} -{" "}
                    {price?.endAt?.hour}:{price?.endAt?.minute === 0 ? "00" : price?.endAt?.minute}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </>
      )}

      {loadingFetchFields ? (
        <>
          <SkeletonRow className="mt-3" />
        </>
      ) : (
        <>
          <div className="mt-3">
            <Form.Label>Slot</Form.Label>
          </div>

          <div className="container-time">
            {fields
              .filter((f: any) => f?.field?.type === fieldType)
              .map((field: any, index: number) => (
                <div
                  className={`time-block ${field?.id === fieldSelect?.id && "time-block__active"}`}
                  key={index}
                  onClick={() => handleSelectField(field)}
                >
                  <div>Số: {field?.field?.index}</div>
                  <div>{formatCurrency(field?.amount)}</div>
                </div>
              ))}
          </div>
        </>
      )}

      <div className="container-select">
        <Form.Label>Thông tin sân đã chọn</Form.Label>

        {fieldSelect ? (
          <div>
            <div>
              <div>
                <strong>Cơ sở: </strong>
                {facility?.name}
              </div>
              <div>
                <strong>Địa chỉ: </strong>
                {facility?.address.number}, {facility?.address.street}, {facility?.address.ward},{" "}
                {facility?.address.city}
              </div>
              <div>
                <strong>Thời gian: </strong> {priceSelect?.startAt?.hour}:
                {priceSelect?.startAt?.minute} -{priceSelect?.endAt?.hour}:
                {priceSelect?.endAt?.minute}, Ngày {moment(date).format("DD/MM/yyyy")}
              </div>
              <div>
                <strong>Số: </strong>
                {fieldSelect?.field?.index}
              </div>
              <div>
                <strong>Loại sân: </strong>
                {fieldSelect?.field?.type}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">Chọn sân muốn đặt</div>
        )}

        <div className="text-center">
          <Button
            variant="success"
            className="mt-2"
            disabled={!fieldSelect}
            onClick={handleCreateBooking}
          >
            Xác nhận đặt sân
          </Button>
        </div>
      </div>

      <div className="my-5">
        <div>
          <Form.Label>Đánh giá: </Form.Label> {facility?.rating}
        </div>
        <Form.Label>Bình luận:</Form.Label>

        {facility?.comments?.map((comment: any, index: number) => (
          <div className="facility-comment" key={index}>
            <div>Một người dùng đã đánh giá {comment?.rating} sao</div>
            <div className="facility-comment__body">{comment?.body}</div>
          </div>
        ))}
      </div>

      {id && (
        <WriteComment
          targetId={id}
          targetType="facility"
          callback={() => handleGetFacilityById(id)}
        />
      )}
    </WrapperBooking>
  );
};

export default Booking;

const WrapperBooking = styled.div`
  .facility-swiper {
    height: 200px;

    .swiper-button-prev:after,
    .swiper-button-next:after {
      font-size: 30px;
    }
  }

  .swiper-slide {
    background: #f8f8f8;
    border: 1px solid #ececec;
    border-radius: 16px;
    padding: 8px;

    cursor: pointer;

    &:hover {
      border: 1px solid #198754;
    }

    .img-swiper {
      width: 100%;
      height: 150px;
      border-radius: 8px;
    }

    &.active {
      border: 1px solid #198754;
    }
  }

  .swiper {
    z-index: 0;
  }

  .container-select {
    margin-top: 20px;
    border: 1px solid #c3c3c3;
    padding: 8px;
    border-radius: 8px;

    height: 230px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .facility-comment {
    background-color: #f3f3f3;
    padding: 8px;
    margin: 8px 16px;
    border-radius: 8px;

    width: fit-content;

    &__body {
      padding-left: 12px;
    }
  }

  .container-time {
    width: 100%;
    height: 200px;
    background: #f8f8f8;
    border-radius: 8px;
    padding: 8px;

    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;

    .time-block {
      background-color: #fff;
      width: 120px;
      height: 60px;
      padding: 4px 8px;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;

      border: 1px solid #f8f8f8;
      margin: 2px;

      &:hover {
        border: 1px solid #198754;
      }

      &__active {
        border: 1px solid #198754;
      }
    }
  }
`;
