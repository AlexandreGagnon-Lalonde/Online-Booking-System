import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "../../constant";

const LoggedOutHeader = () => {
  return (
    <NavContainer>
      <StyledLink to="/">Home</StyledLink>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  background-color: ${COLORS.darkGray};
`;
const StyledLink = styled(Link)`
  color: ${COLORS.beige};
`

export default LoggedOutHeader;
