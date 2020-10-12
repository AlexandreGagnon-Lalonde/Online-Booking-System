import React from "react";
import styled from "styled-components";
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
  requestUser,
  receiveUser,
  receiveUserError,
} from '../../reducers/action';

const LogInForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  return (
    <Form
      onSubmit={(ev) => {
        ev.preventDefault();

        dispatch(requestUser())

        // post request to server and create user on mongo if succesful
        fetch(`/api/getuser/${email}`)
          .then((res) => res.json())
          .then(data => {
            // put user data in reducer
            // dispatch(receiveUser(data.user))
          })
          .then((json) => {
            console.log(json)
            // if succesful and user password is good redirect to homepage

            // dispatch(receiveUser(json.data))
            return (<Redirect to="/homepage" />)
            // if unsuccesful alert user to change email or to verify password

            // dispatch(receiveUserError())
          })
          .catch((err) => {
            console.log(err);
            dispatch(receiveUserError())
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
    </ Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px;
`;

export default LogInForm