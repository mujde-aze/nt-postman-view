import './App.css';
import PostmanTable from "./components/PostmanTable";
import {Button, Col, Container, Dropdown, DropdownButton, Row} from "react-bootstrap";
import {PostageStatus} from "./models/PostageStatus";
import {useState} from "react";

function App(props) {
    const firebase = props.firebase;
    const functions = props.functions;
    const user = firebase.auth().currentUser;
    const [selectedStatus, setSelectedStatus] = useState(PostageStatus.NEEDS_NT)

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
                <Col id="statusSelect">
                    <DropdownButton id="dropdown-item-button" title="Select a postage status">
                        <Dropdown.ItemText>Select a postage status</Dropdown.ItemText>
                        <Dropdown.Item as="button" onClick={(e) => setSelectedStatus(PostageStatus.NEEDS_NT)}>Needs
                            NT</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={(e) => setSelectedStatus(PostageStatus.NT_SENT)}>NT
                            Sent</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PostmanTable firebase={firebase} functions={functions} ntStatus={selectedStatus}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
