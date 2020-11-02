import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "../../constant";

const LoggedOutHeader = () => {
  return (
    <NavContainer>
      <Link to="/">Home</Link>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  background-color: ${COLORS.darkGray};
`;

export default LoggedOutHeader;
