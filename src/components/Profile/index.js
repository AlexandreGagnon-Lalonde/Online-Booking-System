import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  requestUser,
  receiveOtherUser,
  receiveUserError,
} from "../../reducers/action";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { SERVER_URL } from "../../constant";

import LoggedInHeader from "../Header/LoggedInHeader";
import ProfileInfo from "./ProfileInfo";
import ProfileMessages from "./ProfileMessages";
import ProfileClasses from "./ProfileClasses";
import ProfilSuggestion from "./ProfilSuggestion";

const Profile = () => {
  const userStatus = useSelector((state) => state.user.status);
  const currentUser = useSelector((state) => state.user.user);
  const otherUser = useSelector((state) => state.user.otherUser);
  const suggestionState = useSelector((state) => state.suggestion.suggestion);

  const history = useHistory();

  const dispatch = useDispatch();

  if (!localStorage.getItem("currentUserId")) {
    history.push("/");
  }

  // gets me the _id of user from url
  let currentProfileId = window.location.href.split("/").pop();
  // change id to email
  let currentProfileEmail = Buffer.from(currentProfileId, "base64").toString(
    "ascii"
  );
  console.log(!otherUser);

  React.useEffect(() => {
    if (!otherUser || currentProfileId !== otherUser._id) {
      console.log("looking for other user");
      // dispatch(requestUser());

      fetch(SERVER_URL + `/api/getuser/${currentProfileEmail}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("then", data.user);
          dispatch(receiveOtherUser(data.user));
          localStorage.setItem("otherUserId", data.user._id);
        })
        .catch((err) => {
          console.log(err);
          dispatch(receiveUserError());
        });
    }
  }, [currentProfileId]);

  return (
    <>
      {!otherUser || currentProfileId !== otherUser._id ? (
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
