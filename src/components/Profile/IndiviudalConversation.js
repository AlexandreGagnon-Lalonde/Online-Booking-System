import React from "react";
import styled from "styled-components";

import IndividualMessage from './IndividualMessage';

const IndividualConversation = (conversation) => {
  return (
    <div>
      {conversation.conversation.map(message => {
        console.log(message)
        return <IndividualMessage message={message} />
      })}
    </div>
  )
}

export default IndividualConversation