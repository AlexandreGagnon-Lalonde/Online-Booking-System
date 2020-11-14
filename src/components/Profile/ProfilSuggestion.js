import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { COLORS } from '../../constant';

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
            <p>No suggestions from users</p>
          )}
        </StyledDiv>
      ) : (
        <LoadingSpinner size={"sm"} />
      )}
    </>
  );
};

const StyledDiv = styled.div`
border-radius: 5px;
background-color: ${COLORS.mediumGray};
padding 10px;
margin: 0 25px 25px 25px;
`;

export default ProfilSuggestion;
