import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { COLORS } from "../../constant";
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
      <Modal show={show.modal} onHide={handleClose} style={{boxShadow: 'none'}}>
        <Modal.Header closeButton style={{backgroundColor: `${COLORS.beige}`, border: 'none'}}>
          <Modal.Title style={{color: `${COLORS.mediumGray}`, fontWeight: 'bold'}}>Members</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor: `${COLORS.beige}`, border: 'none'}}>
          {show.members ? (
            show.members.length > 0 ? (
              show.members.map((member) => {
                return (
                  <ModalUserInfo>
                    <ModalUserName to={`/profile/${member._id}`}>
                      {member.fullname}
                    </ModalUserName>
                    {member._id === currentUser._id ? (
                      <UnBookButton onClick={handleUnbookClass}>
                        Unbook
                      </UnBookButton>
                    ) : null}
                  </ModalUserInfo>
                );
              })
            ) : (
              <GenericMemberMessage>No members in this class</GenericMemberMessage>
            )
          ) : (
            <LoadingSpinner size={"sm"} />
          )}
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: `${COLORS.beige}`, border: 'none'}}>
          <BookButton onClick={handleCalendarSubmit} variant={"secondary"}>
            Book
          </BookButton>
        </Modal.Footer>
      </Modal>
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
const UnBookButton = styled.button`
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
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.mediumGray};
    border: 1px solid ${COLORS.mediumGray};
  }
`;
const ModalUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ModalUserName = styled(Link)`
  font-size: 1.5em;
  font-weight: bold;
  color: ${COLORS.orange};
  transition: all 0.3s;

  &:hover {
    text-decoration: none;
    color: ${COLORS.mediumGray};
  }
`;
const GenericMemberMessage = styled.p`
  color: ${COLORS.mediumGray};
`

export default CalendarModal;
