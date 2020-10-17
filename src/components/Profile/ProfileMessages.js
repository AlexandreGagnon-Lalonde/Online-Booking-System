import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import IndividualConversation from "./IndiviudalConversation";

const ProfileMessages = () => {
  const userState = useSelector((state) => state.user.user);
  const otherUserState = useSelector((state) => state.user.otherUser);

  return (
    <div>
      {userState.Conversations.length > 0
        ? userState.Conversations.map((conversationObject) => {
            return (
              <IndividualConversation
                conversation={conversationObject.messages}
              />
            );
          })
        : <p>No Conversations</p>}
    </div>
  );
};

export default ProfileMessages;
