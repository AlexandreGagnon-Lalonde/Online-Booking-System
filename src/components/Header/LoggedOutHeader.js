import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoggedOutHeader = () => {
  return <Link to="/">Home</Link>;
};

export default LoggedOutHeader;
