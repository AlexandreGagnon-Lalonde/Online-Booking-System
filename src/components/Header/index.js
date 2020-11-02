import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";

const Header = () => {
  const userState = useSelector((state) => state.user);
  
  return (
    <>
      {
      userState.status === "Logged In" 
        ? <LoggedInHeader /> 
        : <LoggedOutHeader />
      }
    </>
  );
};

export default Header;
