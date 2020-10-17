import React from "react";
import styled from "styled-components";

import IndividualMessage from './IndividualMessage';

const IndividualConversation = (messages) => {
  
  return (
    <div>
      {messages.map(message => {
        return <IndividualMessage message={message} />
      })}
    </div>
  )
}

export default IndividualConversation