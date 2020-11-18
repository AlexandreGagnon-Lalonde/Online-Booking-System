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

const SignUpForm = () => {
  const userState = useSelector((state) => state.user);
  const windowState = useSelector((state) => state.window);

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
    <SignUpContainer>
      <FormContainer>
        <SignupForm onSubmit={handleSignup}>
          <SubSignUpForm
            style={windowState.width < 600 ? { display: "block" } : null}
          >
            <LeftSignUpForm
              style={windowState.width < 600 ? { marginRight: "0" } : null}
            >
              <StyledInput
                type="text"
                placeholder="First Name"
                id="first-name"
                name="first-name"
                onChange={(ev) => setFirstName(ev.currentTarget.value)}
                required
              />
              <StyledInput
                type="text"
                placeholder="Last Name"
                id="last-name"
                name="last-name"
                onChange={(ev) => setLastName(ev.currentTarget.value)}
                required
              />
              <StyledInput
                type="tel"
                id="phone"
                name="phone"
                pattern="[0-9]{10}"
                placeholder="123-456-7890"
                onChange={(ev) => setPhone(ev.currentTarget.value)}
                required
              />
              <label htmlFor="dob">Date Of Birth</label>
              <StyledInput
                type="date"
                id="dob"
                name="dob"
                placeholder={"Date Of Birth"}
                onChange={(ev) => setDOB(ev.currentTarget.value)}
                required
              />
              <StyledDropdown
                id="gender"
                name="gender"
                onChange={(ev) => setGender(ev.currentTarget.value)}
              >
                <option value="" disabled selected hidden>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Who knows">I don't know</option>
              </StyledDropdown>
            </LeftSignUpForm>
            <RightSignUpForm
              style={windowState.width < 600 ? { marginLeft: "0" } : null}
            >
              <StyledInput
                type="text"
                placeholder="City"
                id="city"
                name="city"
                onChange={(ev) => setCity(ev.currentTarget.value)}
                required
              />
              <StyledInput
                type="text"
                placeholder="Address"
                id="address"
                name="address"
                onChange={(ev) => setAddress(ev.currentTarget.value)}
                required
              />
              <StyledInput
                type="text"
                placeholder="Zip Code"
                id="zipcode"
                name="zipcode"
                onChange={(ev) => setZipcode(ev.currentTarget.value)}
                required
              />
              <StyledInput
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                onChange={(ev) => setEmail(ev.currentTarget.value)}
                required
              />
              <StyledInput
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                minlength="8"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                onChange={(ev) => setPassword(ev.currentTarget.value)}
                required
              />
              <PasswordConstraint>
                <ul>
                  <li>At least 8 characters</li>
                  <li>1 uppercase letter, 1 lowercase letter and 1 number</li>
                  <li>can contain a special character</li>
                </ul>
              </PasswordConstraint>
              <StyledInput
                type="password"
                placeholder="Confirm Password"
                onChange={(ev) => setConfirmPassword(ev.currentTarget.value)}
                required
              />
            </RightSignUpForm>
          </SubSignUpForm>
          <SignUpButton type="submit">Register</SignUpButton>
          {userState.status === "error" ? (
            <ErrorSubmitMessage>{userState.errorMessage}</ErrorSubmitMessage>
          ) : null}
        </SignupForm>
      </FormContainer>
    </SignUpContainer>
  );
};

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const FormContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: folumn;
  justify-content: center;
`;
const PasswordConstraint = styled.div``;
const ErrorSubmitMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: ${COLORS.errorRed};
  border: 1px solid ${COLORS.errorRed};
  margin: 0 270px 0 270px;
`;
const StyledDropdown = styled.select`
  background-color: ${COLORS.mediumGray};
  border: none;
  border-bottom: 2px solid ${COLORS.orange};
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 20px;
  color: ${COLORS.beige};
`;
const StyledInput = styled.input`
  background-color: ${COLORS.mediumGray};
  border: none;
  border-bottom: 2px solid ${COLORS.orange};
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 20px;

  &,
  select,
  textarea {
    color: ${COLORS.beige};
  }
  &:focus {
    outline: none;
  }
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;
const SignUpButton = styled.button`
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
    color: ${COLORS.lightGray};
    border: 1px solid ${COLORS.lightGray};
  }
`;
const LeftSignUpForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-right: 10px;
`;
const RightSignUpForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
`;
const SubSignUpForm = styled.div`
  display: flex;
`;

export default SignUpForm;
