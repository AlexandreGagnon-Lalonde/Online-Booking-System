import React from "react";
import styled from "styled-components";

import Header from '../Header/index';
import Calendar from './Calendar';
import WorkoutBox from './WorkoutBox';
import SuggestionBox from './SuggestionBox';

const HomePage = () => {
  return (
    <>
      <Header />
      <Calendar />
      <WorkoutBox />
      <SuggestionBox />
    </>
  )
}

export default HomePage