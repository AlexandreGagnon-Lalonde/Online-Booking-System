import React from "react";
import styled from "styled-components";
import { SERVER_URL, COLORS } from "../../constant";
import { useSelector, useDispatch } from "react-redux";

const LeftFormContainer = ({
  setFirstName,
  setLastName,
  setPhone,
  setDOB,
  setGender,
}) => {
  const windowState = useSelector((state) => state.window);

  return (
    <Container style={windowState.width < 600 ? { display: "block" } : null}>
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-right: 10px;
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
const StyledDropdown = styled.select`
  background-color: ${COLORS.mediumGray};
  border: none;
  border-bottom: 2px solid ${COLORS.orange};
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 20px;
  color: ${COLORS.beige};
`;

export default LeftFormContainer;
