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
import LoadingSpinner from "../LoadingSpinner";

const IndividualComment = ({ comment }) => {
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleDeleteComment = (ev) => {
    ev.preventDefault();

    const momentDay = moment(new Date()).format("ddd MMM DD YYYY").toString();
    const classId = Buffer.from(momentDay).toString("base64");
    const commentId = comment.commentId;

    dispatch(requestComment());

    fetch(SERVER_URL + "/api/deletecomment", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: classId,
        commentId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(receiveComment(data.comments));
        } else {
          dispatch(receiveCommentError());
        }
      })
      .catch((err) => {
        dispatch(receiveCommentError());
      });
  };

  return (
    <>
      {comment.status !== "deleted" ? (
        <>
          <p>{comment.comment}</p>
          {comment.fromId === currentUser._id ? (
            <button onClick={handleDeleteComment}>Delete</button>
          ) : null}
        </>
      ) : (
        <p>Deleted</p>
      )}
    </>
  );
};

export default IndividualComment;
