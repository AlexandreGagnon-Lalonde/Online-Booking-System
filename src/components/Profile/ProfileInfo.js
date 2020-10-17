import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";

const ProfileInfo = () => {
  const userState = useSelector((state) => state.user.user);
  const otherUserState = useSelector((state) => state.user.otherUser)

  return (
    <StyledDiv>
      <p>{userState.firstName + ' ' + userState.lastName}</p>
      <p>{userState.phone}</p>
      <p>{userState.DOB}</p>
      <p>{userState.address + ' ' + userState.city}</p>
      <p>{userState.gender}</p>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  border: 1px solid black;
  padding 10px;
`

export default ProfileInfo