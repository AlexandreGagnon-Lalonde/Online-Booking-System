import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SignUp from "./components/SignUp/index";
import LogIn from "./components/LogIn/index";
import HomePage from "./components/HomePage/index";
import Profile from "./components/Profile/index";
import WelcomePage from "./components/WelcomePage/index";
import LoadingSpinner from "./components/LoadingSpinner";

import { SERVER_URL } from "./constant";
import {
  requestUser,
  receiveUser,
  receiveOtherUser,
  receiveUserError,
  requestSuggestion,
  receiveSuggestion,
  receiveSuggestionError,
  requestComment,
  receiveComment,
  receiveCommentError,
  requestWorkout,
  receiveWorkout,
  receiveAllWorkouts,
  receiveWorkoutError,
  requestMessage,
  receiveMessages,
  messageError,
} from "./reducers/action";

function App() {
  const userState = useSelector((state) => state.user);
  const suggestionState = useSelector((state) => state.suggestion);
  const messageState = useSelector((state) => state.message);
  const calendarState = useSelector((state) => state.calendar);
  const commentState = useSelector((state) => state.comment);
  const workoutState = useSelector((state) => state.workout);

  const history = useHistory();
  const dispatch = useDispatch();

  const CommentStatusIsReady = commentState.status !== "Loading";
  const SuggestionStatusIsReady = suggestionState.status !== "Loading";

  React.useEffect(() => {
    if (suggestionState.status === "idle") {
      dispatch(requestSuggestion());

      fetch(SERVER_URL + `/api/getsuggestions`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveSuggestion(data.suggestions));
          localStorage.setItem("Suggestion", data.suggestions);
        })
        .catch((err) => {
          dispatch(receiveSuggestionError());
        });
    }

    if ((localStorage.getItem("currentUserId") && !userState.user)) {
      const email = Buffer.from(
        localStorage.getItem("currentUserId"),
        "base64"
      ).toString("ascii");

      dispatch(requestUser());

      fetch(SERVER_URL + `/api/getuser/${email}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveOtherUser(data.user));

          dispatch(receiveUser(data.user));
          localStorage.setItem("currentUserId", data.user._id);
          history.push("/homepage");
        })
        .catch((err) => {
          dispatch(receiveUserError());
        });
    }

    if (userState.user) {
      dispatch(requestMessage());

      fetch(SERVER_URL + `/api/getmessages/${userState.user._id}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveMessages(data.message));
        })
        .catch((err) => {
          dispatch(messageError());
        });
    }

    if (commentState.status === "idle") {
      dispatch(requestComment());

      fetch(SERVER_URL + `/api/getcomments`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveComment(data.comments));
        })
        .catch((err) => {
          dispatch(receiveCommentError());
        });
    }
    if (workoutState.status === "idle") {
      dispatch(requestWorkout());

      fetch(SERVER_URL + `/api/getworkout`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveWorkout(data.workout));
        })
        .catch((err) => {
          dispatch(receiveWorkoutError(err.message));
        });

      fetch(SERVER_URL + `/api/getallworkouts`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveAllWorkouts(data.allWorkouts));
        })
        .catch((err) => {
          dispatch(receiveWorkoutError(err.message));
        });
    }
  }, [userState.user, userState.status]);

  return (
    <>
      {(userState.user && CommentStatusIsReady && SuggestionStatusIsReady) || !localStorage.getItem("currentUserId") ? (
        <>
          <Route exact path="/">
            <WelcomePage />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/homepage">
            <HomePage />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </>
      ) : (
        <LoadingSpinner size={"lg"} />
      )}
    </>
  );
}

export default App;
