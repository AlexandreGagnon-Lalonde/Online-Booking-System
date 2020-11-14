import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from '../../constant';

import IndividualConversation from "./IndiviudalConversation";
import SendMessage from "./SendMessage";

const ProfileMessages = ({ currentUser, message }) => {
const messageState = useSelector((state) => state.message);
  console.log(currentUser)
  return (
    <ConversationsContainer>
      {currentUser ? (
        currentUser.conversations.length > 0 ? (
          message.map((conversation, convoIndex) => {
            return (
              <IndividualConversation key={conversation._id} conversation={conversation} indexOfToggle={messageState.toggleIndex} index={convoIndex} />
            );
          })
        ) : (
          <p>No Conversations</p>
        )
      ) : null}
      {!currentUser && <SendMessage />}
    </ConversationsContainer>
  );
};
// !currentUser && <SendMessage /> === currentUser ? null : <SendMessage />
const ConversationsContainer = styled.div`
background-color: ${COLORS.mediumGray};
border-radius: 5px;
flex: 1;
padding: 10px;
margin: 25px 25px 0 0;
`;

export default ProfileMessages;
