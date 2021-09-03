import React, { useEffect, useReducer } from "react";
import Tweet from "./Tweet";
import socketIOClient from "socket.io-client";
import ErrorMessage from "./ErrorMessage";
import Spinner from "../Spinner";

const reducer = (state, action) => {
  switch (action.type) {
    case "add_tweet":
      return {
        ...state,
        tweets: [action.payload, ...state.tweets],
        error: null,
        isWaiting: false,
        errors: [],
      };
    case "show_error":
      return { ...state, error: action.payload, isWaiting: false };
    case "add_errors":
      return { ...state, errors: action.payload, isWaiting: false };
    case "update_waiting":
      return { ...state, error: null, isWaiting: true };
    default:
      return state;
  }
};

const TweetFeed = () => {
  const initialState = {
    tweets: [],
    error: {},
    isWaiting: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tweets, error, isWaiting } = state;

  const streamTweets = () => {
    let socket;

    socket = socketIOClient("http://localhost:3000/");

    socket.on("connect", () => {});
    socket.on("tweet", (json) => {
      if (json.data) {
        dispatch({ type: "add_tweet", payload: json });
      }
    });
    socket.on("heartbeat", (data) => {
      dispatch({ type: "update_waiting" });
    });
    socket.on("error", (data) => {
      dispatch({ type: "show_error", payload: data });
    });
    socket.on("authError", (data) => {
      console.log("data =>", data);
      dispatch({ type: "add_errors", payload: [data] });
    });
  };

  const reconnectMessage = () => {
    const message = {
      title: "Reconnecting",
      detail: "Please wait while we reconnect to the stream.",
    };

    if (error && error.detail) {
      return (
        <div>
          <ErrorMessage key={error.title} error={error} styleType="warning" />
          <ErrorMessage
            key={message.title}
            error={message}
            styleType="success"
          />
          <Spinner />
        </div>
      );
    }
  };

  const errorMessage = () => {
    const { errors } = state;

    if (errors && errors.length > 0) {
      return errors.map((error) => (
        <ErrorMessage key={error.title} error={error} styleType="negative" />
      ));
    }
  };

  const waitingMessage = () => {
    if (isWaiting) {
      return (
        <Spinner message="Retrieving Tweets..."/>
      );
    }
  };

  useEffect(() => {
    streamTweets();
  }, []);

  const showTweets = () => {
    if (tweets.length > 0) {
      return (
        <React.Fragment>
          {tweets.map((tweet) => (
            <Tweet key={tweet.data.id} json={tweet} />
          ))}
        </React.Fragment>
      );
    }
  };

  return (
    <div>
      {reconnectMessage()}
      {errorMessage()}
      {waitingMessage()}
      {showTweets()}
    </div>
  );
};

export default TweetFeed;