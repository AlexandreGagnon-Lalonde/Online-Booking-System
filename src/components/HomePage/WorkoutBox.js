import React from "react";
import styled from "styled-components";
import { COLORS } from '../../constant';
import Workout from './Workout';
import WorkoutComments from './WorkoutComments';

const WorkoutBox = () => {
  
  return (
    <WorkoutContainer>
      <WorkoutTitle>Workout</WorkoutTitle>
      <Workout />
      <WorkoutComments />
    </WorkoutContainer>
  )
}

const WorkoutContainer = styled.div`
border-radius: 5px;
background-color: ${COLORS.mediumGray};
padding 10px;
margin: 25px 25px 10px 0;
`
const WorkoutTitle = styled.h3`

`


export default WorkoutBox