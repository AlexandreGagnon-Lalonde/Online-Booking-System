import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  requestUser,
  receiveOtherUser,
  receiveUserError,
  requestMessage,
  receiveMessages,
  messageError,
} from "../../reducers/action";
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { SERVER_URL } from "../../constant";

import LoggedInHeader from "../Header/LoggedInHeader";
import ProfileInfo from "./ProfileInfo";
import ProfileMessages from "./ProfileMessages";
import ProfileClasses from "./ProfileClasses";
import ProfilSuggestion from "./ProfilSuggestion";

const Profile = () => {
  const userState = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user.user);
  const otherUser = useSelector((state) => state.user.otherUser);
  const messageState = useSelector((state) => state.message);
  const suggestionState = useSelector((state) => state.suggestion.suggestion);

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  if (!localStorage.getItem("currentUserId")) {
    history.push("/");
  }

  // gets me the _id of user from url
  const currentProfileId = params.id;
  // change id to email
  const currentProfileEmail = Buffer.from(currentProfileId, "base64").toString(
    "ascii"
  );

  React.useEffect(() => {
    if (!otherUser || currentProfileId !== otherUser._id) {
      dispatch(requestUser());

      fetch(SERVER_URL + `/api/getuser/${currentProfileEmail}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveOtherUser(data.user));
          localStorage.setItem("otherUserId", data.user._id);
        })
        .catch((err) => {
          dispatch(receiveUserError());
        });
    }

    // if (!messageState.message) {
    //   dispatch(requestMessage());

    //   fetch(SERVER_URL + `/api/getmessages/${currentUser._id}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       dispatch(receiveMessages(data.message));
    //     })
    //     .catch((err) => {
    //       dispatch(messageError());
    //     });
    // }
  }, [currentProfileId, userState.status, otherUser, messageState.status, messageState.toggleIndex]);

  return (
    <>
      {!messageState.message ||
      (!otherUser && currentProfileId !== currentUser._id) ? (
        <LoadingSpinner size={"lg"} />
      ) : (
        <>
          <LoggedInHeader />
          <ProfileContainer>
            <GenericProfileContainer>
              <ProfileInfo
                user={
                  currentProfileId === currentUser._id ? currentUser : otherUser
                }
              />

              <ProfileClasses
                user={
                  currentProfileId === currentUser._id ? currentUser : otherUser
                }
              />
              {currentUser.admin && currentProfileId === currentUser._id ? (
                <ProfilSuggestion suggestions={suggestionState} />
              ) : null}
            </GenericProfileContainer>
            <ProfileMessages
              currentUser={
                currentProfileId === currentUser._id ? currentUser : false
              }
              message={messageState.message}
            />
          </ProfileContainer>
        </>
      )}
    </>
  );
};

const GenericProfileContainer = styled.div`
  flex: 2;
`;
const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;
export default Profile;
