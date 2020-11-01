import React from "react";
import styled from "styled-components";

const IndividualMessage = (message) => {
  console.log(message)
  return (
    <div>
      <p>{message.message.message}</p>
    </div>
  )
}

export default IndividualMessage