import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constant";

const LogInputs = ({ setEmail, setPassword }) => {
  return (
    <>
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
        onChange={(ev) => setPassword(ev.currentTarget.value)}
        required
      />
    </>
  );
};

const StyledInput = styled.input`
  border: none;
  border-bottom: 2px solid ${COLORS.orange};
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: ${COLORS.mediumGray};
  border-radius: 5px;
  width: 60%;

  &,
  select,
  textarea {
    color: ${COLORS.beige};
  }
  &:focus {
    outline: none;
  }
`;

export default LogInputs;
