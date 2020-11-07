import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../../constant";
import IndividualClasses from "./IndividualClasses";

const ProfileClasses = ({ user }) => {
  return (
    <ClassesContainer>
      {user.classes.length > 0 ? (
        <>
          <ClassesTitle>Classes</ClassesTitle>
          <IndividualClassesContainer>
            {user.classes.map((classe) => {
              return <IndividualClasses classe={classe} />;
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
margin: 10px 50px;
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
