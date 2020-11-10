import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";
import {
  requestMessage,
  sendMessage,
  messageError,
} from "../../reducers/action";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";
import { COLORS } from "../../constant";
import { Link, useHistory } from "react-router-dom";

const IndividualMessage = ({ message, conversationId }) => {
  const currentUser = useSelector((state) => state.user.user);

  const messageValueShortcut = message.message;
  const messageAuthor = message.from;
  const messageStatus = message.status;

  const [toggleEditing, setToggleEditing] = React.useState(false);
  const [messageValue, setMessageValue] = React.useState(messageValueShortcut);

  const dispatch = useDispatch();

  const handleConfirmEdit = (ev) => {
    ev.preventDefault();

    if (messageValue !== messageValueShortcut) {
      dispatch(requestMessage());

      fetch(SERVER_URL + "/api/editmessage", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: conversationId,
          oldMessage: messageValueShortcut,
          author: messageAuthor,
          messageValue,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(sendMessage());
          setToggleEditing(!toggleEditing);
        })
        .catch((err) => {
          dispatch(messageError());
        });
    } else {
      setToggleEditing(!toggleEditing);
    }
  };
  const handleEdit = (ev) => {
    ev.preventDefault();

    setToggleEditing(!toggleEditing);
  };

  return (
    <div>
      {messageAuthor === currentUser._id ? (
        <MessageFromCurrentUser>
          <MessageContent>
            {toggleEditing ? (
              <input
                type={"text"}
                value={messageValue}
                onChange={(ev) => setMessageValue(ev.currentTarget.value)}
              />
            ) : (
              messageValueShortcut
            )}
            <EditedMention>
              {messageStatus === "edited" ? messageStatus : null}
            </EditedMention>
          </MessageContent>
          <EditButton onClick={toggleEditing ? handleConfirmEdit : handleEdit}>
            {toggleEditing ? <AiOutlineSend /> : <FiEdit2 />}
          </EditButton>
        </MessageFromCurrentUser>
      ) : (
        <MessageNotFromCurrentUser>
          {messageValueShortcut}{" "}
          <MessageAuthor>
            <StyledLink to={`/profile/${messageAuthor}`}>{message.fromName}</StyledLink>
            <EditedMention>
              {messageStatus === "edited" ? " · edited" : null}
            </EditedMention>
          </MessageAuthor>
        </MessageNotFromCurrentUser>
      )}
    </div>
  );
};

const MessageFromCurrentUser = styled.p`
  display: flex;
  justify-content: flex-end;
`;
const MessageNotFromCurrentUser = styled.p`
  text-align: left;
`;
const EditButton = styled.button`
  font-size: 0.8em;
  color: ${COLORS.orange};
  background-color: ${COLORS.mediumGray};
  border: none;
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.lightGray};
  }
`;
const MessageAuthor = styled.p`
  font-size: 0.5em;
  color: ${COLORS.lightGray};
`;
const EditedMention = styled.span`
  font-size: 0.5em;
  color: ${COLORS.lightGray};
`;
const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledLink = styled(Link)`
  color: ${COLORS.orange};
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.lightGray};
    text-decoration: none;
  }
`

export default IndividualMessage;
