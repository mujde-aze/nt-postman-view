import {Button} from "react-bootstrap";
import {jsPDF} from "jspdf";
import "../models/Amiri-Regular-normal";
import {calculateMaxIndexOnPage} from "../utilities/PaginationHelper";

function ContactsPrinter(props) {

    function printContacts() {
        const contactsPerPage = 8;
        const doc = new jsPDF();
        doc.setFont("Amiri-Regular");
        doc.setFontSize(14);

        const contactsColumn = splitContactsInHalf(props.contactsToPrint);
        const totalNumberOfRows = Math.max(contactsColumn.sizeOfColumn1, contactsColumn.sizeOfColumn2);
        const numberOfPdfPages = Math.ceil(totalNumberOfRows / contactsPerPage);

        for (let page = 1; page <= numberOfPdfPages; page++) {
            const startingIndex = (page - 1) * contactsPerPage;
            const maxIndex = calculateMaxIndexOnPage(startingIndex, contactsPerPage, totalNumberOfRows);
            const pageContacts = distributeContactsOnPage(startingIndex, maxIndex, contactsColumn);

            doc.text(formatContacts(pageContacts.column1OnPage), 5, 10);
            doc.text(formatContacts(pageContacts.column2OnPage), 100, 10);
            doc.addPage();
        }
        doc.save("contacts.pdf");
        props.setUpdateButtonDisabled(false);
        props.setContactsUpdated(false);
    }

    return (
        <Button variant="success" onClick={() => printContacts()} disabled={props.buttonDisabled}>Save to print
            list</Button>
    );
}

function splitContactsInHalf(contacts) {
    let column1 = [];
    let column2 = [];
    contacts.forEach((contact, index) => {
        if ((index % 2) === 0) {
            column1.push(contact);
        } else {
            column2.push(contact);
        }
    });

    return {
        column1: column1,
        sizeOfColumn1: column1.length,
        column2: column2,
        sizeOfColumn2: column2.length,
    }
}

function distributeContactsOnPage(startingIndex, maxIndex, contactsColumn) {
    const contactsInColumn1OnPage = [];
    const contactsInColumn2OnPage = [];
    for (let contactToPrint = startingIndex; contactToPrint < maxIndex; contactToPrint++) {
        if (contactsColumn.sizeOfColumn1 > contactToPrint) {
            contactsInColumn1OnPage.push(contactsColumn.column1[contactToPrint]);
        }
        if (contactsColumn.sizeOfColumn2 > contactToPrint) {
            contactsInColumn2OnPage.push(contactsColumn.column2[contactToPrint]);
        }
    }

    return {
        column1OnPage: contactsInColumn1OnPage,
        column2OnPage: contactsInColumn2OnPage,
    }
}

function formatContacts(contacts) {
    return contacts.map((contact) =>
        `
            ${contact.name}
            ${contact.address}
            Ph: ${contact.phone}
            
            
            `
    ).join("");
}

export default ContactsPrinter;
