import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, View, Views, momentLocalizer } from "react-big-calendar";
import { definitionDate } from "./contants";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { BookingService } from "../../datasource/Booking";
import useNotification from "../../hooks/useNotification";
import LoadingComponent from "../LoadingComponent";
import { FacilityService } from "../../datasource/Factility";
import { Button } from "react-bootstrap";

moment.locale("fr", definitionDate);
const localizer = momentLocalizer(moment);

const lang = {
  week: "Tuần",
  work_week: "Tuần làm việc",
  day: "Ngày",
  month: "Tháng",
  previous: "Trước",
  next: "Tiếp",
  today: "Hôm ngay",
  agenda: "Chương trình",

  showMore: (total: any) => `+${total} xem thêm`,
};

const getAllDayInWeek = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentDay = today.getDay();

  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - currentDay);

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    daysOfWeek.push(day);
  }

  return daysOfWeek;
};

const getAllDayInMonth = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const numberOfDaysInMonth = lastDayOfMonth.getDate();

  const allDaysInMonth = [];
  for (let day = 1; day <= numberOfDaysInMonth; day++) {
    const currentDate = new Date(currentYear, currentMonth, day);
    allDaysInMonth.push(currentDate);
  }

  return allDaysInMonth;
};

const BookingCalendarComponent = () => {
  const { id } = useParams();
  const { handleMessageError } = useNotification();

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.WEEK);
  const [events, setEvents] = useState<any>([]);

  const [loadingFetch, setLoadingFetch] = useState(false);

  const onNavigate = useCallback(
    (newDate: any) => {
      setDate(newDate);
    },
    [setDate]
  );
  const onView = useCallback((newView: any) => setView(newView), [setView]);

  const onShowMore = (value: any) => {
    setView(Views.DAY);
    setDate(value[0].start);
  };

  const handleGetBookingOfFacility = async () => {
    try {
      setLoadingFetch(true);

      const params = {
        facilityId: id,
      };

      const {
        data: { data },
      } = await BookingService.getBookingOfFacility(params);

      const events = data.map((booking: any) => {
        return {
          id: booking.id,
          title: (
            <div>
              <p>Số: {booking.fieldIndex}</p>

              {booking.userId && (
                <Link style={{ color: "#fff" }} to={`/profile/${booking.userId}?tab=team`}>
                  <strong>{booking?.userName}</strong>
                </Link>
              )}

              <div className="mt-1">
                {booking.id && (
                  <Link
                    target="_blank"
                    style={{ color: "#fff" }}
                    to={`/match-detail/${booking?.id}`}
                  >
                    <strong>Chi tiết</strong>
                  </Link>
                )}
              </div>
            </div>
          ),

          start: moment(new Date(booking.date))
            .add(booking.startAt.hour, "hours")
            .add(booking.startAt.minute, "minutes")
            .toDate(),

          end: moment(new Date(booking.date))
            .add(booking.endAt.hour, "hours")
            .add(booking.endAt.minute, "minutes")
            .toDate(),
        };
      });

      setEvents(events);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetch(false);
    }
  };

  const handleGetSlotOfFacility = async () => {
    if (!id) return;

    try {
      setLoadingFetch(true);

      const params = {
        facilityId: id,
      };

      const {
        data: { data: dataBooking },
      } = await BookingService.getBookingOfFacility(params);

      console.log("🚀 - handleGetSlotOfFacility - dataBooking: ", dataBooking);

      const { data } = await FacilityService.getPriceByFacilityId(id);
      console.log("🚀 - handleGetSlotOfFacility - data: ", data);

      let allDay: any = [];

      if (view === Views.WEEK) {
        allDay = getAllDayInWeek();
      }

      if (view === Views.MONTH) {
        allDay = getAllDayInMonth();
      }

      if (view === Views.DAY) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        allDay = [today];
      }

      const events_all = allDay.map((day: any) => {
        const events_day = data.map((booking: any) => {
          return {
            id: booking.id,
            title: (
              <div className="empty-booking">
                <div>
                  <div>Sân trống</div>
                  <div>Loại: {booking?.fieldType}</div>
                </div>

                <Button variant="outline-success" size="sm">
                  Đặt ngoài
                </Button>
              </div>
            ),
            start: moment(day)
              .add(booking.startAt.hour, "hours")
              .add(booking.startAt.minute, "minutes")
              .toDate(),

            end: moment(day)
              .add(booking.endAt.hour, "hours")
              .add(booking.endAt.minute, "minutes")
              .toDate(),
          };
        });

        return events_day;
      });

      const events_all_flat = events_all.flat();
      setEvents(events_all_flat);

      // const events = data.map((booking: any) => {
      //   const hasBooking = dataBooking.find((b: any) => b.priceId === booking.id);

      //   return {
      //     id: booking.id,
      //     // allDay: booking.date ? false : true,
      //     title: (
      //       <>
      //         {hasBooking && hasBooking.date ? (
      //           <div className="detail-booking">
      //             <div>Số: {hasBooking.fieldIndex}</div>

      //             {hasBooking && hasBooking.userId && (
      //               <div>
      //                 <Link style={{ color: "#000" }} to={`/profile/${hasBooking.userId}?tab=team`}>
      //                   <strong>{hasBooking?.userName}</strong>
      //                 </Link>
      //               </div>
      //             )}

      //             <div>
      //               {hasBooking && hasBooking.id && (
      //                 <Link target="_blank" to={`/match-detail/${hasBooking?.id}`}>
      //                   Chi tiết
      //                 </Link>
      //               )}
      //             </div>
      //           </div>
      //         ) : (
      //           <div className="empty-booking">
      //             <div>Sân trống</div>

      //             <div>
      //               <Button variant="outline-success" size="sm">
      //                 Đặt ngoài
      //               </Button>
      //             </div>
      //           </div>
      //         )}
      //       </>
      //     ),

      //     start: moment(hasBooking && hasBooking.date ? new Date(hasBooking.date) : new Date())
      //       .add(hasBooking ? hasBooking.startAt.hour : booking.startAt.hour, "hours")
      //       .add(hasBooking ? hasBooking.startAt.minute : booking.startAt.minute, "minutes")
      //       .toDate(),

      //     end: moment(hasBooking && hasBooking.date ? new Date(hasBooking.date) : new Date())
      //       .add(hasBooking ? hasBooking.endAt.hour : booking.endAt.hour, "hours")
      //       .add(hasBooking ? hasBooking.endAt.minute : booking.endAt.minute, "minutes")
      //       .toDate(),
      //   };
      // });

      // setEvents(events);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFetch(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    // handleGetBookingOfFacility();
    handleGetSlotOfFacility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, view]);

  return (
    <BookingCalendarComponentWrapper className="my-3">
      {loadingFetch && <LoadingComponent />}

      <Calendar
        localizer={localizer}
        // style={{ height: 800 }}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        events={events}
        step={30}
        timeslots={1}
        messages={lang}
        allDayMaxRows={2}
        dayLayoutAlgorithm="no-overlap"
        drilldownView="agenda"
        showMultiDayTimes
        onShowMore={onShowMore}
        tooltipAccessor={null}
      />
    </BookingCalendarComponentWrapper>
  );
};

export default BookingCalendarComponent;

const BookingCalendarComponentWrapper = styled.div`
  .rbc-row-content {
    z-index: 0;
  }

  .rbc-month-row {
    overflow: unset;
  }

  .rbc-event {
    background-color: #cfffd0;
    color: #000;
    border: 1px solid #8fadc7;
  }

  .detail-booking {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .empty-booking {
    width: 100%;
    height: 100%;
    /* background-color: #fff; */
    color: #000;
    padding: 2px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;
