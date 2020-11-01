import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import IndividualConversation from "./IndiviudalConversation";
import SendMessage from "./SendMessage";

const ProfileMessages = (props) => {
  const userState = useSelector((state) => state.user.user);
  const otherUserState = useSelector((state) => state.user.otherUser);

  return (
    <div>
      {props.currentUser ? (
        userState.Conversations.length > 0 ? (
          userState.Conversations.map((conversationObject) => {
            return (
              <IndividualConversation
                conversation={conversationObject.messages}
              />
            );
          })
        ) : (
          <p>No Conversations</p>
        )
      ) : null}
      {props.currentUser ? null : <SendMessage />}
    </div>
  );
};

export default ProfileMessages;
