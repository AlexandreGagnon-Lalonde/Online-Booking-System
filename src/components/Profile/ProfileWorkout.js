import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";
import moment from "moment";
import {
  requestWorkout,
  receiveWorkout,
  receiveWorkoutError,
} from "../../reducers/action";
import { COLORS } from "../../constant";
import LoadingSpinner from "../LoadingSpinner";

const ProfileWorkout = () => {
  const workoutState = useSelector((state) => state.workout);
  const currentUser = useSelector((state) => state.user.user);

  const [workout, setWorkout] = React.useState("");

  const dispatch = useDispatch();

  const date = new Date();
  const classDay = moment(date).format("ddd MMM DD YYYY").toString();
  const classId = Buffer.from(classDay).toString("base64");
  const workoutExist = workoutState.workout;

  const handlePost = (ev) => {
    ev.preventDefault();

    dispatch(requestWorkout());

    fetch(SERVER_URL + `/api/postworkout`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: classId,
        workout,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveWorkout(data.workout));
        setWorkout("");
        document.getElementById("workout-form").reset();
      })
      .catch((err) => {
        dispatch(receiveWorkoutError());
      });
  };
  
  return (
    <PostWorkoutContainer>
      <StyledWorkoutTitle>Post a workout for today</StyledWorkoutTitle>
      <WorkoutForm onSubmit={handlePost} id={"workout-form"}>
        <SubmitWorkoutInput
          type={"text"}
          placeholder={"Write the workout"}
          onChange={(ev) => setWorkout(ev.currentTarget.value)}
          required
        />
        <SubmitWorkoutButton disabled={workoutExist || !workout}>
          Post workout
        </SubmitWorkoutButton>
      </WorkoutForm>
    </PostWorkoutContainer>
  );
};

const PostWorkoutContainer = styled.div`
  border-radius: 5px;
  background-color: ${COLORS.mediumGray};
  padding 10px;
  margin: 25px 25px 0 0;
`;
const StyledWorkoutTitle = styled.h3``;
const WorkoutForm = styled.form``;
const SubmitWorkoutButton = styled.button`
  border: 1px solid ${COLORS.orange};
  border-radius: 5px;
  font-size: 1.5em;
  font-weight: bold;
  color: ${COLORS.orange};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.mediumGray};
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: all 0.3s;

  &:hover {
    color: ${COLORS.lightGray};
    border: 1px solid ${COLORS.lightGray};
  }
`;
const SubmitWorkoutInput = styled.input`
  border-radius: 5px;
  padding-left: 5px;
  background-color: ${COLORS.lightGray};
  color: ${COLORS.darkGray};
  width: 100%;
  margin: 10px 0 0 0;

  &::placeholder {
    color: ${COLORS.darkGray};
  }
`;

export default ProfileWorkout;
