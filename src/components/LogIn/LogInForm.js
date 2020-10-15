import React from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from '../../constant';
import {
  requestUser,
  receiveUser,
  receiveUserError,
} from '../../reducers/action';

let history = useHistory();

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
        fetch(SERVER_URL + `/api/getuser/${email}`)
          .then((res) => {
            return res.json()
          })
          .then(data => {
            console.log('login', data)

            history.push('/homepage')
            // put user data in reducer
            // dispatch(receiveUser(data.user))
          })
          .then((data) => {
            // console.log('login', data)
            // // if succesful and user password is good redirect to homepage
            // if (data.result.email === email && data.result.password === password) {
            //   // dispatch(receiveUser(json.data))
            //   history.push('/homepage')

            // } else {
            // // if unsuccesful alert user to change email or to verify password

            // // dispatch(receiveUserError())
            // }
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