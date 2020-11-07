import React from "react";
import styled from "styled-components";
import { COLORS } from '../../constant'

const IndividualClasses = ({ classe }) => {
  return (
    <IndiClassContainer>
      <p>{classe}</p>
      <p>date</p>
      <p>workout</p>
    </IndiClassContainer>
  );
};

const IndiClassContainer = styled.div`
  background-color: ${COLORS.lightGray};
  border-radius: 5px;
  margin: 10px;
  color: ${COLORS.darkGray};
  padding: 5px;
`

export default IndividualClasses;
