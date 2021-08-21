import {Button, Modal, Spinner} from "react-bootstrap";
import {PostageStatus} from "../models/PostageStatus";

function ConfirmationModal(props) {
    let buttonSpinner;
    if (props.showUpdateSpinner) {
        buttonSpinner = <Button variant="primary" onClick={props.handleYesModalOption}>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
            Yes
        </Button>
    } else {
        buttonSpinner = <Button variant="primary" onClick={props.handleYesModalOption}>
            Yes
        </Button>
    }

    return (
        <Modal show={props.showModal} onHide={props.handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Update Postage Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to set the Postage Status
                to {PostageStatus.getDisplayName(props.transitionToStatus)}? Before clicking 'Yes', please ensure this contact
                is <strong>not</strong> selected for printing.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleNoModalOption}>
                    No
                </Button>
                {buttonSpinner}
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;
