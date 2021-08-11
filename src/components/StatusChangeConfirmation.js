import {Button, Modal} from "react-bootstrap";
import {useState} from "react";

function StatusChangeConfirmation(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(props.show);

    if(props.show === true){
        setShow(true);
    }

    return(
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Postage Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to set the Postage Status to {props.postageStatus}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default StatusChangeConfirmation;
