import {StyledFirebaseAuth} from "react-firebaseui";

function SignInScreen(props) {
    const firebase = props.firebase;
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
        ],
    }

    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
    );
}

export default SignInScreen
