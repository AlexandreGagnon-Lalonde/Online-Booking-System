import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import SendMessage from "./SendMessage";
import IndividualMessage from "./IndividualMessage";
import { toggleIndex } from "../../reducers/action";

let toggled;

const IndividualConversation = ({ conversation, indexOfToggle, index }) => {
  const currentUser = useSelector((state) => state.user.user);

  // const [toggleConversation, setToggleConversation] = React.useState(false);

  const dispatch = useDispatch();

  toggled = indexOfToggle === index;

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
    dispatch(toggleIndex(index));
    // setToggleConversation(!toggleConversation);
  };

  return (
    <ConversationContainer>
      <ToggleConvoButton onClick={handleToggle}>
        {otherUserName}
      </ToggleConvoButton>
      {toggled && (
        <>
          {conversation.messages.map((message) => {
            return (
              <>
                {toggled && (
                  <IndividualMessage
                    message={message}
                    conversationId={conversation._id}
                  />
                )}
              </>
            );
          })}
          <SendMessage otherUserId={otherUserId} />
        </>
      )}
    </ConversationContainer>
  );
};
console.log(toggled)
const ToggleConvoButton = styled.button`
  display: block;
  width: 100%;
  border: none;
  background-color: ${toggled ? COLORS.orange : COLORS.beige};
  color: ${toggled ? COLORS.lightGray : COLORS.orange};
  font-weight: bold;
  border-radius: 5px;

  &:hover {
  }
`;
const ConversationContainer = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
`;

export default IndividualConversation;
