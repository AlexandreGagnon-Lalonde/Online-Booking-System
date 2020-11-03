import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../../constant";
import {
  requestUser,
  receiveUser,
  receiveUserError,
  logoutUser,
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

  return (
    <div>
      <Form
        target={"_blank"}
        onSubmit={(ev) => {
          ev.preventDefault();

          dispatch(requestUser());

          fetch(SERVER_URL + `/api/getuser/${email}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.status !== 404) {
                if (
                  data.user.email === email &&
                  data.user.password === password
                ) {
                  dispatch(receiveUser(data.user));
                  localStorage.setItem("currentUserId", data.user._id);
                  history.push("/homepage");
                } else {
                  dispatch(receiveUserError(wrongPassword));
                  history.push("/login");
                }
              } else {
                dispatch(receiveUserError(wrongUser));
                history.push("/login");
              }
            })
            .catch((err) => {
              console.log("2", err);
              dispatch(receiveUserError());
            });
        }}
      >
        <label for="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          name="email"
          onChange={(ev) => setEmail(ev.currentTarget.value)}
          required
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(ev) => setPassword(ev.currentTarget.value)}
          required
        />

        <button type="submit">
          {userState.status === "Loading" ? <LoadingSpinner /> : "Log In"}
        </button>
      </Form>
      {userState.status === "error" ? <p>{userState.errorMessage}</p> : null}
      <p></p>
    </div>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px;
`;

export default LogInForm;
