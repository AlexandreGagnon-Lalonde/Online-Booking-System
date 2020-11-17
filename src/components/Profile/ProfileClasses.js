import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../../constant";
import IndividualClasses from "./IndividualClasses";

const ProfileClasses = ({ user }) => {
  const workoutState = useSelector((state) => state.workout);

  const userClasses = user.classes.map((classe) => {
    const newDate = new Date(
      Buffer.from(classe._id, "base64").toString("ascii")
    );
    return {
      ...classe,
      date: newDate.toString().slice(0, 15),
      dateSeparator: newDate,
    };
  });
  const userClassesSorted = userClasses.sort(
    (a, b) => a.dateSeparator - b.dateSeparator
  );
  const lastFiveClasses = userClassesSorted.slice(
    Math.max(userClassesSorted.length - 5, 0)
  );

  return (
    <ClassesContainer>
      {user.classes.length > 0 ? (
        <>
          <ClassesTitle>Classes</ClassesTitle>
          <IndividualClassesContainer>
            {lastFiveClasses.map((classe) => {
              const workoutObject = workoutState.allWorkouts.find(
                (workout) => workout._id === classe._id
              );
              return (
                <IndividualClasses
                  key={classe._id}
                  classe={classe}
                  workout={workoutObject}
                />
              );
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
  color: ${COLORS.lightGray};
`;
const IndividualClassesContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

export default ProfileClasses;
