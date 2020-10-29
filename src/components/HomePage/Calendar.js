import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-bootstrap/Modal";
import { SERVER_URL } from "../../constant";
import moment from "moment";

import {
  calendarDay,
  calendarWeek,
  receiveCalendar,
  receiveCalendarError,
  requestCalendar,
} from "../../reducers/action";

const Calendar = (props) => {
  const [show, setShow] = React.useState({ info: "", modal: false });
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
    "02:00": {
      members: [],
    },
    "03:00": {
      members: [],
    },
    "04:00": {
      members: [],
    },
    "05:00": {
      members: [],
    },
    "06:00": {
      members: [],
    },
    "08:00": {
      members: [],
    },
    "09:00": {
      members: [],
    },
    "12:00": {
      members: [],
    },
    "13:00": {
      members: [],
    },
    "14:00": {
      members: [],
    },
    "15:00": {
      members: [],
    },
    "16:00": {
      members: [],
    },
  };
  // weekend class object template
  const newWeekendClass = {
    _id: "",
    workout: "",
    comments: [],
    "04:00": {
      members: [],
    },
    "05:00": {
      members: [],
    },
    "06:00": {
      members: [],
    },
    "07:00": {
      members: [],
    },
    "08:00": {
      members: [],
    },
  };
  let newClass;

  // close modal
  const handleClose = () => {
    // empty modal info
    setShow({ info: "", modal: false });
  };

  // open modal
  const handleShow = (info) => {
    // set modal date/time info
    setShow({ info: info.el.fcSeg, modal: true });
  };

  // class booking
  const handleCalendarSubmit = (ev) => {
    ev.preventDefault();
    // string of that format '00:00'
    let classTime = show.info.start.toString().slice(16, 21);
    // create an _id from the date without the time
    let classId = Buffer.from(show.info.start.toString().slice(0, 15)).toString(
      "base64"
    );
    console.log(classId);
    // see if the class day is during the week or the weekend
    let weekDayConfirmation = weekDays.includes(
      show.info.start.toString().slice(0, 3)
    );

    // create newClass with weekday object
    if (weekDayConfirmation) {
      newClass = {
        ...newWeekClass,
        _id: classId,
        [classTime]: {
          members: [
            {
              _id: currentUser._id,
              fullname: currentUser.firstName + " " + currentUser.lastName,
              email: currentUser.email,
            },
          ],
        },
      };
      // create newClass with weekendday object
    } else {
      newClass = {
        ...newWeekendClass,
        _id: classId,
        [classTime]: {
          members: [
            {
              _id: currentUser._id,
              fullname: currentUser.firstName + " " + currentUser.lastName,
              email: currentUser.email,
            },
          ],
        },
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

  // const handleMouseEnter = () => {
  //   console.log("enter");
  // };
  // const handleMouseLeave = () => {
  //   console.log("leave");
  // };

  React.useEffect(() => {
    calendarDisplayRef.current
      .getApi()
      .changeView(calendarState.calendarDisplay);
    console.log("asdf", firstDayOfCalendar);
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
            setFirstDayOfCalendar(null)
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
            setFirstDayOfCalendar(null)
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
        <Modal.Body>{console.log(calendarState)}my body</Modal.Body>
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
        firstDay={1}
        contentHeight={800}
        expandRows={true}
        timeZone={"America/New_York"}
        eventClick={handleShow}
        datesSet={(arg) => {
          if (!firstDayOfCalendar) {
            setFirstDayOfCalendar(arg.view.activeStart);
          }
          console.log(
            moment(arg.view.activeStart).day(1)._d.toString().slice(0, 15)
          );
          console.log(
            moment(arg.view.activeStart).day(2)._d.toString().slice(0, 15)
          );
          console.log(
            moment(arg.view.activeStart).day(3)._d.toString().slice(0, 15)
          );
          console.log(
            moment(arg.view.activeStart).day(4)._d.toString().slice(0, 15)
          );
          console.log(
            moment(arg.view.activeStart).day(5)._d.toString().slice(0, 15)
          );
          console.log(
            moment(arg.view.activeStart).day(6)._d.toString().slice(0, 15)
          );
          console.log(
            moment(arg.view.activeStart).day(7)._d.toString().slice(0, 15)
          );
          console.log(moment(arg.view.activeStart))
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
