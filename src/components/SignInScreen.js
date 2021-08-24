import {StyledFirebaseAuth} from "react-firebaseui";
import PropTypes from "prop-types";

function SignInScreen({firebase}) {
  const uiConfig = {
    signInFlow: "redirect",
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
        disableSignUp: {
          status: true,
        },
      },
    ],
  };

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
    </div>
  );
}

SignInScreen.propTypes = {
  firebase: PropTypes.object,
};

export default SignInScreen;
