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
import { COLORS } from "../../constant";
import { FiEdit2 } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

const IndividualComment = ({ comment }) => {
  const currentUser = useSelector((state) => state.user.user);

  const commentValueShortcut = comment.comment;

  const [toggleEditing, setToggleEditing] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState(commentValueShortcut);

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
  const handleEditComment = (ev) => {
    ev.preventDefault();
  };

  return (
    <>
      <CommentFromCurrentUser>
        <CommentInfo>
          <CommentContent>
            {comment.status === "deleted" ? (
              <DeletedComment>deleted</DeletedComment>
            ) : (
              comment.comment
            )}
          </CommentContent>
          <CommentAuthor>
            <StyledLink to={`/profile/${comment.fromId}`}>{comment.from}</StyledLink>
          </CommentAuthor>
        </CommentInfo>
        {comment.fromId === currentUser._id ? (
          <ButtonContainer>
            <CommentButton onClick={handleEditComment}>
              <FiEdit2 />
            </CommentButton>
            <CommentButton onClick={handleDeleteComment}>
              <FiDelete />
            </CommentButton>
          </ButtonContainer>
        ) : null}
      </CommentFromCurrentUser>
    </>
  );
};

const CommentFromCurrentUser = styled.div`
display: flex;
justify-content: space-between;
`;
const CommentInfo = styled.div``;
const CommentContent = styled.p``;
const CommentAuthor = styled.p`
  font-size: 0.5em;
  color: ${COLORS.lightGray};
`;
const CommentButton = styled.button`
  font-size: 0.8em;
  color: ${COLORS.orange};
  background-color: ${COLORS.mediumGray};
  border: none;
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.lightGray};
  }
`;
const DeletedComment = styled.p`
  font-size: 0.8em;
`;
const ButtonContainer = styled.div``
const StyledLink = styled(Link)`
  color: ${COLORS.orange};
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.lightGray};
    text-decoration: none;
  }
`

export default IndividualComment;
