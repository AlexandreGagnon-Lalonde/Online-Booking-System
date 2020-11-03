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
        date: new Date(),
        message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(sendMessage());
      })
      .catch((err) => {
        dispatch(messageError());
      });
  };

  return (
    <form onSubmit={handleSendMessage}>
      <textarea
        placeholder={"Send a message"}
        onChange={(ev) => setMessage(ev.currentTarget.value)}
      ></textarea>
      <button type={"submit"}>Send</button>{" "}
    </form>
  );
};

export default SendMessage;
