import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";


const Calendar = () => {
  const user = useSelector((state) => state.user.user)
      console.log(user)

  return (
    <div>Mmmhh a fresh calendar</div>
  )
}

export default Calendar