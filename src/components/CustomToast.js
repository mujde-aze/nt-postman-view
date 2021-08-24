import {ToastContainer} from "react-bootstrap";
import PropTypes from "prop-types";

const {Row, Col, Toast} = require("react-bootstrap");

function CustomToast({setShowToast, background, showToast, toastBody}) {
  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position="top-center">
          <Toast onClose={() => setShowToast(false)} bg={background} show={showToast}
            delay={5000} autohide>
            <Toast.Body>{toastBody}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}

CustomToast.propTypes = {
  setShowToast: PropTypes.func,
  background: PropTypes.string,
  toastBody: PropTypes.string,
  showToast: PropTypes.bool,
};

export default CustomToast;
