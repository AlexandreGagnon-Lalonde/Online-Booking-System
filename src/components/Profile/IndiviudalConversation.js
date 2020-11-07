import React from "react";
import styled from "styled-components";
import { COLORS } from '../../constant'
import IndividualMessage from "./IndividualMessage";

const IndividualConversation = ({ conversation }) => {
  const [toggleConversation, setToggleConversation] = React.useState(true);

  const handleToggle = (ev) => {
    ev.preventDefault();

    setToggleConversation(!toggleConversation);
  };
  return (
    <div>
      {conversation.map((message) => {
        return (
          <>
            <ToggleConvoButton onClick={handleToggle}>
              Conversation with xyz
            </ToggleConvoButton>
            {toggleConversation ? (
              <IndividualMessage message={message} />
            ) : null}
          </>
        );
      })}
    </div>
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

export default IndividualConversation;
