import {Spinner} from "react-bootstrap";
import PropTypes from "prop-types";

function LoadingSpinner({showSpinner}) {
  let spinner;
  if (showSpinner) {
    spinner = <Spinner animation="border" role="status"/>;
  } else {
    spinner = <span />;
  }

  return (
    <div className="d-flex justify-content-center p-3">
      {spinner}
    </div>
  );
}

LoadingSpinner.propTypes = {
  showSpinner: PropTypes.bool,
};

export default LoadingSpinner;
