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

    return (<App firebase={firebase} functions={props.functions}/>)
}

export default Firebase
