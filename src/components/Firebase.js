import App from "../App";
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

function Firebase(props) {
    const firebase = props.firebase
  /*  let ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    })*/
    return (<App/>)
}

export default Firebase
