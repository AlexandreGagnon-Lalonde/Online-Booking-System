import React from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import StyledWrapper from "./CalendarStyles";
import CalendarDisplayCommand from "./CalendarDisplayCommand";
import CalendarModal from "./CalendarModal";
import { SERVER_URL, COLORS, eventArray, eventFormat } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import {
  receiveCalendar,
  receiveCalendarError,
  requestCalendar,
} from "../../reducers/action";

const Calendar = (props) => {
  const calendarState = useSelector((state) => state.calendar);

  const [show, setShow] = React.useState({
    info: "",
    modal: false,
    members: [],
    classSchedule: null,
  });
  const [firstDayOfCalendar, setFirstDayOfCalendar] = React.useState(null);

  const { useRef } = React;
  const calendarDisplayRef = useRef();
  const dispatch = useDispatch();

  const calendarDisplay = calendarState.calendarDisplay;
  const calendarData = calendarState.calendar;

  const handleDateChange = (arg) => {
    const firstDayExist = firstDayOfCalendar
      ? firstDayOfCalendar.toString()
      : null;

    const calendarViewStart = arg.view.activeStart;

    let calendarFirstDay;

    if (calendarDisplay === "timeGridWeek") {
      calendarFirstDay = calendarViewStart.toString();
    } else {
      calendarFirstDay = calendarViewStart.toString();
    }

    const didWeekChange = calendarFirstDay !== firstDayExist;

    if (!firstDayOfCalendar || didWeekChange) {
      if (calendarDisplay === "timeGridWeek") {
        setFirstDayOfCalendar(calendarViewStart);
      } else {
        setFirstDayOfCalendar(calendarViewStart);
      }
    }
  };

  const handleShow = (eventInfo) => {
    const encryptedDay = Buffer.from(
      eventInfo.el.fcSeg.start.toString().slice(0, 15)
    ).toString("base64");

    const dayInfo = eventInfo.el.fcSeg;

    const isCalendarArray = Array.isArray(calendarData);

    const currentDay = isCalendarArray
      ? calendarData.find((day) => day._id === encryptedDay)
      : calendarData;

    const classSchedule = eventInfo.el.innerText.toString().slice(0, 5);

    const currentClassMembers = currentDay ? currentDay[classSchedule] : [];

    setShow({
      info: dayInfo,
      modal: true,
      members: currentClassMembers,
      classSchedule,
    });
  };

  React.useEffect(() => {
    calendarDisplayRef.current.getApi().changeView(calendarDisplay);

    if (firstDayOfCalendar) {
      dispatch(requestCalendar());

      fetch(
        SERVER_URL + `/api/getcalendar/${calendarDisplay}/${firstDayOfCalendar}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveCalendar(data.calendar));
        })
        .catch((err) => {
          dispatch(receiveCalendarError());
        });
    }
  }, [calendarDisplay, firstDayOfCalendar, show]);

  return (
    <StyledDiv>
      <CalendarDisplayCommand
        setFirstDayOfCalendar={setFirstDayOfCalendar}
        calendarDisplay={calendarDisplay}
      />

      <CalendarModal show={show} setShow={setShow} />

      <StyledWrapper>
        <FullCalendar
          // some plugins to make the calendar work
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          // view of calendar (week vs day)
          initialView={calendarDisplay}
          ref={calendarDisplayRef}
          // day start
          slotMinTime={"05:00:00"}
          // day end
          slotMaxTime={"22:00:00"}
          // duration of slots
          slotDuration={"1:00"}
          // tiem format for events
          eventTimeFormat={eventFormat}
          // firstDay is monday
          firstDay={1}
          // height of calendar
          contentHeight={800}
          // expand events to fill the calendar
          expandRows={true}
          // toolbar, remove dates, add prev and next button
          headerToolbar={{ start: "", center: "", end: "today prev,next" }}
          // remove all day events section
          allDaySlot={false}
          // handle when an event is clicked
          eventClick={handleShow}
          // handle when dates change from arrow
          datesSet={handleDateChange}
          // event array
          events={eventArray}
        />
      </StyledWrapper>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  margin: 25px;
  padding 10px;
  background-color: ${COLORS.mediumGray};
  flex: 2;
  border-radius: 5px;
  position: relative;
`;

export default Calendar;
