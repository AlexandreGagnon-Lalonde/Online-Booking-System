import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "react-week-calendar/dist/style.css";

const Calendar = () => {
  const currentUser = useSelector((state) => state.user.user);

  // Exclude times, filter times, include times,

  // numberOfDays for mobile version
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={"timeGridDay"}
      />
    </>
  );
};

export default Calendar;
