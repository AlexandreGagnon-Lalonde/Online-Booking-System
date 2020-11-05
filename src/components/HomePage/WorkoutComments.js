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
import IndividualComment from './IndividualComment';

const WorkoutComments = () => {
  const currentUser = useSelector((state) => state.user.user);
  const commentState = useSelector((state) => state.comment.comments);

  const [comment, setComment] = React.useState("");

  const dispatch = useDispatch();

  const handleComment = (ev) => {
    ev.preventDefault();

    const date = new Date();
    const classDay = moment(date).format("ddd MMM DD YYYY").toString();
    const commentDate = moment(date).toString();
    const commentId = Buffer.from(commentDate).toString("base64");
    const classId = Buffer.from(classDay).toString("base64");
    const userName = currentUser.firstName + " " + currentUser.lastName;

    dispatch(requestComment());

    fetch(SERVER_URL + "/api/postcomment", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: classId,
        commentId,
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
          document.getElementById("comment-form").reset();
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
      <form onSubmit={handleComment} id={"comment-form"}>
        <input
          type={"textarea"}
          value={comment}
          placeholder={"Leave a comment"}
          onChange={(ev) => setComment(ev.currentTarget.value)}
        ></input>
        <button type={"submit"} disabled={!comment}>
          Comment
        </button>
      </form>
      <div>
        {commentState ? (
          commentState.length > 0 ? (
            commentState.map((comment) => {
              return (
                <IndividualComment comment={comment} />
              );
            })
          ) : (
            "No comments"
          )
        ) : (
          <LoadingSpinner size={"md"} />
        )}
      </div>
    </>
  );
};

export default WorkoutComments;
