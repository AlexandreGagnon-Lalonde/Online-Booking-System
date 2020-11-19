import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL, COLORS } from "../../constant";
import {
  requestUser,
  receiveUser,
  receiveUserError,
  logoutUser,
} from "../../reducers/action";
import FormInputs from "./FormInputs";

const SignUpForm = () => {
  const userState = useSelector((state) => state.user);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [DOB, setDOB] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [city, setCity] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const encryptedEmail = Buffer.from(email).toString("base64");

  const handleSignup = (ev) => {
    ev.preventDefault();

    dispatch(requestUser());

    fetch(SERVER_URL + "/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: encryptedEmail,
        firstName,
        lastName,
        phone,
        DOB,
        gender,
        city,
        address,
        zipcode,
        email,
        password,
        confirmPassword,
        admin: false,
        conversations: [],
        classes: [],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(receiveUser(data.user));
          localStorage.setItem("currentUserId", data.user._id);
          history.push("/homepage");
        } else {
          dispatch(receiveUserError(data.message));
        }
      })
      .catch((err) => {
        dispatch(receiveUserError(err.message));
      });
  };

  React.useEffect(() => {
    dispatch(logoutUser());
  }, []);

  return (
    <SignupForm onSubmit={handleSignup}>
      <FormInputs
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPhone={setPhone}
        setCity={setCity}
        setDOB={setDOB}
        setGender={setGender}
        setAddress={setAddress}
        setZipcode={setZipcode}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
      <SignUpButton type="submit">Register</SignUpButton>
      {userState.status === "error" && (
        <ErrorSubmitMessage>{userState.errorMessage}</ErrorSubmitMessage>
      )}
    </SignupForm>
  );
};

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ErrorSubmitMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50%;
  color: ${COLORS.errorRed};
  border: 1px solid ${COLORS.errorRed};
  border-radius: 5px;
  margin: 0 270px 0 270px;
`;
const SignUpButton = styled.button`
  padding: 15px;
  margin: 15px 45px;
  border-radius: 5px;
  border: 1px solid ${COLORS.orange};
  font-weight: bold;
  font-size: 2em;
  width: 50%;
  background-color: ${COLORS.darkGray};
  color: ${COLORS.orange};
  transition: all 0.3s;

  &:hover {
    background-color: ${COLORS.mediumGray};
    color: ${COLORS.lightGray};
    border: 1px solid ${COLORS.lightGray};
  }
`;

export default SignUpForm;
