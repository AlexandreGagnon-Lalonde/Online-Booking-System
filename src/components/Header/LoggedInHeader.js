import React from "react";
import styled from "styled-components";
import HeaderCommands from "./HeaderCommands";
import { Link } from "react-router-dom";
import { COLORS } from "../../constant";

const LoggedInHeader = () => {
  return (
    <NavContainer>
      <StyledHomeLink to="/homepage">OBA</StyledHomeLink>
      <HeaderCommands />
    </NavContainer>
  );
};

const NavContainer = styled.div`
  background-color: ${COLORS.darkGray};
  display: flex;
  justify-content: space-between;
  height: 50px;
`;
const StyledHomeLink = styled(Link)`
  color: ${COLORS.beige};
  font-size: 2em;
  font-weight: bold;
  margin: 5px 10px;
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.orange};
    text-decoration: none;
  }
`;

export default LoggedInHeader;
