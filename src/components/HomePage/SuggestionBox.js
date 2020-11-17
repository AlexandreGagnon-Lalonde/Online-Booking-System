import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";
import { COLORS } from "../../constant";
import {
  requestSuggestion,
  receiveSuggestion,
  receiveSuggestionError,
} from "../../reducers/action";
import LoadingSpinner from "../LoadingSpinner";

const SuggestionBox = () => {
  const suggestionState = useSelector((state) => state.suggestion);
  const windowState = useSelector((state) => state.window)

  const [suggestion, setSuggestion] = React.useState("");
  const [checkbox, setCheckbox] = React.useState("");

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.user);

  const handleSuggestionSubmit = (ev) => {
    ev.preventDefault();

    const date = new Date();
    const dateId = Buffer.from(date.toString()).toString("base64");
    const userName = currentUser.firstName + " " + currentUser.lastName;
    const authorId = currentUser._id;

    fetch(SERVER_URL + "/api/createsuggestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: dateId,
        author: checkbox ? "Anonymous" : userName,
        authorId,
        suggestion,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(receiveSuggestion(data.suggestions));
          setSuggestion("");
          setCheckbox("");
          document.getElementById("suggestion-form").reset();
        } else {
          dispatch(receiveSuggestionError());
        }
      })
      .catch((err) => {
        dispatch(receiveSuggestionError());
      });
  };

  return (
    <SuggestionContainer  style={windowState.width < 600 ? {margin: '25px'} : null}>
      <SuggestionTitle>Suggestion</SuggestionTitle>
      <form onSubmit={handleSuggestionSubmit} id={"suggestion-form"}>
        <SuggestionInput
          onChange={(ev) => setSuggestion(ev.currentTarget.value)}
          value={suggestion}
          placeholder={"Enter a/some suggestion(s)"}
        ></SuggestionInput>
        <AnonymousContainer>
          <AnonymousLabel htmlFor={"suggestion"}>Anonymous</AnonymousLabel>
          <input
            type={"checkbox"}
            id={"anonymous"}
            name={"suggestion"}
            value={checkbox ? true : false}
            onChange={(ev) => setCheckbox(ev.currentTarget.value)}
          ></input>
        </AnonymousContainer>
        <SuggestionButton type="submit" disabled={!suggestion}>
          {suggestionState.status === "Loading" ? <LoadingSpinner /> : "Send"}
        </SuggestionButton>
      </form>
    </SuggestionContainer>
  );
};

const SuggestionTitle = styled.h3``;
const SuggestionContainer = styled.div`
  border-radius: 5px;
  background-color: ${COLORS.mediumGray};
  padding 10px;
  margin: 25px 25px 0 0;
`;
const SuggestionInput = styled.textarea`
  border-radius: 5px;
  padding-left: 5px;
  background-color: ${COLORS.lightGray};
  color: ${COLORS.darkGray};
  width: 100%;
  margin: 10px 0 0 0;

  &::placeholder {
    color: ${COLORS.darkGray};
  }
`;
const AnonymousContainer = styled.div`
  padding: 5px 0 10px 0;
`;
const AnonymousLabel = styled.label`
  padding-right: 10px;
`;
const SuggestionButton = styled.button`
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

export default SuggestionBox;
