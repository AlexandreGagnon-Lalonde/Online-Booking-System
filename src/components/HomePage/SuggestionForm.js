import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";
import { COLORS } from "../../constant";
import {
  receiveSuggestion,
  receiveSuggestionError,
} from "../../reducers/action";
import LoadingSpinner from "../LoadingSpinner";

const ComponentName = () => {
  const suggestionState = useSelector((state) => state.suggestion);
  const currentUser = useSelector((state) => state.user.user);

  const [suggestion, setSuggestion] = React.useState("");
  const [checkbox, setCheckbox] = React.useState("");

  const dispatch = useDispatch();

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
    <Form onSubmit={handleSuggestionSubmit} id={"suggestion-form"}>
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
    </Form>
  );
};

const Form = styled.form``;
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
const AnonymousContainer = styled.div`
  padding: 5px 0 10px 0;
`;
const AnonymousLabel = styled.label`
  padding-right: 10px;
`;

export default ComponentName;
