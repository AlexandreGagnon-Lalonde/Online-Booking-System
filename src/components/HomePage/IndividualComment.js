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
import { AiOutlineSend } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";

const IndividualComment = ({ comment }) => {
  const currentUser = useSelector((state) => state.user.user);

  const oldComment = comment.comment;

  const [toggleEditing, setToggleEditing] = React.useState(false);
  const [newComment, setNewComment] = React.useState(oldComment);

  const dispatch = useDispatch();

  const momentDay = moment(new Date()).format("ddd MMM DD YYYY").toString();
  const classId = Buffer.from(momentDay).toString("base64");
  const commentId = comment.commentId;
  const commentStatus = comment.status;
  const commentAuthorId = comment.fromId;

  const handleDeleteComment = (ev) => {
    ev.preventDefault();

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

    if (oldComment !== newComment) {
      dispatch(requestComment());

      fetch(SERVER_URL + "/api/editcomment", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: classId,
          newComment,
          commentId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveComment(data.comments));
          setToggleEditing(!toggleEditing);
        })
        .catch((err) => {
          dispatch(receiveCommentError());
        });
    } else {
      setToggleEditing(!toggleEditing);
    }
  };
  const handleEdit = (ev) => {
    ev.preventDefault();

    setToggleEditing(!toggleEditing);
  };

  return (
    <>
      <CommentFromCurrentUser>
        <CommentInfo>
          <CommentContent>
            {commentStatus === "deleted" ? (
              <DeletedComment>deleted</DeletedComment>
            ) : toggleEditing ? (
              <EditCommentInput
                type={"text"}
                value={newComment}
                onChange={(ev) => setNewComment(ev.currentTarget.value)}
              />
            ) : (
              <RegularComment>{comment.comment}</RegularComment>
            )}
          </CommentContent>
          <CommentAuthor>
            <StyledLink to={`/profile/${commentAuthorId}`}>
              {comment.from}
            </StyledLink>
            <EditedMention>
              {commentStatus === "edited" ? "  ·  edited" : null}
            </EditedMention>
          </CommentAuthor>
        </CommentInfo>
        {commentAuthorId === currentUser._id ? (
          <ButtonContainer>
            {commentStatus === "deleted" ? null : (
              <>
                <CommentButton
                  onClick={toggleEditing ? handleEditComment : handleEdit}
                >
                  {toggleEditing ? <AiOutlineSend /> : <FiEdit2 />}
                </CommentButton>
                <CommentButton onClick={handleDeleteComment}>
                  <FiDelete />
                </CommentButton>
              </>
            )}
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
  &:focus {
    color: ${COLORS.lightGray};
  }
`;
const DeletedComment = styled.p`
  font-size: 0.8em;
  font-style: italic;
  color: ${COLORS.lightGray};
`;
const ButtonContainer = styled.div``;
const StyledLink = styled(Link)`
  color: ${COLORS.orange};
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.lightGray};
    text-decoration: none;
  }
`;
const RegularComment = styled.p``;
const EditedMention = styled.span`
  font-size: 1em;
  color: ${COLORS.lightGray};
`;
const EditCommentInput = styled.input`
  border-radius: 5px;
  padding-left: 5px;
  background-color: ${COLORS.lightGray};
  color: ${COLORS.darkGray};

  &::placeholder {
    color: ${COLORS.darkGray};
  }
`;

export default IndividualComment;
