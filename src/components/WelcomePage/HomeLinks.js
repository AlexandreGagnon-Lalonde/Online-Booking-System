import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "../../constant";

const HomeLinks = () => {
  return (
    <Links>
      <StyledLink to={"/signup"}>Sign Up</StyledLink>
      <StyledLink to={"/login"}>Log In</StyledLink>
    </Links>
  );
};

const Links = styled.div`
  padding-bottom: 100px;
`;
const StyledLink = styled(Link)`
  color: ${COLORS.beige};
  padding: 15px;
  background-color: ${COLORS.mediumGray};
  font-weight: bold;
  font-size: 2em;
  margin: 25px;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    text-decoration: none;
    color: ${COLORS.orange};
    background-color: ${COLORS.lightGray};
  }
`;

export default HomeLinks;
