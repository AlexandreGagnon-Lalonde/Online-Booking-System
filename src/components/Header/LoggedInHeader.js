import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
} from "../../reducers/action";


const LoggedInHeader = () => {
  const userState = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <Link to="/homepage">Home</Link>
      <Link to={`/profile/${userState.user._id}`}>{userState.user.firstName}</Link>
      <button onClick={() => {
        dispatch(logoutUser())
        history.push('/')
      }}>Log out</button>
    </>
  );
};

export default LoggedInHeader;
