import {Spinner} from "react-bootstrap";

function LoadingSpinner(props) {
    let spinner;
    if (props.showSpinner) {
            spinner = <Spinner animation="border" role="status"/>
    } else {
            spinner = <span />
    }

    return (
        <div className="d-flex justify-content-center p-3">
            {spinner}
        </div>
    );
}

export default LoadingSpinner;
