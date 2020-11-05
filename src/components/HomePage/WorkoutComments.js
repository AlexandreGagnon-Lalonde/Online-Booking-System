import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";
import moment from "moment";
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

    const momentDay = moment(new Date()).format("ddd MMM DD YYYY").toString();
    const classId = Buffer.from(momentDay).toString("base64");
    const userName = currentUser.firstName + " " + currentUser.lastName;

    dispatch(requestComment());

    fetch(SERVER_URL + "/api/postcomment", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: classId,
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
