import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  requestUser,
  receiveUser,
  receiveUserError,
} from "../../reducers/action";

const SignUpForm = () => {
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

  return (
    <Form
      onSubmit={(ev) => {
        ev.preventDefault();

        dispatch(requestUser());

        // post request to server and create user on mongo if succesful
        fetch("/api/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // from string to base64
            _id: Buffer.from(email).toString("base64"),
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
            admin: false,
            "Emergency Contact": {
              relName,
              relation,
              relPhone,
            },
            Conversations: [],
            Classes: [],
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            // if succesful redirect to homepage

            // dispatch(receiveUser(json.data))
            // history.push('/homepage')
            
            // if unsuccesful alert user to change email

            // dispatch(receiveUserError())
          })
          .catch((err) => {
            console.log(err);
            dispatch(receiveUserError());
          });
      }}
    >
      <label for="first-name">First Name</label>
      <input
        type="text"
        placeholder="First Name"
        id="first-name"
        name="first-name"
        onChange={(ev) => setFirstName(ev.currentTarget.value)}
        required
      />
      <label for="last-name">Last Name</label>
      <input
        type="text"
        placeholder="Last Name"
        id="last-name"
        name="last-name"
        onChange={(ev) => setLastName(ev.currentTarget.value)}
        required
      />
      <label for="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        pattern="[0-9]{10}"
        placeholder="123-456-7890"
        onChange={(ev) => setPhone(ev.currentTarget.value)}
        required
      />
      <label for="dob">Date Of Birth</label>
      <input
        type="date"
        id="dob"
        name="dob"
        onChange={(ev) => setDOB(ev.currentTarget.value)}
        required
      />
      <label for="gender">Gender</label>
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
      <label for="city">City</label>
      <input
        type="text"
        placeholder="City"
        id="city"
        name="city"
        onChange={(ev) => setCity(ev.currentTarget.value)}
        required
      />
      <label for="address">Address</label>
      <input
        type="text"
        placeholder="Address"
        id="address"
        name="address"
        onChange={(ev) => setAddress(ev.currentTarget.value)}
        required
      />
      <label for="zipcode">Zip Code</label>
      <input
        type="text"
        placeholder="Zip Code"
        id="zipcode"
        name="zipcode"
        onChange={(ev) => setZipcode(ev.currentTarget.value)}
        required
      />
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
      <label>Confirm Password</label>
      <input type="password" required />
      {/* Emergency Contact */}
      <label for="relation-name">Name</label>
      <input
        type="text"
        placeholder="Name"
        id="relation-name"
        name="relation-name"
        onChange={(ev) => setRelName(ev.currentTarget.value)}
      />
      <label for="relation">Relation</label>
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
      <label for="relation-number">Phone Number</label>
      <input
        type="tel"
        id="relation-number"
        name="relation-number"
        pattern="[0-9]{10}"
        placeholder="123-456-7890"
        onChange={(ev) => setRelPhone(ev.currentTarget.value)}
      />
      <button type="submit">Register</button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px;
`;

export default SignUpForm;
