import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Header from '../Header/index';
import Calendar from './Calendar';
import WorkoutBox from './WorkoutBox';
import SuggestionBox from './SuggestionBox';

const HomePage = () => {

  return (
    <>
      <Header />
      <ContentContainer>
        <Calendar />
        <RightContainer>
          <WorkoutBox />
          <SuggestionBox />
        </RightContainer>
      </ContentContainer>
    </>
  )
}

const ContentContainer = styled.div`
  display: flex;
`
const RightContainer = styled.div`
  flex: 1;
`

export default HomePage