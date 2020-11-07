import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";

import {
  requestMessage,
  sendMessage,
  messageError,
} from "../../reducers/action";

const SendMessage = () => {
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

    dispatch(requestMessage());

    fetch(SERVER_URL + "/api/sendmessage", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateId,
        currentUserId: currentUser._id,
        otherUserId: otherUser._id,
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
    <form onSubmit={handleSendMessage} id={'message-form'}>
      <textarea
        placeholder={"Send a message"}
        onChange={(ev) => setMessage(ev.currentTarget.value)}
      ></textarea>
      <button type={"submit"} disabled={!message} >Send</button>
    </form>
  );
};

export default SendMessage;
