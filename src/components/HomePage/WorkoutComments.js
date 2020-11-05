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

const WorkoutComments = () => {
  const currentUser = useSelector((state) => state.user.user);
  const commentState = useSelector((state) => state.comment.comments);

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
          document.getElementById("comment-form").reset();
        } else {
          dispatch(receiveCommentError());
        }
      })
      .catch((err) => {
        dispatch(receiveCommentError());
      });
  };
console.log(commentState)
  return (
    <>
      <form onSubmit={handleComment} id={'comment-form'} >
        <input
          type={"textarea"}
          value={comment}
          placeholder={"Leave a comment"}
          onChange={(ev) => setComment(ev.currentTarget.value)}
        ></input>
        <button type={"submit"} disabled={!comment} >Comment</button>
      </form>
      <div>
        {commentState ? (
          commentState.length > 0 ? (
            commentState.map((comment) => {
              return <p>{comment.comment}</p>;
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
