import React from "react";
import styled from "styled-components";

const IndividualMessage = (message) => {
  return (
    <div>
      <p>{message.from}</p>
      <p>{message.message}</p>
      <p>{message.date}</p>
    </div>
  )
}

export default IndividualMessage