import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import IndividualSuggestion from "./IndividualSuggestion";

const ProfilSuggestion = () => {
  const suggestionState = useSelector((state) => state.suggestion.suggestion);

  React.useEffect(() => {

  }, [suggestionState])
  
  return (
    <StyledDiv>
      {
        suggestionState ? suggestionState.map(suggestion => {
          return <IndividualSuggestion suggestion={suggestion} />
        }) : <p>No suggestions</p>
      }
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  border: 1px solid black;
`

export default ProfilSuggestion