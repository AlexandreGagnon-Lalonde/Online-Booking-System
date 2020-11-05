import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";

import {
  requestComment,
  receiveComment,
  receiveCommentError,
} from "../../reducers/action";

const WorkoutComments = () => {
  const currentUser = useSelector((state) => state.user.user);

  const [comment, setComment] = React.useState("");

  const dispatch = useDispatch();

  const handleComment = (ev) => {
    ev.preventDefault();

    const date = new Date();
    const dateId = Buffer.from(date.toString()).toString("base64");
    const userName = currentUser.firstName + " " + currentUser.lastName;

    dispatch(requestComment());

    fetch(SERVER_URL + "/api/createcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: dateId,
        from: userName,
        fromId: currentUser._id,
        comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(receiveComment(data.comments));
          setComment("");
        } else {
          dispatch(receiveCommentError());
        }
      })
      .catch((err) => {
        dispatch(receiveCommentError());
      });
  };

  return (
    <form onSubmit={handleComment}>
      <input
        type={"textarea"}
        placeholder={"Leave a comment"}
        onChange={(ev) => setComment(ev.currentTarget.value)}
      ></input>
      <button type={"submit"}>Comment</button>
    </form>
  );
};

export default WorkoutComments;
