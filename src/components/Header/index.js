import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const state = useSelector((state) => state.user);

  if (state.status === "Logged In") {
    return (
      <>
        <Link to="/homepage">Home</Link>
        <Link to={`/profile/${state.user._id}`}>{state.user.firstName}</Link>
      </>
    );
  } else {
    return <Link to="/">Home</Link>;
  }
};

export default Header;
