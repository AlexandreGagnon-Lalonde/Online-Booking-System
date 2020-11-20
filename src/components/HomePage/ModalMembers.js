import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SERVER_URL, COLORS } from "../../constant";
import {
  receiveCalendar,
  receiveCalendarError,
  requestCalendar,
} from "../../reducers/action";

const ModalMembers = ({ show, setShow }) => {
  const currentUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

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

  return (
    <>
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
          <GenericMemberMessage>No members in this class</GenericMemberMessage>
        )
      ) : (
        <LoadingSpinner size={"sm"} />
      )}
    </>
  );
};

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

export default ModalMembers;
