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

const Calendar = (props) => {
  const [show, setShow] = React.useState({
    info: "",
    modal: false,
    members: [],
    classSchedule: null,
  });
  const calendarState = useSelector((state) => state.calendar);
  const currentUser = useSelector((state) => state.user.user);
  const [firstDayOfCalendar, setFirstDayOfCalendar] = React.useState(null);

  const dispatch = useDispatch();

  const { useRef } = React;

  const calendarDisplayRef = useRef();

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

  // open modal
  const handleShow = (eventInfo) => {
    const encryptedDay = Buffer.from(
      eventInfo.el.fcSeg.start.toString().slice(0, 15)
    ).toString("base64");

    let currentDay = calendarState.calendar.find(
      (day) => day._id === encryptedDay
    );

    let classSchedule = eventInfo.el.innerText.toString().slice(0, 5);

    let currentClassMembers = currentDay ? currentDay[classSchedule] : false;
    // set modal date/time eventInfo
    setShow({
      info: eventInfo.el.fcSeg,
      modal: true,
      members: currentClassMembers,
      classSchedule,
    });
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

  // const handleMouseEnter = () => {
  //   console.log("enter");
  // };
  // const handleMouseLeave = () => {
  //   console.log("leave");
  // };
  console.log("calendar", show.members === true);
  React.useEffect(() => {
    calendarDisplayRef.current
      .getApi()
      .changeView(calendarState.calendarDisplay);

    if (firstDayOfCalendar) {
      dispatch(requestCalendar());

      fetch(
        SERVER_URL +
          `/api/getcalendar/${calendarState.calendarDisplay}/${firstDayOfCalendar}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveCalendar(data.calendar));
        })
        .catch((err) => {
          dispatch(receiveCalendarError());
        });
    }
  }, [calendarState.calendarDisplay, firstDayOfCalendar]);

  return (
    <StyledDiv>
      <div>
        <button
          disabled={
            calendarState.calendarDisplay === "timeGridDay" //? true : false
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
            calendarState.calendarDisplay === "timeGridWeek" //? true : false
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

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={calendarState.calendarDisplay}
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
        timeZone={"America/New_York"}
        eventClick={handleShow}
        datesSet={(arg) => {
          if (!firstDayOfCalendar) {
            if (calendarState.calendarDisplay === "timeGridWeek") {
              setFirstDayOfCalendar(arg.view.activeStart);
            } else {
              setFirstDayOfCalendar(arg.view.activeEnd);
            }
          }
        }}
        // eventMouseEnter={handleMouseEnter}
        // eventMouseLeave={handleMouseLeave}
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
