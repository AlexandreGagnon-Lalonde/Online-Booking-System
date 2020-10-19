import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import WeekCalendar from "react-week-calendar";
import Dayz from "dayz";
// could also import the sass if you have a loader at dayz/dayz.scss
import "dayz/dist/dayz.css";
import moment from "moment";

import "react-week-calendar/dist/style.css";

const Calendar = () => {
  const currentUser = useSelector((state) => state.user.user);

  // Exclude times, filter times, include times,

  // numberOfDays for mobile version
  return (
    <>
      <WeekCalendar
        scaleUnit={60}
        eventComponent={<p>asdf</p>}
        numberOfDays={7}
        cellHeight={50}
        scaleHeaderTitle={"Classes"}
        dayFormat={"dddd, DD/MM"}
        scaleFormat={`HH:mm - HH:mm`}
        startTime={moment({ h: 6, m: 0 })}
        endTime={moment({ h: 22, m: 0 })}
      />
    </>
  );
};

export default Calendar;
