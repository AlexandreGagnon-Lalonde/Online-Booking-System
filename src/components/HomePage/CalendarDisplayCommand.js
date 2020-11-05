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
  calendarDay,
  calendarWeek,
  receiveCalendar,
  receiveCalendarError,
  requestCalendar,
} from "../../reducers/action";
import LoadingSpinner from "../LoadingSpinner";

const CalendarDisplayCommand = ({ setFirstDayOfCalendar, calendarDisplay }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        disabled={
          calendarDisplay === "timeGridDay" //? true : false
        }
        onClick={() => {
          setFirstDayOfCalendar(null);
          dispatch(calendarDay());
          localStorage.setItem("calendarDisplay", "timeGridDay");
        }}
      >
        Day
      </button>
      <button
        disabled={
          calendarDisplay === "timeGridWeek" //? true : false
        }
        onClick={() => {
          setFirstDayOfCalendar(null);
          dispatch(calendarWeek());
          localStorage.setItem("calendarDisplay", "timeGridWeek");
        }}
      >
        Week
      </button>
    </div>
  );
};

export default CalendarDisplayCommand;
