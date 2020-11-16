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
  requestUser,
  receiveUser,
  receiveUserError,
} from "../../reducers/action";
import LoadingSpinner from "../LoadingSpinner";

const CalendarModal = ({ show, setShow }) => {
  const currentUser = useSelector((state) => state.user.user);
  const calendarState = useSelector((state) => state.calendar);

  const dispatch = useDispatch();
  const history = useHistory();

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

  // handle to remove current user from class
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
    <Modal show={show.modal} onHide={handleClose} style={{ boxShadow: "none" }}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: `${COLORS.beige}`, border: "none" }}
      >
        <Modal.Title
          style={{ color: `${COLORS.mediumGray}`, fontWeight: "bold" }}
        >
          Members
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ backgroundColor: `${COLORS.beige}`, border: "none" }}
      >
        {show.members ? (
          show.members.length > 0 ? (
            show.members.map((member, index) => {
              return (
                <ModalUserInfo>
                  {index === 0 ? null : <Separator />}
                  <NotSeparator>
                    <ModalUserName to={`/profile/${member._id}`}>
                      {member.fullname}
                    </ModalUserName>
                    {member._id === currentUser._id ? (
                      <UnBookButton onClick={handleUnbookClass}>
                        Unbook
                      </UnBookButton>
                    ) : null}
                  </NotSeparator>
                </ModalUserInfo>
              );
            })
          ) : (
            <GenericMemberMessage>
              No members in this class
            </GenericMemberMessage>
          )
        ) : (
          <LoadingSpinner size={"sm"} />
        )}
      </Modal.Body>
      <Modal.Footer
        style={{ backgroundColor: `${COLORS.beige}`, border: "none" }}
      >
        <BookButton onClick={handleCalendarSubmit} variant={"secondary"}>
          Book
        </BookButton>
        {calendarState.status === "Error" ? (
          <ErrorMessage>{calendarState.errorMessage}</ErrorMessage>
        ) : null}
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
const Separator = styled.div`
  border-top: 1px solid ${COLORS.lightGray};
  padding: 5px;
`;
const NotSeparator = styled.div`
  display: flex;
  justify-content: space-between;
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
  flex-direction: column;
  padding: 5px;
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

export default CalendarModal;
