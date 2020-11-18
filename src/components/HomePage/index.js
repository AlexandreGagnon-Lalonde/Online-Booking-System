import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Header from "../Header/index";
import Calendar from "./Calendar";
import WorkoutBox from "./WorkoutBox";
import SuggestionBox from "./SuggestionBox";

const HomePage = () => {
  const windowState = useSelector((state) => state.window);

  return (
    <>
      <Header />
      <ContentContainer
        style={windowState.width < 600 ? { display: "block" } : null}
      >
        <Calendar />
        <RightContainer>
          <WorkoutBox />
          <SuggestionBox />
        </RightContainer>
      </ContentContainer>
    </>
  );
};

const ContentContainer = styled.div`
  display: flex;
`;
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default HomePage;
