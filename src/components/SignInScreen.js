import {StyledFirebaseAuth} from "react-firebaseui";

function SignInScreen(props) {
    const firebase = props.firebase;
    const uiConfig = {
        signInFlow: 'redirect',
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
                disableSignUp: {
                    status: true
                }
            }
        ],
    }

    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
    );
}

export default SignInScreen
