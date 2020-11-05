import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from '../../constant';

const WelcomePage = () => {
  return (
    <CredentialsContainer>
      <WelcomingText>welcome to COMPANYNAME are you a member, no? sign up, yes? login</WelcomingText>
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
const WelcomingText = styled.p`
  margin-bottom: 40px;
  min-width: 200px;
  width: 33%;
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

  &:hover {
    text-decoration: none;
  }
`

export default WelcomePage