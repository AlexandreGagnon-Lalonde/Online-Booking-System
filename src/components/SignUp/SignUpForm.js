import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserHistory } from "history";
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
  const [relName, setRelName] = React.useState("");
  const [relation, setRelation] = React.useState("");
  const [relPhone, setRelPhone] = React.useState("");

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
        "Emergency Contact": {
          relName,
          relation,
          relPhone,
        },
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
          // history.push("/signup");
        }
      })
      .catch((err) => {
        dispatch(receiveUserError(err.message));
      });
  };

  React.useEffect(() => {
    dispatch(logoutUser());
  }, [])

  return (
    <SignUpContainer>
      {/* <LogoContainer>Some text to welcome new user</LogoContainer> */}
      <FormContainer>
        <SignupForm onSubmit={handleSignup}>
          <SubSignUpForm>
            <LeftSignUpForm>
              {/* <label htmlFor="first-name">First Name</label> */}
              <StyledInput
                type="text"
                placeholder="First Name"
                id="first-name"
                name="first-name"
                onChange={(ev) => setFirstName(ev.currentTarget.value)}
                required
              />
              {/* <label htmlFor="last-name">Last Name</label> */}
              <StyledInput
                type="text"
                placeholder="Last Name"
                id="last-name"
                name="last-name"
                onChange={(ev) => setLastName(ev.currentTarget.value)}
                required
              />
              {/* <label htmlFor="phone">Phone Number</label> */}
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
              {/* <label htmlFor="gender">Gender</label> */}
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
            <RightSignUpForm>
              {/* <label htmlFor="city">City</label> */}
              <StyledInput
                type="text"
                placeholder="City"
                id="city"
                name="city"
                onChange={(ev) => setCity(ev.currentTarget.value)}
                required
              />
              {/* <label htmlFor="address">Address</label> */}
              <StyledInput
                type="text"
                placeholder="Address"
                id="address"
                name="address"
                onChange={(ev) => setAddress(ev.currentTarget.value)}
                required
              />
              {/* <label htmlFor="zipcode">Zip Code</label> */}
              <StyledInput
                type="text"
                placeholder="Zip Code"
                id="zipcode"
                name="zipcode"
                onChange={(ev) => setZipcode(ev.currentTarget.value)}
                required
              />
              {/* <label htmlFor="email">Email</label> */}
              <StyledInput
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                onChange={(ev) => setEmail(ev.currentTarget.value)}
                required
              />
              {/* <label htmlFor="password">Password</label> */}
              <StyledInput
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                minlength="8"
                //pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
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
              {/* <label>Confirm Password</label> */}
              <StyledInput
                type="password"
                placeholder="Confirm Password"
                onChange={(ev) => setConfirmPassword(ev.currentTarget.value)}

                required
              />
            </RightSignUpForm>
          </SubSignUpForm>
          {/* Emergency Contact
          <label htmlFor="relation-name">Name</label>
          <StyledInput
            type="text"
            placeholder="Name"
            id="relation-name"
            name="relation-name"
            onChange={(ev) => setRelName(ev.currentTarget.value)}
          />
          <label htmlFor="relation">Relation</label>
          <select
            id="relation"
            name="relation"
            onChange={(ev) => setRelation(ev.currentTarget.value)}
          >
            <option value="" disabled selected hidden>
              Select your relation
            </option>
            <option value="parent" hidden>
              Parent
            </option>
            <option value="grandparent">Grand parent</option>
            <option value="sibling">Sibling</option>
            <option value="uncleAunt">Uncle / Aunt</option>
            <option value="friend">Friend</option>
            <option value="significantOther">Significant Other</option>
          </select>
          <label htmlFor="relation-number">Phone Number</label>
          <StyledInput
            type="tel"
            id="relation-number"
            name="relation-number"
            pattern="[0-9]{10}"
            placeholder="123-456-7890"
            onChange={(ev) => setRelPhone(ev.currentTarget.value)}
          /> */}
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
const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
