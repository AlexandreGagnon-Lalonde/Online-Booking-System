import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import IndividualSuggestion from "./IndividualSuggestion";
import LoadingSpinner from "../LoadingSpinner";

const ProfilSuggestion = () => {
  const suggestionState = useSelector((state) => state.suggestion.suggestion);
  console.log(suggestionState)
  React.useEffect(() => {
    console.log(suggestionState)
  }, [suggestionState]);

  return (
    <>
      {suggestionState ? (
        <StyledDiv>
          {suggestionState.length > 0 ? (
            suggestionState.map((suggestion) => {
              return <IndividualSuggestion key={suggestion._id} suggestion={suggestion} />;
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
