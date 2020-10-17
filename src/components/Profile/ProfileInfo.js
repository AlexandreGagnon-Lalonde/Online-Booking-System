import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";

const ProfileInfo = () => {
  const userState = useSelector((state) => state.user.user);
  const otherUserState = useSelector((state) => state.user.otherUser)

  return (
    <StyledDiv>
      <p>Name: {userState.firstName + ' ' + userState.lastName}</p>
      <p>Phone number: {userState.phone}</p>
      <p>Date of Birth: {userState.DOB}</p>
      <p>Address: {userState.address + ' ' + userState.city}</p>
      <p>Gender: {userState.gender}</p>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  border: 1px solid black;
  padding 10px;
  margin: 0 50px;
`

export default ProfileInfo