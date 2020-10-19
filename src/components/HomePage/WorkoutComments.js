import React from "react";
import styled from "styled-components";

const WorkoutComments = () => {
  return (
    <form onSubmit={() => {
      
    }}>
      <input type={'textarea'} placeholder={'Leave a comment'} ></input>
      <button type={'submit'}>Comment</button>
    </form>
  )
}

export default WorkoutComments