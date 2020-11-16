import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import SendMessage from "./SendMessage";
import IndividualMessage from "./IndividualMessage";
import { toggleIndex } from "../../reducers/action";

const IndividualConversation = ({ conversation, indexOfToggle, index }) => {
  const currentUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const toggled = indexOfToggle === index;

  const otherUserName =
    conversation.user1 === currentUser._id
      ? conversation.user2Name
      : conversation.user1Name;

  const otherUserId =
    conversation.user1 === currentUser._id
      ? conversation.user2
      : conversation.user1;

  const handleToggle = (ev) => {
    ev.preventDefault();
    if (!toggled || indexOfToggle === -1) {
      dispatch(toggleIndex(index));
    } else {
      dispatch(toggleIndex(-1));
    }
  };

  return (
    <ConversationContainer>
      <ToggleConvoButton
        onClick={handleToggle}
        style={{
          backgroundColor: `${toggled ? COLORS.beige : COLORS.lightGray}`,
          color: `${toggled ? COLORS.orange : COLORS.mediumGray}`,
          height: `${toggled ? "40px" : "24px"}`,
        }}
      >
        {otherUserName}
      </ToggleConvoButton>
      {toggled && (
        <ConversationContent>
          {conversation.messages.map((message) => {
            return (
              <IndividualMessage
                message={message}
                conversationId={conversation._id}
              />
            );
          })}
          <SendMessage otherUserId={otherUserId} />
        </ConversationContent>
      )}
    </ConversationContainer>
  );
};

const ToggleConvoButton = styled.button`
  display: block;
  width: 100%;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.3s;
`;
const ConversationContainer = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
`;
const ConversationContent = styled.div``;

export default IndividualConversation;
