import vi from "date-fns/locale/vi";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
registerLocale("vi", vi);

// import required modules
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FACILITIES } from "../../mock/data";

const Booking = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [facilitySelect, setFacilitySelect] = useState<any>(null);

  const handleClickSwiper = (facility: any) => {
    setFacilitySelect(facility);
  };

  return (
    <WrapperBooking className="mt-3">
      <h3>San abc abc</h3>

      <div className="my-1">Chọn ngày: </div>
      <DatePicker
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
        locale="vi"
        dateFormat="dd/MM/yyyy"
        autoComplete="off"
      />

      <div className="mt-3">Chọn sân: </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="facility-swiper"
      >
        {FACILITIES.map((facility: any, index: number) => (
          <SwiperSlide
            className={`${facility.id === facilitySelect.id ? "active" : ""}`}
            key={index}
            onClick={() => handleClickSwiper(facility)}
          >
            <img src={facility.image} className="img-swiper" alt="san bong" />
            <div>{facility.name}</div>
            <div>{facility.address}</div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-3">Chọn giờ: </div>
      <div>Sân: {facilitySelect ? facilitySelect?.name : ""}</div>
    </WrapperBooking>
  );
};

export default Booking;

const WrapperBooking = styled.div`
  .facility-swiper {
    height: 400px;

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
`;
