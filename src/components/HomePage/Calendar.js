import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";


const Calendar = () => {
  const currentUser = useSelector((state) => state.user.user)

// Exclude times, filter times, include times, 

  return (
    <div>Mmmhh a fresh calendar</div>
  )
}

export default Calendar