import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import {
  requestSuggestion,
  receiveSuggestion,
  receiveSuggestionError,
} from "../../reducers/action";
import { SERVER_URL } from "../../constant";
import LoadingSpinner from "../LoadingSpinner";

const IndividualSuggestion = ({ suggestion }) => {
  const suggestionState = useSelector((state) => state.suggestion);
  const dispatch = useDispatch();

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
      <form onSubmit={handleSubmit}>
        <p>{suggestion.suggestion}</p>
        <p>{suggestion.from}</p>
        <button type={"submit"}>
          {suggestionState.status === "Loading" ? (
            <LoadingSpinner size={"sm"} />
          ) : (
            "Delete"
          )}
        </button>
      </form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  border: 1px solid black;
  margin: 5px;
`;

export default IndividualSuggestion;
