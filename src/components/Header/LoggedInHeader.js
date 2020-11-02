import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../reducers/action";
import { COLORS } from "../../constant";

const LoggedInHeader = () => {
  const userState = useSelector((state) => state.user);

  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <NavContainer>
      <Link to="/homepage">Home</Link>
      <ProfileCommands>
        <Link to={`/profile/${userState.user._id}`}>
          {userState.user.firstName}
        </Link>
        <button
          onClick={() => {
            dispatch(logoutUser());
            localStorage.clear();
            history.push("/");
          }}
        >
          Log out
        </button>
      </ProfileCommands>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  background-color: ${COLORS.darkGray};
  display: flex;
  justify-content: space-between;
`;
const ProfileCommands = styled.div``;

export default LoggedInHeader;
