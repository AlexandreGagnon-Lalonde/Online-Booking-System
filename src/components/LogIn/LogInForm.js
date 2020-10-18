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

const LogInForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Form
      onSubmit={(ev) => {
        ev.preventDefault();

        dispatch(requestUser());

        fetch(SERVER_URL + `/api/getuser/${email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.user.email === email && data.user.password === password) {
              dispatch(receiveUser(data.user));
              localStorage.setItem('currentUserId', data.user._id)
              history.push("/homepage");
            } else {
              dispatch(logoutUser());
              dispatch(receiveUserError());
            }
          })
          .catch((err) => {
            console.log(err);
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
      <button type="submit">Log In</button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px;
`;

export default LogInForm;
