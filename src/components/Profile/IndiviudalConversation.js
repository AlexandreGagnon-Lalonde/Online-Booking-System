import React from "react";
import styled from "styled-components";

import IndividualMessage from "./IndividualMessage";

const IndividualConversation = ({ conversation }) => {
  return (
    <div>
      {conversation.map((message) => {
        return (
          <>
            <p>Conversation with xyz</p>
            <IndividualMessage message={message} />
          </>
        );
      })}
    </div>
  );
};

export default IndividualConversation;
