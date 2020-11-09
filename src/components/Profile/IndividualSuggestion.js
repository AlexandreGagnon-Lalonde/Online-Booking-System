import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import {
  requestSuggestion,
  receiveSuggestion,
  receiveSuggestionError,
} from "../../reducers/action";
import { SERVER_URL } from "../../constant";
import LoadingSpinner from "../LoadingSpinner";
import { Link, useHistory } from "react-router-dom";
import { FiDelete } from 'react-icons/fi';

const IndividualSuggestion = ({ suggestion }) => {
  const suggestionState = useSelector((state) => state.suggestion);

  const dispatch = useDispatch();

  const suggestionAuthor = suggestion.author;

  const handleSubmit = (ev) => {
    ev.preventDefault();

    dispatch(requestSuggestion());

    fetch(SERVER_URL + `/api/suggestion/delete/${suggestion._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(receiveSuggestion(data.suggestions));
        } else {
          dispatch(receiveSuggestionError());
        }
      })
      .catch((err) => {
        dispatch(receiveSuggestionError());
      });
  };

  return (
    <StyledDiv>
      <SuggestionListForm onSubmit={handleSubmit}>
        <SuggestionInfo>
          <SuggestionContent>{suggestion.suggestion}</SuggestionContent>
          <SuggestionAuthor>
            {suggestionAuthor === "Anonymous" ? (
              suggestionAuthor
            ) : (
              <StyledAuthorLink to={`/profile/${suggestion.authorId}`}>
                {suggestion.author}
              </StyledAuthorLink>
            )}
          </SuggestionAuthor>
        </SuggestionInfo>
        <SuggestionDeleteButton type={"submit"}>
          {suggestionState.status === "Loading" ? (
            <LoadingSpinner size={"sm"} />
          ) : (
            <FiDelete />
          )}
        </SuggestionDeleteButton>
      </SuggestionListForm>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background-color: ${COLORS.lightGray};
  border-radius: 5px;
  margin: 10px;
  color: ${COLORS.darkGray};
  padding: 5px;
`;
const SuggestionInfo = styled.div`
  flex: 8;
`;
const SuggestionListForm = styled.form`
  display: flex;
`;
const SuggestionContent = styled.p`
  font-size: 1.4em;
  font-weight: bold;
`;
const SuggestionAuthor = styled.p`
  font-size: 0.8em;
  color: ${COLORS.mediumGray};
`;
const StyledAuthorLink = styled(Link)`
font-size: 0.8em;
color: ${COLORS.mediumGray};
transition: all 0.2s;

&:hover {
  text-decoration: none;
  color: ${COLORS.mediumGray};
  font-size: 1em;
}
`
const SuggestionDeleteButton = styled.button`
  color: ${COLORS.orange};
  border: none;
  background-color: ${COLORS.lightGray};
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export default IndividualSuggestion;
