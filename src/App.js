import './App.css';
import PostmanTable from "./components/PostmanTable";

function App(props) {
  const firebase = props.firebase
  const user = firebase.auth().currentUser

  return (
    <div className="App">
      <p>Welcome {user.email}, you are now signed in!</p>
      <p>Click <a href='blah' onClick={() => firebase.auth().signOut()}>here</a> to sign out.</p>
      <PostmanTable firebase={firebase} ntStatus="needs_nt" />
    </div>
  );
}

export default App;
