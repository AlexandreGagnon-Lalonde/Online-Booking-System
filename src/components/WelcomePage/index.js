import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from '../../constant';

const WelcomePage = () => {
  return (
    <CredentialsContainer>
      <Links>
        <StyledLink to={"/signup"}>Sign Up</StyledLink>
        <StyledLink to={"/login"}>Log In</StyledLink>
      </Links>
    </CredentialsContainer>
  )
}

const CredentialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${COLORS.darkGray};
`
const Links = styled.div`
  padding-bottom: 100px;
`
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
`

export default WelcomePage