import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const IndividualMessage = ({ message }) => {
  const currentUser = useSelector((state) => state.user.user);

  return (
    <div>
      {message.from === currentUser._id ? (
        <MessageFromCurrentUser>{message.message}</MessageFromCurrentUser>
      ) : (
        <MessageNotFromCurrentUser>{message.message}</MessageNotFromCurrentUser>
      )}
    </div>
  );
};

const MessageFromCurrentUser = styled.p`
  text-align: right;
`;
const MessageNotFromCurrentUser = styled.p`
  text-align: left;
`;

export default IndividualMessage;
