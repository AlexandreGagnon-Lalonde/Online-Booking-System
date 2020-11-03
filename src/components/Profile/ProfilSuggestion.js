import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import IndividualSuggestion from "./IndividualSuggestion";
import LoadingSpinner from "../LoadingSpinner";

const ProfilSuggestion = ({ suggestions }) => {
  const suggestionState = useSelector((state) => state.suggestion.suggestion);

  return (
    <>
      {suggestionState ? (
        <StyledDiv>
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => {
              return (
                <IndividualSuggestion
                  key={suggestion._id}
                  suggestion={suggestion}
                />
              );
            })
          ) : (
            <p>No suggestions</p>
          )}
        </StyledDiv>
      ) : (
        <LoadingSpinner size={"sm"} />
      )}
    </>
  );
};

const StyledDiv = styled.div`
  border: 1px solid black;
`;

export default ProfilSuggestion;
