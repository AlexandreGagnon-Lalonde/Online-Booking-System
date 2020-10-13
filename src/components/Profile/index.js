import React from "react";
import styled from "styled-components";

import Header from "../Header/index";

const Profile = () => {
  // gets me the _id of user from url
  console.log(window.location.href.split("/").pop());
  let currentProfileID = window.location.href.split("/").pop();
  // change id to email
  let currentProfileEmail = Buffer.from(currentProfileID, "base64").toString(
    "ascii"
  );

  // if currentProfileID !== currentUser

  // fetch(`/api/getuser/${currentProfileEmail}`)

  return <Header />;
};

export default Profile;
