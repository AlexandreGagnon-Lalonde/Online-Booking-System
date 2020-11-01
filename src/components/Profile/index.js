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
  let currentProfileId = params.id;
  // change id to email
  let currentProfileEmail = Buffer.from(currentProfileId, "base64").toString(
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

    if (!messageState.message) {
      
      dispatch(requestMessage());

      fetch(SERVER_URL + `/api/getmessages/${currentUser._id}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveMessages(data.message));
        })
        .catch((err) => {
          dispatch(messageError());
        });
    }
  }, [currentProfileId]);
console.log(!messageState.message && (!otherUser || currentProfileId !== otherUser._id))
console.log('message', messageState)
console.log('otherUser', otherUser)
  return (
    <>
      {!messageState.message && (!otherUser || currentProfileId !== otherUser._id) ? (
        <LoadingSpinner size={"lg"} />
      ) : (
        <>
          <LoggedInHeader />
          <ProfileInfo
            user={
              currentProfileId === currentUser._id ? currentUser : otherUser
            }
          />
          <ProfileMessages
            currentUser={currentProfileId === currentUser._id ? true : false}
            message={messageState.message}
          />
          <ProfileClasses
            currentUser={
              currentProfileId === currentUser._id ? currentUser : otherUser
            }
          />
          {currentUser.admin ? <ProfilSuggestion /> : null}
        </>
      )}
    </>
  );
};

export default Profile;
