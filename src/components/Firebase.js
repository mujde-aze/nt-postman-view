import SignInScreen from "./SignInScreen";
import {useEffect, useState} from "react";
import App from "../App";
import PropTypes from "prop-types";

function Firebase({firebase, functions}) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  });

  if (!isSignedIn) {
    return (<SignInScreen firebase={firebase}/>);
  }

  return (<App firebase={firebase} functions={functions}/>);
}

Firebase.propTypes = {
  firebase: PropTypes.object,
  functions: PropTypes.object,
};

export default Firebase;
