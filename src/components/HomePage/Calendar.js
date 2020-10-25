import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const currentUser = useSelector((state) => state.user.user);

// timeGridDay timeGridWeek dayGridMonth
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        dateClick={handleClick}
        eventRender={renderEventContent}
      />
    </>
  );
};

const handleClick = (arg) => {
  alert(arg.dateStr)
}

const renderEventContent = (eventInfo) => {
  return (
    <>
      <b>{eventInfo}</b>
      <i>{'class'}</i>
    </>
  )
}

export default Calendar;
