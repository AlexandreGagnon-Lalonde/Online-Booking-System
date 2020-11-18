import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  requestUser,
  receiveOtherUser,
  receiveUserError,
} from "../../reducers/action";
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { SERVER_URL } from "../../constant";
import ProfileWorkout from "./ProfileWorkout";
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
  const workoutState = useSelector((state) => state.workout);
  const windowState = useSelector((state) => state.window);

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
    console.log(workoutState.status);
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
  }, [
    currentProfileId,
    userState.status,
    otherUser,
    messageState.status,
    messageState.toggleIndex,
    workoutState,
  ]);

  return (
    <>
      {!messageState.message ||
      (!otherUser && currentProfileId !== currentUser._id) ? (
        <LoadingSpinner size={"lg"} />
      ) : (
        <>
          <LoggedInHeader />
          <ProfileContainer
            style={
              windowState.width < 600
                ? { flexDirection: "column-reverse" }
                : null
            }
          >
            <LeftGenericProfileContainer
              style={windowState.width < 600 ? { width: "100%" } : null}
            >
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
            </LeftGenericProfileContainer>
            <RightGenericProfileContainer
              style={windowState.width < 600 ? { width: "100%" } : null}
            >
              <ProfileMessages
                currentUser={
                  currentProfileId === currentUser._id ? currentUser : false
                }
                message={messageState.message}
              />
              {currentUser.admin && currentProfileId === currentUser._id ? (
                <ProfileWorkout suggestions={suggestionState} />
              ) : null}
            </RightGenericProfileContainer>
          </ProfileContainer>
        </>
      )}
    </>
  );
};

const LeftGenericProfileContainer = styled.div`
  flex: 3;
`;
const RightGenericProfileContainer = styled.div`
  flex: 2;
`;
const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

export default Profile;
