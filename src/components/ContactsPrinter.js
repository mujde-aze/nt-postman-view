import {Button} from "react-bootstrap";
import {jsPDF} from "jspdf";

function ContactsPrinter(props) {
    function formatContacts(contacts) {
        return contacts.map((contact) =>
            `
            ${contact.name}
            ${contact.address}
            Ph: ${contact.phone}
            
            
            `
        ).join("");
    }

    function printContacts(e) {
        const doc = new jsPDF();
        doc.setFontSize(14);
        let column1 = [];
        let column2 = [];
        props.contactsToPrint.forEach((contact, index) => {
            if ((index % 2) === 0) {
                column1.push(contact);
            } else {
                column2.push(contact);
            }
        })
        doc.text(formatContacts(column1), 5, 10);
        doc.text(formatContacts(column2), 100, 10);
        doc.save("contacts.pdf");
    }

    return (
        <Button variant="success" onClick={(e) => printContacts(e)}>Save to print list</Button>
    );
}

export default ContactsPrinter;
