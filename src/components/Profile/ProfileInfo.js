import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";

const ProfileInfo = (props) => {
  return (
    <StyledDiv>
      <p>Name: {props.user.firstName + " " + props.user.lastName}</p>
      <p>Phone number: {props.user.phone}</p>
      <p>Date of Birth: {props.user.DOB}</p>
      <p>Address: {props.user.address + " " + props.user.city}</p>
      <p>Gender: {props.user.gender}</p>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  border: 1px solid black;
  padding 10px;
  margin: 0 50px;
`;

export default ProfileInfo;