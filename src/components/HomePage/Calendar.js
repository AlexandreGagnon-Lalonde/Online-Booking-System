import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import WeekCalendar from 'react-week-calendar';

import 'react-week-calendar/dist/style.css';


const Calendar = () => {
  const currentUser = useSelector((state) => state.user.user)

// Exclude times, filter times, include times, 

// numberOfDays for mobile version
  return (
    <WeekCalendar onIntervalRemove={true} scaleUnit={60} numberOfDays={1} />
  )
}

export default Calendar