import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../LoadingSpinner";
import LoggedInHeader from "../Header/LoggedInHeader";
import LeftProfile from "./LeftProfile";
import RightProfile from "./RightProfile";
import { useHistory, useParams } from "react-router-dom";
import { SERVER_URL } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import {
  requestUser,
  receiveOtherUser,
  receiveUserError,
} from "../../reducers/action";

const Profile = () => {
  const userState = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user.user);
  const otherUser = useSelector((state) => state.user.otherUser);
  const messageState = useSelector((state) => state.message);
  const workoutState = useSelector((state) => state.workout);
  const windowState = useSelector((state) => state.window);

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  if (!localStorage.getItem("currentUserId")) {
    history.push("/");
  }

  const isUserOnMobile = windowState.width < 600;
  const currentProfileId = params.id;
  const currentUserId = currentUser._id;
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
      (!otherUser && currentProfileId !== currentUserId) ? (
        <LoadingSpinner size={"lg"} />
      ) : (
        <>
          <LoggedInHeader />
          <ProfileContainer
            style={isUserOnMobile ? { flexDirection: "column-reverse" } : null}
          >
            <LeftProfile
              currentProfileId={currentProfileId}
              currentUserId={currentUserId}
              style={isUserOnMobile ? { width: "100%" } : null}
            />
            <RightProfile
              currentProfileId={currentProfileId}
              currentUserId={currentUserId}
              style={isUserOnMobile ? { width: "100%" } : null}
            />
          </ProfileContainer>
        </>
      )}
    </>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

export default Profile;
