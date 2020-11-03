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
} from "../../reducers/action";

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
  const [relName, setRelName] = React.useState("");
  const [relation, setRelation] = React.useState("");
  const [relPhone, setRelPhone] = React.useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const encryptedEmail = Buffer.from(email).toString("base64");

  return (
    <Form
      onSubmit={(ev) => {
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
            avatar: "",
            phone,
            DOB,
            gender,
            city,
            address,
            zipcode,
            email,
            password,
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
              history.push("/signup");
            }
          })
          .catch((err) => {
            dispatch(receiveUserError(err.message));
          });
      }}
    >
      <label htmlFor="first-name">First Name</label>
      <input
        type="text"
        placeholder="First Name"
        id="first-name"
        name="first-name"
        onChange={(ev) => setFirstName(ev.currentTarget.value)}
        required
      />
      <label htmlFor="last-name">Last Name</label>
      <input
        type="text"
        placeholder="Last Name"
        id="last-name"
        name="last-name"
        onChange={(ev) => setLastName(ev.currentTarget.value)}
        required
      />
      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        pattern="[0-9]{10}"
        placeholder="123-456-7890"
        onChange={(ev) => setPhone(ev.currentTarget.value)}
        required
      />
      <label htmlFor="dob">Date Of Birth</label>
      <input
        type="date"
        id="dob"
        name="dob"
        onChange={(ev) => setDOB(ev.currentTarget.value)}
        required
      />
      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        name="gender"
        onChange={(ev) => setGender(ev.currentTarget.value)}
      >
        <option value="" disabled selected hidden>
          Select your gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="idk">I don't know</option>
      </select>
      <label htmlFor="city">City</label>
      <input
        type="text"
        placeholder="City"
        id="city"
        name="city"
        onChange={(ev) => setCity(ev.currentTarget.value)}
        required
      />
      <label htmlFor="address">Address</label>
      <input
        type="text"
        placeholder="Address"
        id="address"
        name="address"
        onChange={(ev) => setAddress(ev.currentTarget.value)}
        required
      />
      <label htmlFor="zipcode">Zip Code</label>
      <input
        type="text"
        placeholder="Zip Code"
        id="zipcode"
        name="zipcode"
        onChange={(ev) => setZipcode(ev.currentTarget.value)}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        placeholder="Email"
        id="email"
        name="email"
        onChange={(ev) => setEmail(ev.currentTarget.value)}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
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
      <label>Confirm Password</label>
      <input type="password" required />
      {/* Emergency Contact */}
      <label htmlFor="relation-name">Name</label>
      <input
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
      <input
        type="tel"
        id="relation-number"
        name="relation-number"
        pattern="[0-9]{10}"
        placeholder="123-456-7890"
        onChange={(ev) => setRelPhone(ev.currentTarget.value)}
      />
      <button type="submit">Register</button>
      {userState.status === "error" ? (
        <ErrorSubmitMessage>{userState.errorMessage}</ErrorSubmitMessage>
      ) : null}
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px;
`;

const PasswordConstraint = styled.div``;
const ErrorSubmitMessage = styled.div``;

export default SignUpForm;
