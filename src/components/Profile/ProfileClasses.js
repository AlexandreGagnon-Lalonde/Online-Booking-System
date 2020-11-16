import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../../constant";
import IndividualClasses from "./IndividualClasses";

const ProfileClasses = ({ user }) => {
  const workoutState = useSelector((state) => state.workout);

  console.log(workoutState.allWorkouts)
  const lastFiveClasses = user.classes.slice(Math.max(user.classes.length - 5, 0)) 
console.log(lastFiveClasses)
  return (
    <ClassesContainer>
      {user.classes.length > 0 ? (
        <>
          <ClassesTitle>Classes</ClassesTitle>
          <IndividualClassesContainer>
            {lastFiveClasses.map((classe) => {
              const workoutObject = workoutState.allWorkouts.find(workout => workout._id === classe._id);
              return <IndividualClasses key={classe._id} classe={classe} workout={workoutObject} />;
            })}
          </IndividualClassesContainer>
        </>
      ) : (
        <ClassesTitle>No Classes</ClassesTitle>
      )}
    </ClassesContainer>
  );
};

const ClassesContainer = styled.div`
border-radius: 5px;
background-color: ${COLORS.mediumGray};
padding 10px;
margin: 0 25px 25px 25px;
`;
const ClassesTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5em;
  color: ${COLORS.orange};
`;
const IndividualClassesContainer = styled.div`
display: grid;
align-items: center;
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

`

export default ProfileClasses;
