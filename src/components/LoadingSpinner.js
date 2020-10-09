import React from "react";
import styled, { css, keyframes } from "styled-components";
import { ImSpinner9 } from "react-icons/im";

const LoadingSpinner = (props) => {
  return (
    <SpinnerBox>
      <ImSpinner9
        size={
          props.size === "sm"
            ? "3em"
            : props.size === "md"
            ? "5em"
            : props.size === "lg"
            ? "7em"
            : "1em"
        }
      />
    </SpinnerBox>
  );
};

const SpinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const SpinnerBox = styled.div`
  display: inline-block;
  animation: ${SpinAnimation} 1s linear infinite;
`;

export default LoadingSpinner;
