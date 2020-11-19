import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../LoadingSpinner";
import LogInputs from "./LogInputs";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL, COLORS } from "../../constant";
import {
  requestUser,
  receiveUser,
  receiveUserError,
  logoutUser,
} from "../../reducers/action";

const LogInForm = () => {
  const userState = useSelector((state) => state.user);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const wrongPassword = "Wrong password!";
  const wrongUser = "Are you signed up? Make sure your email is valid!";

  const handleLogin = (ev) => {
    ev.preventDefault();

    dispatch(requestUser());

    fetch(SERVER_URL + `/api/getuser/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 404) {
          if (data.user.email === email && data.user.password === password) {
            dispatch(receiveUser(data.user));
            localStorage.setItem("currentUserId", data.user._id);
            history.push("/homepage");
          } else {
            dispatch(receiveUserError(wrongPassword));
          }
        } else {
          dispatch(receiveUserError(wrongUser));
        }
      })
      .catch((err) => {
        dispatch(receiveUserError());
      });
  };

  React.useEffect(() => {
    dispatch(logoutUser());
  }, []);

  return (
    <Form onSubmit={handleLogin}>
      <LogInputs setEmail={setEmail} setPassword={setPassword} />
      <LogInButton type="submit">
        {userState.status === "Loading" ? <LoadingSpinner /> : "Log In"}
      </LogInButton>
      {userState.status === "error" ? (
        <ErrorSubmitMessage>{userState.errorMessage}</ErrorSubmitMessage>
      ) : null}
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 50px);
  margin-top: -50px;
`;
const LogInButton = styled.button`
  padding: 15px;
  margin: 15px 45px;
  border-radius: 5px;
  border: 1px solid ${COLORS.orange};
  font-weight: bold;
  font-size: 2em;
  background-color: ${COLORS.darkGray};
  color: ${COLORS.orange};
  transition: all 0.3s;
  width: 40%;

  &:hover {
    background-color: ${COLORS.mediumGray};
    color: ${COLORS.beige};
    border: 1px solid ${COLORS.beige};
  }
`;
const ErrorSubmitMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: ${COLORS.errorRed};
  border: 1px solid ${COLORS.errorRed};
  margin: 0 90px 0 90px;
`;

export default LogInForm;
