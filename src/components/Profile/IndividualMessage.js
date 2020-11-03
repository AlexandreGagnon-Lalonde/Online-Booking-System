import React from "react";
import styled from "styled-components";

const IndividualMessage = ({ message }) => {
  return (
    <div>
      <p>{message.message}</p>
    </div>
  );
};

export default IndividualMessage;
