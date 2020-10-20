import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  requestSuggestion,
  receiveSuggestion,
  receiveSuggestionError,
} from "../../reducers/action";

const SuggestionBox = () => {
  const [suggestion, setSuggestion] = React.useState("");
  const [checkbox, setCheckbox] = React.useState("");

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div>
      <h2>Suggestion</h2>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();

          const date = new Date();
          const dateId = Buffer.from(date.toString()).toString("base64");
          // dispatch(requestSuggestion());

          // fetch(SERVER_URL + "/api/suggestion/create", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     _id: dateId,
          //     from: checkbox ? 'Anonymous' : currentUser._id,
          //     suggestion,
          //   }),
          // })
          //   .then((res) => res.json())
          //   .then((data) => {
          //     if (data.success) {
          //       dispatch(receiveSuggestion(data.messages))
          //     } else {
          //       dispatch(receiveSuggestionError())
          //     }
          //   })
          //   .catch((err) => {
          //     dispatch(receiveSuggestionError());
          //   });
        }}
      >
        <textarea></textarea>
        <label for={"suggestion"}>Anonymous</label>
        <input
          type={"checkbox"}
          id={"anonymous"}
          name={"suggestion"}
          value={true}
          onChange={(ev) => setCheckbox(ev.currentTarget.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SuggestionBox;
