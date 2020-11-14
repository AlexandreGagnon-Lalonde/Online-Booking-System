import React from "react";
import styled from "styled-components";
import { COLORS } from '../../constant';

import { useSelector, useDispatch } from "react-redux";

const ProfileInfo = ({user}) => {
  console.log(user)
  return (
    <StyledDiv>
      <p>Name: {user.firstName + " " + user.lastName}</p>
      <p>Phone number: {user.phone}</p>
      <p>Date of Birth: {user.DOB}</p>
      <p>Address: {user.address + " " + user.city}</p>
      <p>Gender: {user.gender}</p>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  border-radius: 5px;
  background-color: ${COLORS.mediumGray};
  padding 10px;
  margin: 25px;
`;

export default ProfileInfo;