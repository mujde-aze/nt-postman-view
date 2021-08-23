import {Button, Modal} from "react-bootstrap";
import {PostageStatus} from "../models/PostageStatus";
import PropTypes from "prop-types";

function ConfirmationModal({transitionToStatus, handleYesModalOption, handleCloseModal, contactsSelected, handleNoModalOption, showModal}) {
  const printConfirmation = transitionToStatus === PostageStatus.NT_SENT ?
        "Before clicking 'Yes', please ensure that you have already printed the label." : "";

  let modalFooter = <Modal.Footer>
    <Button variant="secondary" onClick={handleNoModalOption}>
            No
    </Button>
    <Button variant="primary" onClick={handleYesModalOption}>
            Yes
    </Button>
  </Modal.Footer>;

  let modalMessage;
  if (contactsSelected === 1) {
    modalMessage = `Are you sure you want to set the Postage Status of the selected contact
        to ${PostageStatus.getDisplayName(transitionToStatus)}? ${printConfirmation}`;
  } else if (contactsSelected > 1) {
    modalMessage = `Are you sure you want to set the Postage Status of the ${contactsSelected} selected contacts
        to ${PostageStatus.getDisplayName(transitionToStatus)}? ${printConfirmation}`;
  } else {
    modalMessage = "That's odd, you should not be here without selecting a contact. Please select 'Cancel' to close this modal and speak to your administrator.";
    modalFooter = <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
    </Button>;
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Postage Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalMessage}</Modal.Body>
      {modalFooter}
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  transitionToStatus: PropTypes.objectOf(PostageStatus),
  handleYesModalOption: PropTypes.func,
  handleCloseModal: PropTypes.func,
  contactsSelected: PropTypes.number,
  handleNoModalOption: PropTypes.func,
  showModal: PropTypes.bool,
};

export default ConfirmationModal;
