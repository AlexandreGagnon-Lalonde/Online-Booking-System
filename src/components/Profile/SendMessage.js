import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  requestMessage,
  receiveMessages,
  messageError,
} from "../../reducers/action";

const SendMessage = () => {
  const [message, setMessage] = React.useState("");

  const currentUser = useSelector((state) => state.user.currentUser);
  const otherUser = useSelector((state) => state.user.otherUser);

  const dispatch = useDispatch();

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();

        const date = new Date()
        const dateId = Buffer.from(date.toString()).toString("base64");

        // dispatch(requestMessage());

        // fetch(SERVER_URL + "/api/sendmessage", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     dateId,
        //     currentUserId: currentUser._id,
        //     otherUserId: otherUser._id,
        //     date: new Date(),
        //     message,
        //   }),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     if (data.success) {
        //       dispatch(receiveMessages(data.messages))
        //     } else {
        //       dispatch(messageError())
        //     }
        //   })
        //   .catch((err) => {
        //     dispatch(messageError());
        //   });
      }}
    >
      <textarea
        placeholder={"Send a message"}
        onChange={(ev) => setMessage(ev.currentTarget.value)}
      ></textarea>
      <button type={"submit"}>Send</button>{" "}
    </form>
  );
};

export default SendMessage;
