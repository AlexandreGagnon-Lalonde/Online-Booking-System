import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-bootstrap/Modal";
import { SERVER_URL } from "../../constant";

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

  const handleShow = (eventInfo) => {
    const encryptedDay = Buffer.from(
      eventInfo.el.fcSeg.start.toString().slice(0, 15)
    ).toString("base64");

    const currentDay = calendarState.calendar.find(
      (day) => day._id === encryptedDay
    );

    const classSchedule = eventInfo.el.innerText.toString().slice(0, 5);

    const currentClassMembers = currentDay ? currentDay[classSchedule] : false;

    setShow({
      info: eventInfo.el.fcSeg,
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

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={calendarDisplay}
        ref={calendarDisplayRef}
        slotMinTime={"05:00:00"}
        slotMaxTime={"22:00:00"}
        slotDuration={"1:00"}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
        firstDay={1}
        contentHeight={800}
        expandRows={true}
        eventClick={handleShow}
        datesSet={(arg) => {
          if (!firstDayOfCalendar) {
            if (calendarDisplay === "timeGridWeek") {
              setFirstDayOfCalendar(arg.view.activeStart);
            } else {
              setFirstDayOfCalendar(arg.view.activeEnd);
            }
          }
        }}
        events={[
          {
            title: "class",
            startTime: "6:00",
            endTime: "7:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "class",
            startTime: "7:00",
            endTime: "8:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "class",
            startTime: "8:00",
            endTime: "9:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "class",
            startTime: "9:00",
            endTime: "10:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "open",
            startTime: "10:00",
            endTime: "12:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "class",
            startTime: "12:00",
            endTime: "13:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "open",
            startTime: "13:00",
            endTime: "16:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "class",
            startTime: "16:00",
            endTime: "17:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "class",
            startTime: "17:00",
            endTime: "18:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "class",
            startTime: "18:00",
            endTime: "19:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "class",
            startTime: "19:00",
            endTime: "20:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "class",
            startTime: "20:00",
            endTime: "21:00",
            daysOfWeek: [1, 2, 3, 4, 5],
          },
          {
            title: "specialty",
            startTime: "8:00",
            endTime: "9:00",
            daysOfWeek: [0, 6],
          },
          {
            title: "class",
            startTime: "9:00",
            endTime: "10:00",
            daysOfWeek: [0, 6],
          },
          {
            title: "class",
            startTime: "10:00",
            endTime: "11:00",
            daysOfWeek: [0, 6],
          },
          {
            title: "class",
            startTime: "11:00",
            endTime: "12:00",
            daysOfWeek: [0, 6],
          },
          {
            title: "open",
            startTime: "12:00",
            endTime: "15:00",
            daysOfWeek: [0, 6],
          },
        ]}
      />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  margin: 50px;
  border: 1px solid red;
`;

export default Calendar;
