import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import firebase from './Firebase'
import Firebase from "./components/Firebase";
import {functions} from "./Firebase";

ReactDOM.render(
    <React.StrictMode>
        <Firebase firebase={firebase} functions={functions}/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
