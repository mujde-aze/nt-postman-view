import {Button, Modal} from "react-bootstrap";

function ConfirmationModal(props) {
    return (
        <Modal show={props.showModal} onHide={props.handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Update Postage Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to set the Postage Status to {props.ntStatus}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleNoModalOption}>
                    No
                </Button>
                <Button variant="primary" onClick={props.handleYesModalOption}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;
