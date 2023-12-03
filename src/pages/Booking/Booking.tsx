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
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { v4 } from "uuid";
import * as yup from "yup";
import SkeletonRow from "../../components/SkeletonRow";
import { IFacility, IField } from "../../constants/facility";
import { BookingService } from "../../datasource/Booking";
import { FacilityService } from "../../datasource/Factility";
import useNotification from "../../hooks/useNotification";
import { useAccountStore } from "../../store/useAccountStore";
import { roundToNearestHalfHour } from "../../utils/dateTime";
import LoadingComponent from "../../components/LoadingComponent";

const schema = yup
  .object({
    date: yup.date().required("Trường này bắt buộc nhập"),
    startAtTime: yup.date().required("Trường này bắt buộc nhập"),
    endAtTime: yup.date().required("Trường này bắt buộc nhập"),
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
  const startAtTime = watch("startAtTime");
  const endAtTime = watch("endAtTime");

  const {
    account: { accessToken, id: idUser },
  } = useAccountStore();
  const { handleMessageError } = useNotification();

  const { id } = useParams();
  const navigate = useNavigate();

  const [facility, setFacility] = useState<IFacility>();
  const [loadingFetching, setLoadingFetching] = useState(false);

  const [fields, setFields] = useState<IField[]>([]);
  const [loadingFetchFields, setLoadingFetchFields] = useState(false);

  const [fieldSelect, setFieldSelect] = useState<any>(null);

  const [loadingCreate, setLoadingCreate] = useState(false);

  const handleClickSwiper = (facility: any) => {
    if (fieldSelect && facility.id === fieldSelect.id) {
      setFieldSelect(null);
      return;
    }

    setFieldSelect(facility);
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

  const handleChangeTime = (dateValue: Date | null, type: "date" | "startAtTime" | "endAtTime") => {
    if (!dateValue) {
      return;
    }

    // reset field select when change filter
    setFieldSelect(null);

    if (type === "startAtTime") {
      setValue(type, dateValue);
      const endTime = moment(dateValue).add(90, "minutes");
      setValue("endAtTime", moment(endTime).toDate());
      return;
    }

    setValue(type, dateValue);
  };

  const handleGetAvailableFields = async () => {
    try {
      setLoadingFetchFields(true);
      const paramsSearch = {
        facilityId: id,
        startAt: {
          hour: moment(startAtTime).hour(),
          minute: moment(startAtTime).minute(),
        },
        endAt: {
          hour: moment(endAtTime).hour(),
          minute: moment(endAtTime).minute(),
        },
        date: moment(date).format("yyyy-MM-DD"),
      };
      const { data } = await BookingService.getAvailableFields(paramsSearch);

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
        fieldIndex: fieldSelect?.index.toString(),
        startAt: {
          hour: moment(startAtTime).hour(),
          minute: moment(startAtTime).minute(),
        },
        endAt: {
          hour: moment(endAtTime).hour(),
          minute: moment(endAtTime).minute(),
        },
        date: moment(date).format("yyyy-MM-DD"),
      };

      const rs = await BookingService.createBooking(params);
      console.log("🚀 -> handleCreateBooking -> rs:", rs);

      navigate(`/profile/${idUser}?tab=my-booking`);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingCreate(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    handleGetFacilityById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!date || !startAtTime || !endAtTime) return;

    handleGetAvailableFields();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, startAtTime, endAtTime]);

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

      <h3>{facility?.name}</h3>
      <p>
        {facility?.address.number}, {facility?.address.street}, {facility?.address.ward},{" "}
        {facility?.address.city}
      </p>

      <Link to={`/matching-request?facilityId=${facility?.id}`}>
        <p>Xem danh sách đối trong cơ sở</p>
      </Link>

      <Form.Label>Đặt sân:</Form.Label>
      <div className="d-flex justify-content-start align-items-end">
        <div className="me-2">
          <div className="my-1">Ngày: </div>
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
        </div>

        <div className="me-2">
          <div className="my-1">Thời gian bắt đầu: </div>
          <ReactDatePicker
            showTimeSelect
            showTimeSelectOnly
            locale="vi"
            dateFormat="HH:mm"
            autoComplete="off"
            timeCaption="Bắt đầu"
            selected={startAtTime}
            onChange={(date) => {
              handleChangeTime(date, "startAtTime");
            }}
          />
        </div>

        <div className="me-2">
          <div className="my-1">Thời gian kết thúc: </div>
          <ReactDatePicker
            showTimeSelect
            showTimeSelectOnly
            locale="vi"
            dateFormat="HH:mm"
            autoComplete="off"
            timeCaption="Kết thúc"
            selected={endAtTime}
            minTime={startAtTime}
            disabled
            onChange={(date) => {
              handleChangeTime(date, "endAtTime");
            }}
          />
        </div>
      </div>

      {loadingFetchFields ? (
        <>
          <SkeletonRow className="mt-3" />
        </>
      ) : (
        <>
          <Form.Label className="mt-3">Chọn sân: </Form.Label>

          {fields.length === 0 ? (
            <p>Không có sân nào trong khoảng thời gian này</p>
          ) : (
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="facility-swiper"
            >
              {fields.map((field: IField, index: number) => (
                <SwiperSlide
                  className={`${field.id === fieldSelect?.id ? "active" : ""}`}
                  key={index}
                  onClick={() => handleClickSwiper(field)}
                >
                  {/* <img src={field.image} className="img-swiper" alt="san bong" /> */}
                  <div>#: {field.index}</div>
                  <div>Loại sân: {field.type}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
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
                <strong>Thời gian: </strong> {moment(startAtTime).format("HH:mm")} -{" "}
                {moment(endAtTime).format("HH:mm")} ngày {moment(date).format("DD/MM/yyyy")}
              </div>
              <div>
                <strong>Số: </strong>
                {fieldSelect?.index}
              </div>
              <div>
                <strong>Loại sân: </strong>
                {fieldSelect?.type}
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
    text-align: center;
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
`;
