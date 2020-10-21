import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import {
  requestSuggestion,
  receiveSuggestion,
  receiveSuggestionError,
} from "../../reducers/action";
import { SERVER_URL } from "../../constant";

const IndividualSuggestion = (props) => {
  const dispatch = useDispatch();

  const suggestionState = useSelector((state) => state.suggestion.suggestion);

  return (
    <StyledDiv>
      <p>{props.suggestion.suggestion}</p>
      <p>{props.suggestion.from}</p>
      <button
        onClick={(ev) => {
          ev.preventDefault();

          dispatch(requestSuggestion());
console.log(props.suggestion)
          fetch(SERVER_URL + `/api/suggestion/delete/${props.suggestion._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              _id: props.suggestion._id,
              suggestion: props.suggestion.suggestion,
              from: props.suggestion.from,
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
              console.log(err);
              dispatch(receiveSuggestionError());
            });
        }}
      >
        Delete
      </button>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  border: 1px solid black;
  margin: 5px;
`;

export default IndividualSuggestion;
