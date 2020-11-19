import React from "react";
import styled from "styled-components";
import ProfileMessages from "./ProfileMessages";
import ProfileWorkout from "./ProfileWorkout";
import { useSelector } from "react-redux";

const RightProfile = ({ currentProfileId, currentUserId }) => {
  const messageState = useSelector((state) => state.message);
  const suggestionState = useSelector((state) => state.suggestion.suggestion);
  const currentUser = useSelector((state) => state.user.user);

  return (
    <Container>
      <ProfileMessages
        currentUser={currentProfileId === currentUserId ? currentUser : false}
        message={messageState.message}
      />
      {currentUser.admin && currentProfileId === currentUserId && (
        <ProfileWorkout suggestions={suggestionState} />
      )}
    </Container>
  );
};
const Container = styled.div`
  flex: 2;
  width: 100%;
`;

export default RightProfile;
