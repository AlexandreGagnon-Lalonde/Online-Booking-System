import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Header from '../Header/index';
import Calendar from './Calendar';
import WorkoutBox from './WorkoutBox';
import SuggestionBox from './SuggestionBox';

const HomePage = () => {
  const userState = useSelector((state) => state.user)

  React.useEffect(() => {

  }, [userState])

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