import {StyledFirebaseAuth} from "react-firebaseui";

function SignInScreen(props) {
    const firebase = props.firebase;
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
    }

    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
    );
}

export default SignInScreen
