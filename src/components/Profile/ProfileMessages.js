import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import IndividualConversation from "./IndiviudalConversation";
import SendMessage from "./SendMessage";

const ProfileMessages = (props) => {
  const userState = useSelector((state) => state.user.user);
  const otherUserState = useSelector((state) => state.user.otherUser);

  return (
    <ConversationsContainer>
      {props.currentUser ? (
        userState.conversations.length > 0 ? (
          props.message.map((conversation) => {
            console.log(conversation.messages)
            return (
              <IndividualConversation
                conversation={conversation.messages}
              />
            );
          })
        ) : (
          <p>No Conversations</p>
        )
      ) : null}
      {props.currentUser ? null : <SendMessage />}
    </ConversationsContainer>
  );
};

const ConversationsContainer = styled.div`
  border: 1px solid red;
`

export default ProfileMessages;
