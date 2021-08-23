import {Button, Modal} from "react-bootstrap";
import {PostageStatus} from "../models/PostageStatus";

function ConfirmationModal(props) {
    let modalFooter = <Modal.Footer>
        <Button variant="secondary" onClick={props.handleNoModalOption}>
            No
        </Button>
        <Button variant="primary" onClick={props.handleYesModalOption}>
            Yes
        </Button>
    </Modal.Footer>;

    let modalMessage;
    if (props.contactsSelected === 1) {
        modalMessage = `Are you sure you want to set the Postage Status of the selected contact
        to ${PostageStatus.getDisplayName(props.transitionToStatus)}? Before clicking 'Yes', please ensure that you have already
        printed the label.`;
    } else if (props.contactsSelected > 1) {
        modalMessage = `Are you sure you want to set the Postage Status of the ${props.contactsSelected} selected contacts
        to ${PostageStatus.getDisplayName(props.transitionToStatus)}? Before clicking 'Yes', please ensure that you have already
        printed the labels.`;
    } else {
        modalMessage = "That's odd, you should not be here without selecting a contact. Please select 'Cancel' to close this modal and speak to your administrator.";
        modalFooter = <Button variant="secondary" onClick={props.handleCloseModal}>
            Cancel
        </Button>;
    }

    return (
        <Modal show={props.showModal} onHide={props.handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Update Postage Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            {modalFooter}
        </Modal>
    );
}

export default ConfirmationModal;
