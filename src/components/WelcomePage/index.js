import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WelcomePage = () => {
  return (
    <>
      <Link to={"/signup"}>Sign Up</Link>
      <Link to={"login"}>Log In</Link>
    </>
  )
}

export default WelcomePage