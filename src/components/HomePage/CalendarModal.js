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

const CalendarModal = ({ show, setShow }) => {
  const currentUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  // days of the week in the same format as fullcalendar
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  // week class object template
  const newWeekClass = {
    _id: "",
    workout: "",
    comments: [],
    "06:00": [],
    "07:00": [],
    "08:00": [],
    "09:00": [],
    "10:00": [],
    "12:00": [],
    "13:00": [],
    "16:00": [],
    "17:00": [],
    "18:00": [],
    "19:00": [],
    "20:00": [],
  };
  // weekend class object template
  const newWeekendClass = {
    _id: "",
    workout: "",
    comments: [],
    "08:00": [],
    "09:00": [],
    "10:00": [],
    "11:00": [],
    "12:00": [],
  };

  // close modal
  const handleClose = () => {
    // empty modal info
    setShow({ info: "", modal: false, members: [], classSchedule: null });
  };

  const handleUnbookClass = (ev) => {
    ev.preventDefault();

    const classId = Buffer.from(
      show.info.start.toString().slice(0, 15)
    ).toString("base64");
    const classTime = show.classSchedule;

    dispatch(requestCalendar());

    fetch(SERVER_URL + `/api/unbookclass/${classId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUserId: currentUser._id,
        classTime,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(receiveCalendar(data.calendar));
          localStorage.setItem("currentCalendarId", data.calendar._id);
        } else {
          dispatch(receiveCalendarError());
        }
      })
      .catch((err) => {
        dispatch(receiveCalendarError());
      });

    setShow({ info: "", modal: false });
  };

    // class booking
    const handleCalendarSubmit = (ev) => {
      ev.preventDefault();

      let newClass;
      // string of that format '00:00'
      const classTime = show.classSchedule;
      // create an _id from the date without the time
      const classId = Buffer.from(
        show.info.start.toString().slice(0, 15)
      ).toString("base64");
      // see if the class day is during the week or the weekend
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
      // create newClass with weekday object
      if (weekDayConfirmation) {
        newClass = {
          ...newWeekClass,
          _id: classId,
          [classTime]: newMemberArray,
        };
        // create newClass with weekendday object
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
            localStorage.setItem("currentCalendarId", data.calendar._id);
          } else {
            dispatch(receiveCalendarError());
          }
        })
        .catch((err) => {
          dispatch(receiveCalendarError());
        });
  
      setShow({ info: "", modal: false });
    };
  
  return (
    <Modal show={show.modal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modal Title</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {show.members ? (
        show.members.length > 0 ? (
          show.members.map((member) => {
            return (
              <>
                <Link to={`/profile/${member._id}`}>{member.fullname}</Link>
                {member._id === currentUser._id ? (
                  <button onClick={handleUnbookClass}>Unbook</button>
                ) : null}
              </>
            );
          })
        ) : (
          "No members"
        )
      ) : (
        <LoadingSpinner size={"sm"} />
      )}
    </Modal.Body>
    <Modal.Footer>
      <button onClick={handleCalendarSubmit} variant={"secondary"}>
        Book
      </button>
      <button onClick={handleClose} variant={"primary"}>
        Cancel
      </button>
    </Modal.Footer>
  </Modal>

  )
}

export default CalendarModal