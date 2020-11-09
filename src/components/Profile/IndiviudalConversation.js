import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import SendMessage from "./SendMessage";
import IndividualMessage from "./IndividualMessage";

const IndividualConversation = ({ conversation }) => {
  const currentUser = useSelector((state) => state.user.user);

  const [toggleConversation, setToggleConversation] = React.useState(false);

  const currentUserName =
    conversation.user1 === currentUser._id
      ? conversation.user2Name
      : conversation.user1Name;

  const handleToggle = (ev) => {
    ev.preventDefault();
    setToggleConversation(!toggleConversation);
  };

  return (
    <ConversationContainer>
      <ToggleConvoButton onClick={handleToggle}>
        {currentUserName}
      </ToggleConvoButton>
      {conversation.messages.map((message) => {
        return (
          <>
            {toggleConversation ? (
              <IndividualMessage message={message} />
            ) : null}
          </>
        );
      })}
      {toggleConversation ? <SendMessage /> : null}
    </ConversationContainer>
  );
};

const ToggleConvoButton = styled.button`
  display: block;
  width: 100%;
  border: none;
  background-color: ${COLORS.lightGray};
  font-weight: bold;
  border-radius: 5px;
`;
const ConversationContainer = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
`;

export default IndividualConversation;
