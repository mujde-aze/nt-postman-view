import logo from './logo.svg';
import './App.css';

function App(props) {
  const firebase = props.firebase
  const user = firebase.auth().currentUser.displayName
  return (
    <div className="App">
      <p>Welcome {user}, you are now signed in!</p>
      <p>Click <a href='blah' onClick={() => firebase.auth().signOut()}>here</a> to sign out.</p>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
