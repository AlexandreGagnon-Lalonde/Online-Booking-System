import React from "react";
import styled from "styled-components";
import ProfileInfo from "./ProfileInfo";
import ProfileClasses from "./ProfileClasses";
import ProfilSuggestion from "./ProfilSuggestion";
import { useSelector } from "react-redux";

const LeftProfile = ({ currentProfileId, currentUserId }) => {
  const currentUser = useSelector((state) => state.user.user);
  const suggestionState = useSelector((state) => state.suggestion.suggestion);
  const otherUser = useSelector((state) => state.user.otherUser);

  return (
    <Container>
      <ProfileInfo
        user={currentProfileId === currentUserId ? currentUser : otherUser}
      />
      <ProfileClasses
        user={currentProfileId === currentUserId ? currentUser : otherUser}
      />
      {currentUser.admin && currentProfileId === currentUserId && (
        <ProfilSuggestion suggestions={suggestionState} />
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: 3;
  width: 100%;
`;

export default LeftProfile;
