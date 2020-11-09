import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../reducers/action";
import { COLORS } from "../../constant";
import { FiLogOut } from 'react-icons/fi';

const LoggedInHeader = () => {
  const userState = useSelector((state) => state.user);

  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <NavContainer>
      <StyledHomeLink to="/homepage">Home</StyledHomeLink>
      <ProfileCommands>
        <StyledProfileLink to={`/profile/${userState.user._id}`}>
          {userState.user.firstName}
        </StyledProfileLink>
        <LogOutButton
          onClick={() => {
            dispatch(logoutUser());
            localStorage.clear();
            history.push("/");
          }}
        >
          <FiLogOut />
        </LogOutButton>
      </ProfileCommands>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  background-color: ${COLORS.darkGray};
  display: flex;
  justify-content: space-between;
  height: 50px;
`;
const ProfileCommands = styled.div`
  display: flex;
  align-items: center;
`;
const StyledHomeLink = styled(Link)`
color: ${COLORS.beige};
font-size: 2em;
font-weight: bold;
margin: 5px 10px;
transition: all 0.3s;

&:hover {
  color: ${COLORS.orange};
  text-decoration: none;
}
`;
const StyledProfileLink = styled(Link)`
color: ${COLORS.beige};
font-size: 1.2em;
font-weight: bold;
margin: 10px;
transition: all 0.3s;

&:hover {
  color: ${COLORS.orange};
  text-decoration: none;
}
`;
const LogOutButton = styled.button`
  color: ${COLORS.orange};
  backgroud-color: ${COLORS.beige};
  border: none;
  border-radius: 5px;
  padding: 8px 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background-color: ${COLORS.orange};
    color: ${COLORS.beige};
  }
`

export default LoggedInHeader;
