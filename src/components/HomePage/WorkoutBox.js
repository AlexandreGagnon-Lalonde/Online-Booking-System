import React from "react";
import styled from "styled-components";

import Workout from './Workout';
import WorkoutComments from './WorkoutComments';

const WorkoutBox = () => {
  return (
    <div>
      <h2>Workout</h2>
      <Workout />
      <WorkoutComments />
    </div>
  )
}

export default WorkoutBox