import {ToastContainer} from "react-bootstrap";

const {Row, Col, Toast} = require("react-bootstrap");

function CustomToast(props) {
  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position="top-center">
          <Toast onClose={() => props.setShowToast(false)} bg={props.background} show={props.showToast}
            delay={5000} autohide>
            <Toast.Body>{props.toastBody}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}

export default CustomToast;
