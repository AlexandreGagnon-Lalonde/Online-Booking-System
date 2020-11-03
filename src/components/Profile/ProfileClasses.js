import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import IndividualClasses from "./IndividualClasses";

const ProfileClasses = ({ user }) => {
  return (
    <div>
      {user.classes.length > 0 ? (
        <p>
          Classes
          {user.classes.map((classe) => {
            return <IndividualClasses classe={classe} />;
          })}
        </p>
      ) : (
        <p>No Classes</p>
      )}
    </div>
  );
};

export default ProfileClasses;
