import React from "react";
import styled from "styled-components";
import LeftFormContainer from "./LeftFormContainer";
import RightFormContainer from "./RightFormContainer";

const FormInputs = ({
  setFirstName,
  setLastName,
  setPhone,
  setCity,
  setDOB,
  setGender,
  setAddress,
  setZipcode,
  setEmail,
  setPassword,
  setConfirmPassword,
}) => {
  return (
    <Container>
      <LeftFormContainer
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPhone={setPhone}
        setDOB={setDOB}
        setGender={setGender}
      />
      <RightFormContainer
        setCity={setCity}
        setAddress={setAddress}
        setZipcode={setZipcode}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default FormInputs;
