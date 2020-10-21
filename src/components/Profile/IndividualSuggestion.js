import React from "react";
import styled from "styled-components";

const IndividualSuggestion = (props) => {
  console.log('props', props)
  return (
    <StyledDiv>
      <p>{props.suggestion.suggestion}</p>
      <p>{props.suggestion.from}</p>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  border: 1px solid black;
  margin: 5px;
`

export default IndividualSuggestion