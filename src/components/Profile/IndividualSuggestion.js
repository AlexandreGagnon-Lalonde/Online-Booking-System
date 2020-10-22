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

  return (
    <StyledDiv>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();

          dispatch(requestSuggestion());

          fetch(SERVER_URL + `/api/suggestion/delete/${props.suggestion._id}`, {
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
              console.log(err);
              dispatch(receiveSuggestionError());
            });
        }}
      >
        <p>{props.suggestion.suggestion}</p>
        <p>{props.suggestion.from}</p>
        <button type={"submit"}>Delete</button>
      </form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  border: 1px solid black;
  margin: 5px;
`;

export default IndividualSuggestion;
