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
  height: 50px;
`;
const StyledLink = styled(Link)`
  color: ${COLORS.beige};
  font-size: 2em;
  font-weight: bold;
  margin: 10px;
  transition: all 0.3s;
  
  &:hover {
    color: ${COLORS.orange};
    text-decoration: none;
  }
`

export default LoggedOutHeader;
