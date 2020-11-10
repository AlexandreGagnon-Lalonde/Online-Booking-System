import React from "react";
import styled from "styled-components";
import { COLORS } from '../../constant';
import Workout from './Workout';
import WorkoutComments from './WorkoutComments';

const WorkoutBox = () => {
  return (
    <WorkoutContainer>
      <h2>Workout</h2>
      <Workout />
      <WorkoutComments />
    </WorkoutContainer>
  )
}

const WorkoutContainer = styled.div`
border-radius: 5px;
background-color: ${COLORS.mediumGray};
padding 10px;
margin: 10px 50px;
`

export default WorkoutBox