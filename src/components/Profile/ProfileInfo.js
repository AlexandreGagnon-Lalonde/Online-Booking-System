import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constant";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePhone } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { FaTransgenderAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

const ProfileInfo = ({ user }) => {
  return (
    <StyledDiv>
      <FullName>
        <CgProfile style={{ color: `${COLORS.orange}`}} /> {user.firstName + " " + user.lastName}
      </FullName>
      <PhoneNumber>
        <AiOutlinePhone style={{ color: `${COLORS.orange}`}} /> {user.phone}
      </PhoneNumber>
      <DateOfBirth>
        <FiCalendar style={{ color: `${COLORS.orange}`}} /> {user.DOB}
      </DateOfBirth>
      <Address>
        <FiHome style={{ color: `${COLORS.orange}`}} /> {user.address + " " + user.city}
      </Address>
      <Gender>
        <FaTransgenderAlt style={{ color: `${COLORS.orange}`}} /> {user.gender}
      </Gender>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  border-radius: 5px;
  background-color: ${COLORS.mediumGray};
  padding 10px;
  margin: 25px;
`;
const FullName = styled.p``;
const PhoneNumber = styled.p``;
const DateOfBirth = styled.p``;
const Address = styled.p``;
const Gender = styled.p``;

export default ProfileInfo;
