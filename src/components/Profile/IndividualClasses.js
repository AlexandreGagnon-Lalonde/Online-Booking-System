import React from "react";
import styled from "styled-components";
import { COLORS } from '../../constant'

const IndividualClasses = ({ classe }) => {
  const classDate = Buffer.from(classe._id, "base64").toString(
    "ascii"
  );
  return (
    <IndiClassContainer>
      <ClassDateStyled>{classDate} - {classe.classTime}</ClassDateStyled>
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
const ClassDateStyled = styled.p`
  color: ${COLORS.darkGray};
  font-weight: bold;
`

export default IndividualClasses;
