import SignInScreen from "./SignInScreen";
import {useEffect, useState} from "react";
import App from "../App";

function Firebase(props) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const firebase = props.firebase;

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user)
        });
        return () => unregisterAuthObserver();
    });

    if (!isSignedIn) {
        return (<SignInScreen firebase={firebase}/>)
    }

    const functions = props.firebase.app().functions("australia-southeast1");
    //TODO: remove before prod deployment
    functions.useEmulator("localhost", 5001);

    return (<App firebase={firebase} functions={functions}/>)
}

export default Firebase
