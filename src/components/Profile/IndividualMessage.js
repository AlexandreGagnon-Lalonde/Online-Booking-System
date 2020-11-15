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
  const isAuthorCurrentUser = message.from === currentUser._id;

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
    <SingleMessageContainer>
      {messageAuthor === currentUser._id ? (
        <MessageFromCurrentUser style={{marginLeft: 'auto'}}>
          <MessageContent>
            {toggleEditing ? (
              <EditMessageInput
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
            <StyledLink to={`/profile/${messageAuthor}`}>
              {message.fromName}
            </StyledLink>
            <EditedMention>
              {messageStatus === "edited" ? " · edited" : null}
            </EditedMention>
          </MessageAuthor>
        </MessageNotFromCurrentUser>
      )}
    </SingleMessageContainer>
  );
};

const SingleMessageContainer = styled.div`
`
const MessageFromCurrentUser = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: ${COLORS.orange};  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  width: fit-content;

`;
const MessageNotFromCurrentUser = styled.div`
  background-color: ${COLORS.darkGray};
  text-align: left;  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  width: fit-content;

`;
const EditButton = styled.button`
  font-size: 0.8em;
  color: ${COLORS.darkGray};
  background-color: ${COLORS.orange};
  border: none;
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.lightGray};
  }
  &:focus {
    color: ${COLORS.lightGray};
  }
`;
const MessageAuthor = styled.p`
  font-size: 0.5em;
  color: ${COLORS.lightGray};
`;
const EditedMention = styled.span`
  font-size: 8px;
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
`;
const EditMessageInput = styled.input`
  border-radius: 5px;
  padding-left: 5px;
  background-color: ${COLORS.lightGray};
  color: ${COLORS.darkGray};

  &::placeholder {
    color: ${COLORS.darkGray};
  }
`;
export default IndividualMessage;
