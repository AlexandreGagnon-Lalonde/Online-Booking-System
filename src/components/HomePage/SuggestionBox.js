import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";

import {
  requestSuggestion,
  receiveSuggestion,
  receiveSuggestionError,
} from "../../reducers/action";

const SuggestionBox = () => {
  const dispatch = useDispatch();
  const [suggestion, setSuggestion] = React.useState("");
  const [checkbox, setCheckbox] = React.useState("");

  const currentUser = useSelector((state) => state.user.user);

  const handleSuggestionSubmit = (ev) => {
    ev.preventDefault();

    const date = new Date();
    const dateId = Buffer.from(date.toString()).toString("base64");
    const userName = currentUser.firstName + " " + currentUser.lastName;

    dispatch(requestSuggestion());

    fetch(SERVER_URL + "/api/createsuggestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: dateId,
        from: checkbox ? "Anonymous" : userName,
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
    <div>
      <h2>Suggestion</h2>
      <form onSubmit={handleSuggestionSubmit} id={"suggestion-form"}>
        <textarea
          onChange={(ev) => setSuggestion(ev.currentTarget.value)}
          value={suggestion}
          placeholder={"Enter a/some suggestion(s)"}
        ></textarea>
        <label htmlFor={"suggestion"}>Anonymous</label>
        <input
          type={"checkbox"}
          id={"anonymous"}
          name={"suggestion"}
          value={checkbox ? true : false}
          onChange={(ev) => setCheckbox(ev.currentTarget.value)}
        ></input>
        <button type="submit" disabled={!suggestion}>
          Send
        </button>
      </form>
    </div>
  );
};

export default SuggestionBox;
