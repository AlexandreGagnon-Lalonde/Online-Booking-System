import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";
import {
  requestUser,
  receiveUser,
  receiveUserError,
} from "../../reducers/action";
import { COLORS } from "../../constant";
import LoadingSpinner from "../LoadingSpinner";

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

  return (
    <MainContainer>
      {/* <LogoContainer>Random stuff to fill before logo</LogoContainer> */}
      <FormContainer>
        <StyledForm onSubmit={handleLogin}>
          {/* <StyledLabel for="email">Email</StyledLabel> */}
          <StyledInput
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            onChange={(ev) => setEmail(ev.currentTarget.value)}
            required
          />
          {/* <StyledLabel for="password">Password</StyledLabel> */}
          <StyledInput
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={(ev) => setPassword(ev.currentTarget.value)}
            required
          />

          <LogInButton type="submit">
            {userState.status === "Loading" ? <LoadingSpinner /> : "Log In"}
          </LogInButton>
          {userState.status === "error" ? (
            <ErrorSubmitMessage>{userState.errorMessage}</ErrorSubmitMessage>
          ) : null}
        </StyledForm>
      </FormContainer>
    </MainContainer>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px;
`;
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 50px);
`;
const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const StyledForm = styled(Form)`
  width: 60%;
`;
const StyledInput = styled.input`
  border: none;
  border-bottom: 2px solid ${COLORS.orange};
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: ${COLORS.mediumGray};
  border-radius: 5px;

  &,
  select,
  textarea {
    color: ${COLORS.beige};
  }
  &:focus {
    outline: none;
  }
`;
const StyledLabel = styled.label`
  padding-left: 20px;
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
