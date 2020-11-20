import React from "react";
import styled from "styled-components";
import SuggestionForm from "./SuggestionForm";
import { useSelector } from "react-redux";
import { COLORS } from "../../constant";

const SuggestionBox = () => {
  const windowState = useSelector((state) => state.window);

  return (
    <SuggestionContainer
      style={windowState.width < 600 ? { margin: "25px" } : null}
    >
      <SuggestionTitle>Suggestion</SuggestionTitle>
      <SuggestionForm />
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

export default SuggestionBox;
