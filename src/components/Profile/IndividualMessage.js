import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";
import {
  requestMessage,
  sendMessage,
  messageError,
} from "../../reducers/action";

const IndividualMessage = ({ message, conversationId }) => {
  const currentUser = useSelector((state) => state.user.user);

  const messageValueShortcut = message.message;
  const messageAuthor = message.from;

  const [toggleEditing, setToggleEditing] = React.useState(false);
  const [messageValue, setMessageValue] = React.useState(messageValueShortcut);

  const dispatch = useDispatch();

  const handleConfirmEdit = (ev) => {
    ev.preventDefault();

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
  };
  const handleEdit = (ev) => {
    ev.preventDefault();

    setToggleEditing(!toggleEditing);
  };

  return (
    <div>
      {messageAuthor === currentUser._id ? (
        <MessageFromCurrentUser>
          {toggleEditing ? (
            <input
              type={"text"}
              value={messageValue}
              onChange={(ev) => setMessageValue(ev.currentTarget.value)}
            />
          ) : (
            messageValueShortcut
          )}
          <button onClick={toggleEditing ? handleConfirmEdit : handleEdit}>
            {toggleEditing ? "Send" : "Edit"}
          </button>
        </MessageFromCurrentUser>
      ) : (
        <MessageNotFromCurrentUser>
          {messageValueShortcut}
        </MessageNotFromCurrentUser>
      )}
    </div>
  );
};

const MessageFromCurrentUser = styled.p`
  text-align: right;
`;
const MessageNotFromCurrentUser = styled.p`
  text-align: left;
`;

export default IndividualMessage;
