import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import IndividualConversation from "./IndiviudalConversation";
import SendMessage from "./SendMessage";

const ProfileMessages = ({ currentUser, message }) => {
  return (
    <ConversationsContainer>
      {currentUser ? (
        currentUser.conversations.length > 0 ? (
          message.map((conversation) => {
            return (
              <IndividualConversation conversation={conversation.messages} />
            );
          })
        ) : (
          <p>No Conversations</p>
        )
      ) : null}
      {currentUser ? null : <SendMessage />}
    </ConversationsContainer>
  );
};

const ConversationsContainer = styled.div`
  border: 1px solid red;
`;

export default ProfileMessages;
