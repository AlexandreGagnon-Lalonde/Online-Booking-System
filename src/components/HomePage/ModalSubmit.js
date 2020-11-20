import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  SERVER_URL,
  COLORS,
  weekDays,
  newWeekClass,
  newWeekendClass,
} from "../../constant";
import {
  receiveCalendar,
  receiveCalendarError,
  requestCalendar,
} from "../../reducers/action";

const ModalSubmit = ({ show, setShow }) => {
  const currentUser = useSelector((state) => state.user.user);
  const calendarState = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const handleCalendarSubmit = (ev) => {
    ev.preventDefault();

    let newClass;

    const classTime = show.classSchedule;

    const classId = Buffer.from(
      show.info.start.toString().slice(0, 15)
    ).toString("base64");

    const weekDayConfirmation = weekDays.includes(
      show.info.start.toString().slice(0, 3)
    );

    const newMemberArray = [
      {
        _id: currentUser._id,
        fullname: currentUser.firstName + " " + currentUser.lastName,
        email: currentUser.email,
      },
    ];

    if (weekDayConfirmation) {
      newClass = {
        ...newWeekClass,
        _id: classId,
        [classTime]: newMemberArray,
      };
    } else {
      newClass = {
        ...newWeekendClass,
        _id: classId,
        [classTime]: newMemberArray,
      };
    }

    dispatch(requestCalendar());

    fetch(SERVER_URL + `/api/bookclass/${newClass._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newClass,
        classTime,
        currentUser,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(receiveCalendar(data.calendar));
          setShow({ info: "", modal: false });

          localStorage.setItem("currentCalendarId", data.calendar._id);
        } else {
          dispatch(receiveCalendarError(data.message));
        }
      })
      .catch((err) => {
        dispatch(receiveCalendarError());
      });
  };

  return (
    <>
      <BookButton onClick={handleCalendarSubmit} variant={"secondary"}>
        Book
      </BookButton>
      {calendarState.status === "Error" ? (
        <ErrorMessage>{calendarState.errorMessage}</ErrorMessage>
      ) : null}
    </>
  );
};

const BookButton = styled.button`
  border: 1px solid ${COLORS.orange};
  border-radius: 5px;
  font-size: 1.5em;
  font-weight: bold;
  color: ${COLORS.orange};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.beige};
  cursor: pointer;
  width: 100%;
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.mediumGray};
    border: 1px solid ${COLORS.mediumGray};
  }
`;
const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: ${COLORS.errorRed};
  border: 1px solid ${COLORS.errorRed};
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
  width: 100%;
`;

export default ModalSubmit;
