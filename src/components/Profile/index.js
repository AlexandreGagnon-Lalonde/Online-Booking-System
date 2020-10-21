import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../reducers/action";
import { useHistory } from "react-router-dom";

import LoggedInHeader from "../Header/LoggedInHeader";
import ProfileInfo from './ProfileInfo';
import ProfileMessages from './ProfileMessages';
import ProfileClasses from './ProfileClasses';
import ProfilSuggestion from './ProfilSuggestion';

const Profile = () => {
  const userState = useSelector((state) => state.user.user);
  const otherUserState = useSelector((state) => state.user.otherUser);

  const history = useHistory();

  if (!localStorage.getItem('currentUserId')) {
    history.push('/')
  }

  // gets me the _id of user from url
  // console.log(window.location.href.split("/").pop());
  let currentProfileId = window.location.href.split("/").pop();
  // change id to email
  let currentProfileEmail = Buffer.from(currentProfileId, "base64").toString(
    "ascii"
  );

  // if (currentProfileID !== currentUser._id)

  // fetch(`/api/getuser/${currentProfileEmail}`)

  return (
    <>
      <LoggedInHeader />
      <ProfileInfo />
      <ProfileMessages currentUser={currentProfileId === userState._id ? true : false} />
      <ProfileClasses />
      {
        userState.admin ? <ProfilSuggestion /> : null
      }
    </>
  );
};

export default Profile;
