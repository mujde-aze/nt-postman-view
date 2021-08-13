import './App.css';
import PostmanTable from "./components/PostmanTable";
import {Col, Container, Row} from "react-bootstrap";

function App(props) {
    const firebase = props.firebase;
    const functions = props.functions;
    const user = firebase.auth().currentUser;

    return (
        <Container fluid>
            <Row id="header">
                <Col id="siteTitle">
                    <h1>Postman</h1>
                </Col>
                <Col id="signInDetails">
                    <p>Welcome <strong>{user.email}</strong>, you are now signed in!</p>
                    <p>Click <a href='/' onClick={() => firebase.auth().signOut()}>here</a> to sign out.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PostmanTable firebase={firebase} functions={functions} ntStatus="needs_nt"/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
