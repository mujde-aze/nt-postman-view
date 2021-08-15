import {Button} from "react-bootstrap";

function ContactsPrinter(props) {
    function printContacts(e){
        console.log(props.contactsToPrint);
    }

    return (
        <Button variant="success" onClick={(e) => printContacts(e)}>Print</Button>
    );
}

export default ContactsPrinter;
