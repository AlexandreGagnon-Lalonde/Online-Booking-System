import React from "react";
import styled from "styled-components";
import WorkoutForm from "./WorkoutForm";
import Comments from "./Comments";

const WorkoutComments = () => {
  return (
    <WorkoutContainer>
      <WorkoutForm />
      <Comments />
    </WorkoutContainer>
  );
};

const WorkoutContainer = styled.div``;

export default WorkoutComments;
