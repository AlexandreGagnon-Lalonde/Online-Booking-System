import React from "react";
import styled from "styled-components";
import moment from "moment";
import LoadingSpinner from "../LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL, COLORS } from "../../constant";
import { receiveComment, receiveCommentError } from "../../reducers/action";

const WorkoutForm = () => {
  const currentUser = useSelector((state) => state.user.user);
  const commentState = useSelector((state) => state.comment);

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
    <Form onSubmit={handleComment} id={"comment-form"}>
      <WorkoutCommentInput
        type={"text"}
        value={comment}
        placeholder={"Leave a comment"}
        onChange={(ev) => setComment(ev.currentTarget.value)}
      ></WorkoutCommentInput>
      <WorkoutCommentButton type={"submit"} disabled={!comment}>
        {commentState.status === "Loading" ? <LoadingSpinner /> : "Comment"}
      </WorkoutCommentButton>
    </Form>
  );
};

const Form = styled.form``;
const WorkoutCommentInput = styled.input`
  border: none;
  border-radius: 5px;
  padding: 1px 5px 5px 5px;
  background-color: ${COLORS.lightGray};
  color: ${COLORS.darkGray};
  width: 100%;
  margin: 10px 0;

  &::placeholder {
    color: ${COLORS.darkGray};
  }
`;
const WorkoutCommentButton = styled.button`
  border: 1px solid ${COLORS.orange};
  border-radius: 5px;
  font-size: 1.5em;
  font-weight: bold;
  color: ${COLORS.orange};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.mediumGray};
  cursor: pointer;
  width: 100%;
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.lightGray};
    border: 1px solid ${COLORS.lightGray};
  }
`;

export default WorkoutForm;
