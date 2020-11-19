import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { COLORS } from "../../constant";

const RightFormContainer = ({
  setCity,
  setAddress,
  setZipcode,
  setEmail,
  setPassword,
  setConfirmPassword,
}) => {
  const windowState = useSelector((state) => state.window);

  return (
    <Container style={windowState.width < 600 ? { marginLeft: "0" } : null}>
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
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
const PasswordConstraint = styled.div``;

export default RightFormContainer;
