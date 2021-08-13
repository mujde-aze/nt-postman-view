import './App.css';
import PostmanTable from "./components/PostmanTable";
import {Button, Col, Container, Row} from "react-bootstrap";
import {PostageStatus} from "./models/PostageStatus";

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
                    <p>Hi <strong>{user.email}</strong></p>
                    <p>
                        <Button variant="secondary" onClick={() => firebase.auth().signOut()}>Sign out</Button>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PostmanTable firebase={firebase} functions={functions} ntStatus={PostageStatus.NEEDS_NT} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
