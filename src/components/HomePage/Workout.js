import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from '../../constant';

const Workout = () => {
  const workoutState = useSelector((state) => state.workout)

  const WOD = workoutState.workout;

  return (
  <WorkoutStyled>{WOD ? WOD : 'No workout for today'}</WorkoutStyled>
  )
}

const WorkoutStyled = styled.p`
  color: ${COLORS.beige};
`

export default Workout