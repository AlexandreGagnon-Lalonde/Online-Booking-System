import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constant";
import Workout from "./Workout";
import WorkoutComments from "./WorkoutComments";
import { useSelector } from "react-redux";

const WorkoutBox = () => {
  const windowState = useSelector((state) => state.window);

  return (
    <WorkoutContainer
      style={windowState.width < 600 ? { margin: "0 25px 0 25px" } : null}
    >
      <WorkoutTitle>Workout</WorkoutTitle>
      <Workout />
      <WorkoutComments />
    </WorkoutContainer>
  );
};

const WorkoutContainer = styled.div`
border-radius: 5px;
background-color: ${COLORS.mediumGray};
padding 10px;
margin: 25px 25px 10px 0;
`;
const WorkoutTitle = styled.h3``;

export default WorkoutBox;
