import React from "react";
import styled from "styled-components";

const IndividualClasses = (classe) => {
  return (
    <div>
      <p>{classe.date}</p>
      <p>{classe.workout}</p>
    </div>
  )
}

export default IndividualClasses