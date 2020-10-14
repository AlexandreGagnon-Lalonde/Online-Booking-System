import React from "react";
import styled from "styled-components";

const SuggestionBox = () => {
  return (
    <div>
      <h2>Suggestion</h2>
      <form onSubmit={(ev) => {
        ev.preventDefault();

        // tbd

      }}>
        <textarea></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default SuggestionBox