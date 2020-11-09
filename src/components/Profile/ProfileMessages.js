import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from '../../constant';

import IndividualConversation from "./IndiviudalConversation";
import SendMessage from "./SendMessage";

const ProfileMessages = ({ currentUser, message }) => {

  console.log(currentUser)
  return (
    <ConversationsContainer>
      {currentUser ? (
        currentUser.conversations.length > 0 ? (
          message.map((conversation) => {
            return (
              <IndividualConversation conversation={conversation} />
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
background-color: ${COLORS.mediumGray};
border-radius: 5px;
flex: 1;
padding: 10px;
margin: 0 10px;
`;

export default ProfileMessages;
