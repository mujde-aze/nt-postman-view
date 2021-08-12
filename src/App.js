import './App.css';
import PostmanTable from "./components/PostmanTable";
import {Col, Container, DropdownButton, Dropdown, Row} from "react-bootstrap";

function App(props) {
    const firebase = props.firebase
    const user = firebase.auth().currentUser

    return (
        <Container>
            <Row>
                <Col>
                    <p>Welcome {user.email}, you are now signed in!</p>
                    <p>Click <a href='blah' onClick={() => firebase.auth().signOut()}>here</a> to sign out.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PostmanTable firebase={firebase} ntStatus="needs_nt"/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
