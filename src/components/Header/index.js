import React from "react";
import { useSelector } from "react-redux";

import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";

const Header = () => {
  const userState = useSelector((state) => state.user);

  return (
    <>
      {userState.status === "Logged In" ? (
        <LoggedInHeader />
      ) : (
        <LoggedOutHeader />
      )}
    </>
  );
};

export default Header;
