import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-bootstrap/Modal";
import moment from 'moment'

import { calendarDay, calendarWeek } from "../../reducers/action";

const newWeekClass = {
  _id: '',
  workout: '',
  comments: [],
  '02:00': {
    members: []
  },
  '03:00': {
    members: []
  },
  '04:00': {
    members: []
  },
  '05:00': {
    members: []
  },
  '06:00': {
    members: []
  },
  '08:00': {
    members: []
  },
  '09:00': {
    members: []
  },
  '12:00': {
    members: []
  },
  '13:00': {
    members: []
  },
  '14:00': {
    members: []
  },
  '15:00': {
    members: []
  },
  '16:00': {
    members: []
  },
}
const newWeekendClass = {
  _id: '',
  workout: '',
  comments: [],
  '04:00': {
    members: []
  },
  '05:00': {
    members: []
  },
  '06:00': {
    members: []
  },
  '07:00': {
    members: []
  },
  '08:00': {
    members: []
  },
}

const Calendar = (props) => {
  const [show, setShow] = React.useState({info: '', modal: false});
  const calendarState = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow({info: '', modal: false});
  };
  const handleShow = (info) => {
    console.log(moment(info.el.fcSeg.start).format('HH:mm'))
    setShow({info: info.el.fcSeg, modal: true});
  };
  const handleCalendarSubmit = (ev, info) => {
    ev.preventDefault();
    console.log('asdf',info)
    //     dispatch(requestCalendar());

    //     fetch(SERVER_URL + "/api/bookclass/${classId}", {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         _id: classId,
    //         workout: '',
    //         lastName,
    //         avatar: '',
    //         phone,
    //         DOB,
    //         gender,
    //         city,
    //         address,
    //         zipcode,
    //         email,
    //         password,
    //         admin: false,
    //         "Emergency Contact": {
    //           relName,
    //           relation,
    //           relPhone,
    //         },
    //         Conversations: [],
    //         Classes: [],
    //       }),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         if (data.success) {
    //           dispatch(receiveCalendar(data.calendar))
    //           localStorage.setItem('currentCalendarId', data.calendar._id)
    //           history.push('/homepage')
    //         } else {
    //           dispatch(receiveCalendarError())
    //         }
    //       })
    //       .catch((err) => {
    //         dispatch(receiveCalendarError());
    //       });
  }

  // const handleMouseEnter = () => {
  //   console.log("enter");
  // };
  // const handleMouseLeave = () => {
  //   console.log("leave");
  // };

  // timeGridDay timeGridWeek dayGridMonth
  return (
    <StyledDiv>
      <div>
        <button
          disabled={
            calendarState.calendarDisplay === "timeGridDay" ? true : false
          }
          onClick={() => {
            dispatch(calendarDay());
            localStorage.setItem("calendarDisplay", "timeGridDay");
          }}
        >
          Day
        </button>
        <button
          disabled={
            calendarState.calendarDisplay === "timeGridWeek" ? true : false
          }
          onClick={() => {
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
          my body
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCalendarSubmit} variant={'secondary'}>
            Book
          </button>
          <button onClick={handleClose} variant={'primary'}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={calendarState.calendarDisplay}
        slotMinTime={'05:00:00'}
        slotMaxTime={'22:00:00'}
        slotDuration={'1:00'}
        contentHeight={800}
        expandRows={true}
        timeZone={'America/New_York'}
        eventClick={handleShow}
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
