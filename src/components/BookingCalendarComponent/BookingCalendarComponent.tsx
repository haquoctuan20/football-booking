import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { definitionDate } from "./contants";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { BookingService } from "../../datasource/Booking";
import useNotification from "../../hooks/useNotification";
import LoadingComponent from "../LoadingComponent";

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

const BookingCalendarComponent = () => {
  const { id } = useParams();
  const { handleMessageError } = useNotification();

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.WEEK);
  const [events, setEvents] = useState([]);

  const [loadingFetch, setLoadingFetch] = useState(false);

  const onNavigate = useCallback(
    (newDate: any) => {
      console.log("🚀 -> onNavigate -> newDate:", newDate);

      return setDate(newDate);
    },
    [setDate]
  );
  const onView = useCallback((newView: any) => setView(newView), [setView]);

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
              <div>{booking.userName}</div>
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

  useEffect(() => {
    if (!id) return;

    handleGetBookingOfFacility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <BookingCalendarComponentWrapper className="my-3">
      {loadingFetch && <LoadingComponent />}

      <Calendar
        localizer={localizer}
        style={{ height: 800 }}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
        views={[Views.WEEK]}
        events={events}
        step={30}
        timeslots={1}
        messages={lang}
      />
    </BookingCalendarComponentWrapper>
  );
};

export default BookingCalendarComponent;

const BookingCalendarComponentWrapper = styled.div`
  .rbc-row-content {
    z-index: 0;
  }
`;
