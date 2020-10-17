import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import IndividualClasses from "./IndividualClasses";

const ProfileClasses = () => {
  const userState = useSelector((state) => state.user.user);
  const otherUserState = useSelector((state) => state.user.otherUser);

  return (
    <div>
      {userState.Classes.length > 0 ? (
        userState.Classes.map((classe) => {
          return <IndividualClasses classe={classe} />;
        })
      ) : (
        <p>No Classes</p>
      )}
    </div>
  );
};

export default ProfileClasses;
