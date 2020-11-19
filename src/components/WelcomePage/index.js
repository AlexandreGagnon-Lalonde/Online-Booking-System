import React from "react";
import styled from "styled-components";
import OBA from "../../OBA.PNG";
import HomeLinks from "./HomeLinks";
import { COLORS } from "../../constant";

const WelcomePage = () => {
  return (
    <CredentialsContainer>
      <LogoImage src={OBA} />
      <HomeLinks />
    </CredentialsContainer>
  );
};

const CredentialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${COLORS.darkGray};
`;
const LogoImage = styled.img`
  margin: -40px 0 40px 0;
  width: 200px;
  text-align: center;
`;

export default WelcomePage;
