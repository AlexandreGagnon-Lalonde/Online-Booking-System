import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import IndividualComment from "./IndividualComment";

const Comments = () => {
  const commentState = useSelector((state) => state.comment);

  return (
    <Container>
      {commentState.comments ? (
        commentState.comments.length > 0 ? (
          commentState.comments.map((comment) => {
            return (
              <IndividualComment key={comment.commentId} comment={comment} />
            );
          })
        ) : (
          "No comments"
        )
      ) : (
        <LoadingSpinner size={"md"} />
      )}
    </Container>
  );
};

const Container = styled.div``;

export default Comments;
