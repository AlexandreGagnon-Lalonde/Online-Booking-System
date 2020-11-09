import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";
import { AiOutlineSend } from 'react-icons/ai';
import { COLORS } from '../../constant'
import {
  requestMessage,
  sendMessage,
  messageError,
} from "../../reducers/action";

const SendMessage = ({ otherUserId }) => {
  const currentUser = useSelector((state) => state.user.user);
  const otherUser = useSelector((state) => state.user.otherUser);

  const [message, setMessage] = React.useState("");

  const dispatch = useDispatch();

  const handleSendMessage = (ev) => {
    ev.preventDefault();

    const date = new Date();
    const dateId = Buffer.from(date.toString()).toString("base64");

    const currentUserName = currentUser.firstName + ' ' + currentUser.lastName;
    const otherUserName = otherUser.firstName + ' ' + otherUser.lastName;

    const receivingUserId = otherUserId ? otherUserId : otherUser._id;

    dispatch(requestMessage());

    fetch(SERVER_URL + "/api/sendmessage", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateId,
        currentUserId: currentUser._id,
        otherUserId: receivingUserId,
        currentUserName,
        otherUserName,
        date: new Date(),
        message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(sendMessage());
        setMessage('');
        document.getElementById('message-form').reset()
      })
      .catch((err) => {
        dispatch(messageError());
      });
  };

  return (
    <SendMessageForm onSubmit={handleSendMessage} id={'message-form'}>
      <SendMessageInput
        placeholder={"Send a message"}
        onChange={(ev) => setMessage(ev.currentTarget.value)}
      ></SendMessageInput>
      <SendMessageButton type={"submit"} disabled={!message} ><AiOutlineSend /></SendMessageButton>
    </SendMessageForm>
  );
};

const SendMessageForm = styled.form`
  display: flex;
  height: 30px;
`
const SendMessageInput = styled.textarea`
  flex: 7;
  border-radius: 5px;
  padding-left: 5px;
  background-color: ${COLORS.lightGray};
  color: ${COLORS.darkGray};

  &::placeholder {
    color: ${COLORS.darkGray};
  }
`
const SendMessageButton = styled.button`
  flex: 1;
  border: none;
  font-size: 1.5em;
  font-weight: bold;
  color: ${COLORS.orange};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.mediumGray};
  cursor: pointer;

`

export default SendMessage;
