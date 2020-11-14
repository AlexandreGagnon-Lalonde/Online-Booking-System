import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-bootstrap/Modal";
import StyledWrapper from "./CalendarStyles";
import { SERVER_URL } from "../../constant";
import { COLORS } from "../../constant";
import {
  receiveCalendar,
  receiveCalendarError,
  requestCalendar,
} from "../../reducers/action";
import CalendarDisplayCommand from "./CalendarDisplayCommand";
import CalendarModal from "./CalendarModal";

const Calendar = (props) => {
  const calendarState = useSelector((state) => state.calendar);

  const [show, setShow] = React.useState({
    info: "",
    modal: false,
    members: [],
    classSchedule: null,
  });
  const [firstDayOfCalendar, setFirstDayOfCalendar] = React.useState(null);

  const dispatch = useDispatch();

  const { useRef } = React;

  const calendarDisplayRef = useRef();

  const calendarDisplay = calendarState.calendarDisplay;

  const eventFormat = {
    hour: "2-digit",
    minute: "2-digit",
    meridiem: false,
    hour12: false,
  };
  const handleDateChange = (arg) => {
    const firstDayExist = firstDayOfCalendar ? firstDayOfCalendar.toString() : null;
    let calendarFirstDay;

    if (calendarDisplay === 'timeGridWeek') {
      calendarFirstDay = arg.view.activeStart.toString();
    } else {
      calendarFirstDay = arg.view.activeStart.toString();
    }

    const didWeekChange = calendarFirstDay !== firstDayExist;

    if (!firstDayOfCalendar || didWeekChange) {
      if (calendarDisplay === "timeGridWeek") {
        setFirstDayOfCalendar(arg.view.activeStart);
      } else {
        setFirstDayOfCalendar(arg.view.activeStart);
      }
    }
  };
  const handleShow = (eventInfo) => {
    const encryptedDay = Buffer.from(
      eventInfo.el.fcSeg.start.toString().slice(0, 15)
    ).toString("base64");

    const isCalendarArray = Array.isArray(calendarState.calendar);

    const currentDay = isCalendarArray ? calendarState.calendar.find(
      (day) => day._id === encryptedDay
    ) : calendarState.calendar

    const classSchedule = eventInfo.el.innerText.toString().slice(0, 5);

    const currentClassMembers = currentDay ? currentDay[classSchedule] : false;

    setShow({
      info: eventInfo.el.fcSeg,
      modal: true,
      members: currentClassMembers,
      classSchedule,
    });
  };
  const eventArray = [
    {
      title: "Class",
      startTime: "6:00",
      endTime: "7:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Class",
      startTime: "7:00",
      endTime: "8:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Class",
      startTime: "8:00",
      endTime: "9:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Class",
      startTime: "9:00",
      endTime: "10:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Open Gym",
      startTime: "10:00",
      endTime: "12:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Class",
      startTime: "12:00",
      endTime: "13:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Open Gym",
      startTime: "13:00",
      endTime: "16:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Class",
      startTime: "16:00",
      endTime: "17:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Class",
      startTime: "17:00",
      endTime: "18:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Class",
      startTime: "18:00",
      endTime: "19:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Class",
      startTime: "19:00",
      endTime: "20:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Class",
      startTime: "20:00",
      endTime: "21:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    {
      title: "Specialty Class",
      startTime: "8:00",
      endTime: "9:00",
      daysOfWeek: [0, 6],
    },
    {
      title: "Class",
      startTime: "9:00",
      endTime: "10:00",
      daysOfWeek: [0, 6],
    },
    {
      title: "Class",
      startTime: "10:00",
      endTime: "11:00",
      daysOfWeek: [0, 6],
    },
    {
      title: "Class",
      startTime: "11:00",
      endTime: "12:00",
      daysOfWeek: [0, 6],
    },
    {
      title: "Open Gym",
      startTime: "12:00",
      endTime: "15:00",
      daysOfWeek: [0, 6],
    },
  ];

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
