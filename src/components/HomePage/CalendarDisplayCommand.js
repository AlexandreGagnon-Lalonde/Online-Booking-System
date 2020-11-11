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
import { COLORS } from '../../constant';
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
    <ButtonContainer>
      <DisplayButton
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
      </DisplayButton>
      <DisplayButton
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
      </DisplayButton>
    </ButtonContainer>
  );
};

const DisplayButton = styled.button`
color: ${COLORS.orange};
backgroud-color: ${COLORS.beige};
border: none;
border-radius: 5px;
padding: 8px 10px;
margin: 10px;
display: flex;
align-items: center;
font-weight: bold;
transition: all 0.2s;

&:hover {
  background-color: ${COLORS.orange};
  color: ${COLORS.beige};
}
&:disabled {
  background-color: ${COLORS.orange};
  color: ${COLORS.beige};
}
`
const ButtonContainer = styled.div`
  display: flex;
`

export default CalendarDisplayCommand;
