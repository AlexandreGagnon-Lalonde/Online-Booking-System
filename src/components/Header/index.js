import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";

const Header = () => {
  const state = useSelector((state) => state.user);

  return (
    <>
      {
      state.status === "Logged In" 
        ? <LoggedInHeader /> 
        : <LoggedOutHeader />
      }
    </>
  );
};

export default Header;
